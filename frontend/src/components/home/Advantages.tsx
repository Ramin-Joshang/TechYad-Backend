import { Shield, Clock, Video, Certificate } from "lucide-react";

export function Advantages() {
  const items = [
    { icon: Shield, title: "تضمین کیفیت", desc: "بازگشت وجه در صورت عدم رضایت" },
    { icon: Video, title: "دسترسی مادام‌العمر", desc: "آپدیت رایگان دوره‌های خریداری شده" },
    { icon: Clock, title: "پشتیبانی ۲۴/۷", desc: "رفع اشکال توسط اساتید و منتورها" },
    { icon: Certificate, title: "مدرک معتبر", desc: "ارائه گواهی پایان دوره دوزبانه" },
  ];
  return (
    <section className="py-20 bg-blue-600 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
                <item.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-2">{item.title}</h3>
              <p className="text-blue-100">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
