'use client';

import { useState } from 'react';
import { Search, ChevronDown, MessageSquare, PhoneCall } from 'lucide-react';
import Link from 'next/link';

const FAQ_CATEGORIES = [
  { id: 'all', label: 'همه سوالات' },
  { id: 'register', label: 'ثبت‌نام' },
  { id: 'courses', label: 'دوره‌ها' },
  { id: 'payment', label: 'پرداخت' },
  { id: 'online', label: 'کلاس‌های آنلاین' },
  { id: 'offline', label: 'کلاس‌های حضوری' },
  { id: 'support', label: 'پشتیبانی' }
];

const MOCK_FAQS = [
  { id: 1, category: 'register', q: 'چطور می‌توانم در سایت ثبت‌نام کنم؟', a: 'برای ثبت‌نام کافیست روی دکمه "ورود / ثبت‌نام" در گوشه چپ بالای صفحه کلیک کنید و با وارد کردن شماره موبایل خود، کد تایید را دریافت و وارد حساب کاربری خود شوید.' },
  { id: 2, category: 'courses', q: 'آیا برای شرکت در دوره‌ها پیش‌نیاز لازم است؟', a: 'بستگی به دوره دارد. برخی دوره‌ها از پایه تدریس می‌شوند و نیازی به پیش‌نیاز ندارند. در صفحه توضیحات هر دوره، بخش "پیش‌نیازها" به طور دقیق مشخص شده است.' },
  { id: 3, category: 'payment', q: 'آیا امکان پرداخت اقساطی وجود دارد؟', a: 'بله، برای دوره‌هایی که مبلغ آن‌ها بالای ۵ میلیون تومان است، شرایط پرداخت اقساطی (در ۳ قسط) فراهم شده است. برای اطلاعات بیشتر با پشتیبانی تماس بگیرید.' },
  { id: 4, category: 'online', q: 'چطور وارد کلاس آنلاین شوم؟', a: 'ابتدا وارد حساب کاربری خود شوید. سپس به بخش "کلاس‌های من" رفته و روی دکمه "ورود به کلاس" کلیک کنید. کلاس‌ها در پلتفرم اختصاصی تک‌یاد برگزار می‌شوند.' },
  { id: 5, category: 'online', q: 'آیا ویدئوی کلاس‌های آنلاین ضبط می‌شود؟', a: 'بله، تمامی جلسات آنلاین به صورت خودکار ضبط شده و نهایتاً تا ۲۴ ساعت پس از برگزاری کلاس در پنل کاربری شما قرار می‌گیرد.' },
  { id: 6, category: 'offline', q: 'در صورت غیبت در کلاس حضوری چه کار کنم؟', a: 'در صورت موجه بودن غیبت، می‌توانید از فایل صوتی کلاس یا جلسات جبرانی (در صورت حد نصاب) استفاده کنید. البته حضور در ۸۰٪ جلسات الزامی است.' },
  { id: 7, category: 'support', q: 'چگونه می‌توانم سوالات درسی خود را از استاد بپرسم؟', a: 'شما می‌توانید از طریق سیستم تیکتینگ یا بخش "پرسش و پاسخ" در صفحه هر دوره، سوالات خود را مستقیماً از استاد یا پشتیبان آموزشی بپرسید.' },
  { id: 8, category: 'payment', q: 'آیا در صورت انصراف، وجه بازگردانده می‌شود؟', a: 'لطفاً برای مشاهده شرایط دقیق استرداد وجه به صفحه "قوانین و مقررات" بخش بازپرداخت مراجعه کنید. به طور کلی قبل از شروع دوره امکان انصراف با کسر ۱۰٪ کارمزد وجود دارد.' }
];

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openItem, setOpenItem] = useState<number | null>(1); // Open first item by default

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id);
  };

  const filteredFaqs = MOCK_FAQS.filter(faq => {
    const matchesSearch = faq.q.includes(searchTerm) || faq.a.includes(searchTerm);
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="bg-gray-50 min-h-screen pb-20">
      {/* Hero Section */}
      <div className="bg-slate-900 pt-24 pb-32 text-center text-white px-4">
        <h1 className="text-3xl md:text-5xl font-bold mb-6">سوالات متداول</h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10">
          پاسخ پرتکرارترین سوالات دانشجویان تک‌یاد را در اینجا بخوانید.
        </p>
        
        {/* Search */}
        <div className="max-w-2xl mx-auto relative">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
          <input 
            type="text" 
            placeholder="سوال خود را جستجو کنید..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-white text-gray-900 rounded-2xl pl-6 pr-14 py-4 text-lg focus:outline-none focus:ring-4 focus:ring-blue-500/50 shadow-xl"
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Categories */}
          <div className="flex overflow-x-auto border-b border-gray-100 p-2 hide-scrollbar">
            {FAQ_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`whitespace-nowrap px-6 py-4 font-bold text-sm transition-colors border-b-2 ${
                  activeCategory === cat.id 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* FAQ List */}
          <div className="p-6 md:p-10">
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                نتیجه‌ای برای جستجوی شما یافت نشد.
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFaqs.map(faq => (
                  <div 
                    key={faq.id} 
                    className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
                      openItem === faq.id ? 'border-blue-200 bg-blue-50/30' : 'border-gray-200 bg-white hover:border-blue-200'
                    }`}
                  >
                    <button 
                      onClick={() => toggleItem(faq.id)}
                      className="w-full flex items-center justify-between p-5 text-right focus:outline-none"
                    >
                      <span className={`font-bold pr-2 ${openItem === faq.id ? 'text-blue-700' : 'text-gray-800'}`}>
                        {faq.q}
                      </span>
                      <ChevronDown className={`w-5 h-5 transition-transform duration-300 shrink-0 ${openItem === faq.id ? 'rotate-180 text-blue-600' : 'text-gray-400'}`} />
                    </button>
                    <div 
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        openItem === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="p-5 pt-0 text-gray-600 leading-relaxed border-t border-transparent">
                        <div className="pl-6 border-r-2 border-blue-200 pr-4 mt-2">
                          {faq.a}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contact Support CTA */}
      <div className="max-w-4xl mx-auto px-4 mt-16 text-center">
        <div className="bg-blue-600 rounded-3xl p-8 sm:p-12 text-white shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/texture/800/400')] opacity-10 mix-blend-overlay"></div>
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-6">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-4">جواب سؤال خود را پیدا نکردید؟</h2>
            <p className="text-blue-100 mb-8 max-w-lg leading-relaxed">
              تیم پشتیبانی تک‌یاد آماده پاسخگویی به تمامی سوالات شماست. با ما تماس بگیرید یا تیکت ارسال کنید.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="bg-white text-blue-600 font-bold px-8 py-3 rounded-xl hover:bg-gray-50 transition shadow-md flex items-center justify-center gap-2">
                <PhoneCall className="w-5 h-5" /> تماس با پشتیبانی
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
