import Link from 'next/link';
import { BookOpen, Users, Video, Award, ArrowLeft } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex-1 flex flex-col w-full">
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-100 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 font-medium text-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            پلتفرم جامع آموزش آنلاین و حضوری
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight max-w-4xl">
            مهارت‌های جدید را با <span className="text-blue-600">بهترین اساتید</span> یاد بگیرید
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 max-w-2xl leading-relaxed">
            تک‌یاد، کامل‌ترین پلتفرم آموزشی با امکان برگزاری کلاس‌های آنلاین، حضوری و دوره‌های ویدئویی در تمامی رشته‌های دانشگاهی و مهارتی.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
            <Link href="/courses" className="px-8 py-4 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2">
              مشاهده دوره‌ها
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <Link href="/classes" className="px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition flex items-center justify-center">
              کلاس‌های زنده
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 border-b border-gray-100 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: BookOpen, title: 'دوره‌های جامع', desc: 'دسترسی به صدها ساعت آموزش ویدئویی' },
              { icon: Video, title: 'کلاس‌های آنلاین', desc: 'یادگیری تعاملی در کلاس‌های زنده' },
              { icon: Users, title: 'اساتید مجرب', desc: 'برترین اساتید دانشگاهی و مهارتی' },
              { icon: Award, title: 'مدرک معتبر', desc: 'ارائه گواهینامه پایان دوره' },
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / CTA Placeholder */}
      <section className="py-20 bg-blue-600 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">آماده شروع یادگیری هستید؟</h2>
          <p className="text-blue-100 mb-10 text-lg">همین حالا ثبت‌نام کنید و به جمع هزاران دانشجوی تک‌یاد بپیوندید.</p>
          <Link href="/register" className="inline-flex px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition shadow-lg">
            ثبت‌نام رایگان
          </Link>
        </div>
      </section>
    </main>
  );
}
