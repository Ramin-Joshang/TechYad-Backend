'use client';

import { useState, useEffect } from 'react';
import { CreditCard, CheckCircle2, ShieldCheck, ArrowRight, Loader2, LogIn } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/features/auth/stores/auth.store';
import { useCartStore } from '@/features/commerce/stores/cart.store';
import { commerceApi } from '@/features/commerce/api/commerce.api';

export default function CheckoutPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const { items, clearCart } = useCartStore();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [previewData, setPreviewData] = useState<any>(null);
  const [error, setError] = useState('');
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated && items.length > 0) {
      loadCheckout();
    }
  }, [isAuthenticated, items]);

  const loadCheckout = async () => {
    try {
      // Sync local cart to backend
      const backendItems = items.map(i => ({ itemType: i.type, itemId: i.id }));
      await commerceApi.syncCart(backendItems);
      
      // Get preview
      const previewRes = await commerceApi.checkoutPreview();
      if (previewRes.data) {
        setPreviewData(previewRes.data);
      }
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'خطا در بارگذاری اطلاعات سفارش');
    }
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    setError('');
    
    try {
      // Create order
      const orderRes = await commerceApi.createOrder();
      const newOrderId = orderRes.data._id;
      
      // Create payment
      const paymentRes = await commerceApi.createPayment(newOrderId);
      
      // Simulate gateway redirect and return
      setTimeout(() => {
        setIsProcessing(false);
        setIsSuccess(true);
        setOrderId(newOrderId);
        clearCart();
      }, 2000);
      
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'خطا در ایجاد تراکنش');
      setIsProcessing(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <main className="bg-gray-50 min-h-screen flex items-center justify-center py-12 px-4">
        <div className="bg-white rounded-3xl p-10 max-w-lg w-full text-center shadow-xl border border-gray-100">
          <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <LogIn className="w-10 h-10" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">نیاز به ورود</h1>
          <p className="text-gray-600 mb-8 leading-relaxed">
            برای تکمیل خرید و ثبت سفارش، لطفا ابتدا وارد حساب کاربری خود شوید یا ثبت‌نام کنید.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href={`/login?redirect=/checkout`} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition">
              ورود
            </Link>
            <Link href={`/register?redirect=/checkout`} className="bg-white border border-gray-200 text-gray-700 px-8 py-3 rounded-xl font-bold hover:bg-gray-50 transition">
              ثبت‌نام
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (items.length === 0 && !isSuccess) {
    return (
      <main className="bg-gray-50 min-h-screen flex items-center justify-center py-12 px-4">
        <div className="bg-white rounded-3xl p-10 max-w-lg w-full text-center shadow-xl border border-gray-100">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">سبد خرید خالی است</h1>
          <Link href="/courses" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition inline-block">
            بازگشت به دوره‌ها
          </Link>
        </div>
      </main>
    );
  }

  if (isSuccess) {
    return (
      <main className="bg-gray-50 min-h-screen flex items-center justify-center py-12 px-4">
        <div className="bg-white rounded-3xl p-10 max-w-lg w-full text-center shadow-xl border border-gray-100">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">پرداخت موفقیت‌آمیز بود!</h1>
          <p className="text-gray-600 mb-8 leading-relaxed">
            از خرید شما سپاسگزاریم. دوره‌های خریداری شده هم‌اکنون در پنل کاربری شما قابل مشاهده و استفاده هستند.
          </p>
          <div className="bg-gray-50 p-4 rounded-xl mb-8 flex flex-col gap-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>شماره سفارش:</span>
              <span className="font-bold text-gray-900">{orderId?.slice(-8).toUpperCase() || 'TCK-84920'}</span>
            </div>
            <div className="flex justify-between">
              <span>تاریخ پرداخت:</span>
              <span className="font-bold text-gray-900">{new Date().toLocaleDateString('fa-IR')}</span>
            </div>
          </div>
          <Link href="/student" className="block w-full bg-blue-600 text-white px-6 py-4 rounded-xl font-bold hover:bg-blue-700 transition shadow-md">
            ورود به پنل کاربری و شروع یادگیری
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/cart" className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 transition mb-8 font-medium">
          <ArrowRight className="w-5 h-5" />
          بازگشت به سبد خرید
        </Link>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-8 border border-red-100">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Payment info */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 h-fit">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
              <CreditCard className="w-6 h-6 text-blue-600" />
              اطلاعات پرداخت
            </h2>
            
            <div className="space-y-4 mb-8 text-gray-600">
              <div className="flex justify-between items-center text-lg">
                <span>مبلغ قابل پرداخت:</span>
                {previewData ? (
                  <span className="font-bold text-2xl text-blue-600">
                    {previewData.totalAmount.toLocaleString('fa-IR')} تومان
                  </span>
                ) : (
                  <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                )}
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <label className="flex items-center gap-4 p-4 border-2 border-blue-600 bg-blue-50/50 rounded-xl cursor-pointer">
                <input type="radio" name="gateway" defaultChecked className="w-5 h-5 text-blue-600 focus:ring-blue-500" />
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">درگاه پرداخت شبیه‌ساز</h3>
                  <p className="text-sm text-gray-500">پرداخت به صورت آزمایشی</p>
                </div>
              </label>
            </div>

            <button 
              onClick={handlePayment}
              disabled={isProcessing || !previewData}
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white px-6 py-4 rounded-xl font-bold hover:bg-emerald-700 transition shadow-lg shadow-emerald-600/30 disabled:opacity-70"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  در حال انتقال به درگاه...
                </>
              ) : (
                <>
                  تایید و پرداخت سفارش
                </>
              )}
            </button>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              پرداخت در محیطی کاملاً امن انجام می‌شود
            </div>
          </div>

          {/* User info preview */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 h-fit">
             <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">
              فاکتور سفارش
            </h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">نام خریدار:</span>
                <span className="font-bold text-gray-900">{user?.firstName} {user?.lastName}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">ایمیل:</span>
                <span className="font-bold text-gray-900" dir="ltr">{user?.email}</span>
              </div>
            </div>

            {previewData && (
              <div className="border-t border-gray-100 pt-6 mb-6">
                <div className="space-y-3">
                  {previewData.items.map((item: any) => (
                    <div key={item.itemId} className="flex justify-between items-center text-sm">
                      <span className="text-gray-700 truncate ml-4 flex-1">{item.titleSnapshot}</span>
                      <span className="text-gray-900 font-medium whitespace-nowrap">{item.finalPrice.toLocaleString('fa-IR')} تومان</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600">
              <p className="mb-2 font-bold text-gray-900">دقت کنید:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>پس از پرداخت، بلافاصله به دوره‌ها دسترسی خواهید داشت.</li>
                <li>برای مشاهده دوره‌ها نیاز به نرم‌افزار خاصی نیست (پخش آنلاین).</li>
                <li>در صورت بروز مشکل در پرداخت، وجه طی ۷۲ ساعت به حساب شما بازگردانده می‌شود.</li>
              </ul>
            </div>
          </div>
          
        </div>
      </div>
    </main>
  );
}
