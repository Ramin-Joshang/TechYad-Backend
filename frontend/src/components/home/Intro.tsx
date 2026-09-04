import { BookOpen, Users, Award, MonitorPlay } from "lucide-react";

export function Intro() {
  const stats = [
    { icon: BookOpen, value: "+۵۰۰", label: "دوره آموزشی" },
    { icon: Users, value: "+۵۰,۰۰۰", label: "دانشجو" },
    { icon: Award, value: "+۲۰۰", label: "استاد مجرب" },
    { icon: MonitorPlay, value: "+۱,۰۰۰", label: "ساعت آموزش" },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">درباره تک‌یاد</h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              تک‌یاد با هدف ارتقای سطح دانش و مهارت‌های تخصصی، پلتفرمی یکپارچه برای یادگیری فراهم کرده است. ما با بهره‌گیری از برترین اساتید ایران، دوره‌هایی متناسب با نیاز بازار کار طراحی کرده‌ایم تا مسیر موفقیت شما را هموارتر کنیم.
            </p>
            <div className="grid grid-cols-2 gap-8">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                  </div>
                  <span className="text-gray-500 font-medium">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden bg-gray-100 border border-gray-200">
              <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop" alt="دانشجویان در حال یادگیری" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">مدرک معتبر</p>
                  <p className="text-sm text-gray-500">مورد تایید وزارت علوم</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
