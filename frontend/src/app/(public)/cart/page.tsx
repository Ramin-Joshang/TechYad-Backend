'use client';

import Link from 'next/link';
import { ShoppingCart, Trash2, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

// Mock cart data
const MOCK_CART = [
  {
    id: 1,
    title: 'دوره جامع آموزش React.js (پروژه محور)',
    instructor: 'دکتر محمدی',
    price: 1500000,
    image: 'https://picsum.photos/seed/react/300/200'
  },
  {
    id: 2,
    title: 'مسترکلاس برنامه‌نویسی پایتون و هوش مصنوعی',
    instructor: 'مهندس رضایی',
    price: 2800000,
    image: 'https://picsum.photos/seed/python/300/200'
  }
];

export default function CartPage() {
  const [items, setItems] = useState(MOCK_CART);

  const total = items.reduce((sum, item) => sum + item.price, 0);

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <main className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
          <ShoppingCart className="w-8 h-8 text-blue-600" />
          سبد خرید شما
        </h1>

        {items.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-100">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-10 h-10 text-gray-300" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">سبد خرید شما خالی است!</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              شما هنوز هیچ دوره‌ای به سبد خرید خود اضافه نکرده‌اید. با مراجعه به بخش دوره‌ها می‌توانید مهارت جدیدی یاد بگیرید.
            </p>
            <Link href="/courses" className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-600/20">
              مشاهده دوره‌های آموزشی
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map(item => (
                <div key={item.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center gap-6">
                  <img src={item.image} alt={item.title} className="w-full sm:w-40 h-28 object-cover rounded-xl" />
                  <div className="flex-1 text-center sm:text-right">
                    <h3 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-500 mb-4">مدرس: {item.instructor}</p>
                    <div className="text-blue-600 font-bold text-lg">
                      {item.price.toLocaleString('fa-IR')} تومان
                    </div>
                  </div>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition self-end sm:self-center shrink-0"
                    title="حذف از سبد"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 sticky top-24">
                <h3 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">خلاصه سفارش</h3>
                
                <div className="space-y-4 mb-6 text-gray-600">
                  <div className="flex justify-between items-center">
                    <span>مبلغ کل ({items.length} دوره)</span>
                    <span className="font-bold">{total.toLocaleString('fa-IR')} تومان</span>
                  </div>
                  <div className="flex justify-between items-center text-emerald-600">
                    <span>تخفیف</span>
                    <span className="font-bold">۰ تومان</span>
                  </div>
                  <div className="pt-4 border-t border-gray-100 flex justify-between items-center text-lg font-bold text-gray-900">
                    <span>مبلغ قابل پرداخت</span>
                    <span className="text-blue-600">{total.toLocaleString('fa-IR')} تومان</span>
                  </div>
                </div>

                <Link href="/checkout" className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white px-6 py-4 rounded-xl font-bold hover:bg-emerald-700 transition shadow-lg shadow-emerald-600/30">
                  تکمیل خرید و پرداخت
                  <ArrowLeft className="w-5 h-5" />
                </Link>

                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400 bg-gray-50 p-3 rounded-lg">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  پرداخت امن از طریق درگاه‌های بانکی عضو شتاب
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
