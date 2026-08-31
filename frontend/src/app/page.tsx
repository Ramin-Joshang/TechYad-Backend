import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-8 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-6">
        پلتفرم آموزش آنلاین تک‌یاد
      </h1>
      <p className="text-xl text-gray-600 mb-10 max-w-2xl leading-relaxed">
        بزرگترین و جامع‌ترین پلتفرم آموزشی با امکانات کامل کلاس‌های آنلاین، حضوری و دوره‌های ویدئویی.
      </p>
      <div className="flex gap-4 flex-wrap justify-center">
        <Link href="/courses" className="px-8 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition">
          مشاهده دوره‌ها
        </Link>
        <Link href="/login" className="px-8 py-3 bg-white text-blue-600 border border-blue-200 rounded-xl font-medium hover:bg-blue-50 transition">
          ورود به حساب
        </Link>
      </div>
    </main>
  );
}
