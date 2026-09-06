import { User } from '../auth/user.model.js';
import { Order } from '../commerce/order.model.js';
import { Course } from '../courses/course.model.js';
import { Coupon } from '../commerce/coupon.model.js';
import { AppError } from '../../common/errors/AppError.js';

export class AdminService {
  static async getDashboardStats() {
    const totalUsers = await User.countDocuments();
    const totalCourses = await Course.countDocuments();
    const activeOrders = await Order.countDocuments({ status: 'paid' });
    
    // Calculate total revenue from paid orders
    const orders = await Order.find({ status: 'paid' });
    const totalRevenue = orders.reduce((acc, curr) => acc + curr.totalAmount, 0);

    return {
      totalUsers,
      totalCourses,
      activeOrders,
      totalRevenue
    };
  }

  static async getUsers() {
    return await User.find().populate('role', 'name slug').select('-passwordHash');
  }

  static async updateUserStatus(userId: string, status: 'active' | 'blocked' | 'pending') {
    const user = await User.findByIdAndUpdate(userId, { status }, { new: true });
    if (!user) throw new AppError('User not found', 404, 'NOT_FOUND');
    return user;
  }

  // --- Coupons ---
  static async createCoupon(data: any) {
    return await Coupon.create(data);
  }

  static async getCoupons() {
    return await Coupon.find().sort({ createdAt: -1 });
  }

  static async deleteCoupon(id: string) {
    await Coupon.findByIdAndDelete(id);
    return { success: true };
  }
}
