import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function CTA() {
  return (
    <section className="py-24 bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-blue-600/10" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 className="text-4xl font-bold text-white mb-6 leading-tight">آیا برای شروع یادگیری آماده‌اید؟</h2>
        <p className="text-xl text-gray-400 mb-10">همین امروز به جمع هزاران دانشجوی تک‌یاد بپیوندید و مسیر حرفه‌ای خود را آغاز کنید.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register" className="inline-flex justify-center items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-500 transition shadow-lg shadow-blue-600/20 text-lg">
            ثبت‌نام رایگان
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <Link href="/courses" className="inline-flex justify-center items-center gap-2 px-8 py-4 bg-gray-800 text-white border border-gray-700 rounded-xl font-bold hover:bg-gray-700 transition text-lg">
            مشاهده دوره‌ها
          </Link>
        </div>
      </div>
    </section>
  );
}
