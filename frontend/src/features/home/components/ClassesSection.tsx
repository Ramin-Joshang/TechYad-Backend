import { OnlineClass, InPersonClass } from '../api/home.api';
import { Calendar, MapPin, Users, Video } from 'lucide-react';
import Link from 'next/link';

interface Props {
  onlineClasses: OnlineClass[];
  inPersonClasses: InPersonClass[];
}

export function ClassesSection({ onlineClasses, inPersonClasses }: Props) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">کلاس‌های تعاملی و حضوری</h2>
          <p className="text-gray-600">
            برای یادگیری عمیق‌تر، در کلاس‌های زنده آنلاین یا دوره‌های حضوری ما شرکت کنید. ظرفیت این کلاس‌ها محدود است.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Online Classes */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                <Video className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">کلاس‌های آنلاین (Live)</h3>
            </div>
            
            <div className="space-y-4">
              {onlineClasses.map((cls) => (
                <div key={cls.id} className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-100 transition flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{cls.title}</h4>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1 text-blue-600 font-medium">
                        <Calendar className="w-4 h-4" />
                        شروع: {cls.startDate}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        ظرفیت: {cls.capacity} نفر (ثبت‌نام: {cls.enrolled})
                      </div>
                    </div>
                  </div>
                  <div className="flex sm:flex-col items-center justify-between sm:items-end gap-2 border-t sm:border-t-0 border-gray-100 pt-4 sm:pt-0">
                    <div className="text-lg font-bold text-gray-900">
                      {cls.price.toLocaleString('fa-IR')} <span className="text-sm font-normal text-gray-500">تومان</span>
                    </div>
                    <Link href={`/classes/${cls.id}`} className="px-4 py-2 bg-blue-50 text-blue-600 font-medium rounded-lg hover:bg-blue-100 transition">
                      ثبت‌نام
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* In-Person Classes */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">دوره‌های حضوری</h3>
            </div>
            
            <div className="space-y-4">
              {inPersonClasses.map((cls) => (
                <div key={cls.id} className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm hover:shadow-md hover:border-indigo-100 transition flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{cls.title}</h4>
                    <div className="flex flex-col gap-2 text-sm text-gray-500">
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-1 text-indigo-600 font-medium">
                          <Calendar className="w-4 h-4" />
                          شروع: {cls.startDate}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          ظرفیت: {cls.capacity} نفر
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {cls.location}
                      </div>
                    </div>
                  </div>
                  <div className="flex sm:flex-col items-center justify-between sm:items-end gap-2 border-t sm:border-t-0 border-gray-100 pt-4 sm:pt-0">
                    <div className="text-lg font-bold text-gray-900">
                      {cls.price.toLocaleString('fa-IR')} <span className="text-sm font-normal text-gray-500">تومان</span>
                    </div>
                    <Link href={`/classes/${cls.id}`} className="px-4 py-2 bg-indigo-50 text-indigo-600 font-medium rounded-lg hover:bg-indigo-100 transition">
                      ثبت‌نام
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
