import { Cart, ICartItem } from './cart.model.js';
import { Order } from './order.model.js';
import { Payment } from './payment.model.js';
import { Coupon } from './coupon.model.js';
import { Course } from '../courses/course.model.js';
import { Enrollment } from '../learning/enrollment.model.js';
import { AppError } from '../../common/errors/AppError.js';

export class CommerceService {
  // --- Cart ---
  static async getCart(userId: string) {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = await Cart.create({ userId, items: [] });
    }
    return cart;
  }

  static async addToCart(userId: string, data: { itemType: 'course' | 'class'; itemId: string }) {
    const cart = await this.getCart(userId);
    
    // Check if already in cart
    const exists = cart.items.find(i => i.itemId.toString() === data.itemId && i.itemType === data.itemType);
    if (exists) throw new AppError('Item already in cart', 400, 'ALREADY_IN_CART');

    if (data.itemType === 'course') {
      const course = await Course.findById(data.itemId);
      if (!course) throw new AppError('Course not found', 404, 'NOT_FOUND');
      if (course.status !== 'published') throw new AppError('Course is not available', 400, 'UNAVAILABLE');
      if (course.price === 0) throw new AppError('This is a free course. Enroll directly.', 400, 'IS_FREE');

      const enrollment = await Enrollment.findOne({ userId, courseId: course._id });
      if (enrollment) throw new AppError('You are already enrolled in this course', 400, 'ALREADY_ENROLLED');
    }

    cart.items.push({ itemType: data.itemType, itemId: data.itemId as any });
    await cart.save();
    return cart;
  }

  static async removeFromCart(userId: string, itemId: string) {
    const cart = await this.getCart(userId);
    cart.items = cart.items.filter(i => i.itemId.toString() !== itemId) as any;
    await cart.save();
    return cart;
  }

  static async clearCart(userId: string) {
    const cart = await this.getCart(userId);
    cart.items = [];
    await cart.save();
    return cart;
  }

  // --- Checkout & Orders ---
  static async checkoutPreview(userId: string, couponCode?: string) {
    const cart = await this.getCart(userId);
    if (cart.items.length === 0) throw new AppError('Cart is empty', 400, 'CART_EMPTY');

    let subtotal = 0;
    const previewItems: any[] = [];

    for (const item of cart.items) {
      if (item.itemType === 'course') {
        const course = await Course.findById(item.itemId);
        if (!course || course.status !== 'published') {
           throw new AppError(`Course with ID ${item.itemId} is no longer available`, 400, 'ITEM_UNAVAILABLE');
        }
        subtotal += course.price;
        previewItems.push({
          itemType: 'course',
          itemId: course._id,
          titleSnapshot: course.title,
          price: course.price,
          discount: 0,
          finalPrice: course.price
        });
      }
      // Add logic for 'class' when Class model is ready
    }

    let discountAmount = 0;
    let couponRecord = null;

    if (couponCode) {
      const coupon = await Coupon.findOne({ code: couponCode.toUpperCase(), isActive: true });
      if (!coupon) throw new AppError('Invalid or expired coupon', 400, 'INVALID_COUPON');
      
      // Basic validation
      if (coupon.startAt && new Date() < coupon.startAt) throw new AppError('Coupon is not active yet', 400, 'INVALID_COUPON');
      if (coupon.endAt && new Date() > coupon.endAt) throw new AppError('Coupon is expired', 400, 'EXPIRED_COUPON');
      if (coupon.usageLimit && coupon.usageCount >= coupon.usageLimit) throw new AppError('Coupon usage limit reached', 400, 'COUPON_LIMIT');
      if (coupon.minOrderAmount && subtotal < coupon.minOrderAmount) throw new AppError(`Minimum order amount for this coupon is ${coupon.minOrderAmount}`, 400, 'COUPON_MIN_AMOUNT');

      if (coupon.type === 'percentage') {
        discountAmount = (subtotal * coupon.value) / 100;
        if (coupon.maxDiscount && discountAmount > coupon.maxDiscount) {
          discountAmount = coupon.maxDiscount;
        }
      } else if (coupon.type === 'fixed') {
        discountAmount = coupon.value;
      }
      
      if (discountAmount > subtotal) discountAmount = subtotal;
      couponRecord = coupon;
    }

    const totalAmount = subtotal - discountAmount;

    return {
      items: previewItems,
      subtotal,
      discountAmount,
      totalAmount,
      couponId: couponRecord?._id
    };
  }

  static async createOrder(userId: string, couponCode?: string) {
    const preview = await this.checkoutPreview(userId, couponCode);

    const order = await Order.create({
      userId,
      items: preview.items,
      subtotal: preview.subtotal,
      discountAmount: preview.discountAmount,
      totalAmount: preview.totalAmount,
      couponId: preview.couponId,
      status: 'pending'
    });

    if (preview.couponId) {
      await Coupon.findByIdAndUpdate(preview.couponId, { $inc: { usageCount: 1 } });
    }

    await this.clearCart(userId);
    return order;
  }

  static async getMyOrders(userId: string) {
    return await Order.find({ userId }).sort({ createdAt: -1 });
  }

  static async getOrderById(userId: string, orderId: string) {
    const order = await Order.findOne({ _id: orderId, userId });
    if (!order) throw new AppError('Order not found', 404, 'NOT_FOUND');
    return order;
  }

  // --- Payment Mock / Flow ---
  static async createPaymentMock(userId: string, orderId: string) {
    const order = await this.getOrderById(userId, orderId);
    if (order.status !== 'pending') throw new AppError('Order is already processed', 400, 'ORDER_PROCESSED');
    
    // Create a pending payment
    const payment = await Payment.create({
      orderId,
      userId,
      amount: order.totalAmount,
      gateway: 'zarinpal_mock',
      authority: `AUTH_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      status: 'pending'
    });

    return { payment, paymentUrl: `/mock-gateway?authority=${payment.authority}` };
  }
}
