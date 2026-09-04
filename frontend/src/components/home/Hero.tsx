import Link from "next/link";
import { ArrowLeft, BookOpen, Users, Award } from "lucide-react";

export function Hero() {
  return (
    <section className="relative bg-white pt-20 pb-28 overflow-hidden">
      <div className="absolute inset-0 bg-blue-50/50 -skew-y-3 transform origin-top-left -z-10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium text-sm mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            بزرگترین پلتفرم آموزشی آنلاین و حضوری
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            مسیر پیشرفت شما از <span className="text-blue-600">اینجا</span> شروع می‌شود
          </h1>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
            با تک‌یاد، مهارت‌های جدید بیاموزید، با اساتید برجسته در ارتباط باشید و آینده شغلی خود را تضمین کنید.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/courses" className="inline-flex justify-center items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-600/20 text-lg">
              مشاهده دوره‌ها
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <Link href="/instructors" className="inline-flex justify-center items-center gap-2 px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-xl font-bold hover:bg-gray-50 hover:border-gray-300 transition shadow-sm text-lg">
              آشنایی با اساتید
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
