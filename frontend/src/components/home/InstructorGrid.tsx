import Link from "next/link";
import { Star } from "lucide-react";

export function InstructorGrid({ data = [] }: { data: any[] }) {
  if (!data?.length) return null;
  
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">اساتید برتر تک‌یاد</h2>
          <p className="text-gray-600">یادگیری از بهترین‌ها و مجرب‌ترین اساتید ایران</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.map((inst: any) => (
            <Link key={inst._id} href={`/instructors/${inst._id}`} className="group bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition text-center">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <img src={inst.avatar || inst.userId?.avatar || `https://ui-avatars.com/api/?name=${inst.name || inst.userId?.firstName}&background=random`} alt="استاد" className="w-full h-full rounded-full object-cover ring-4 ring-gray-50 group-hover:ring-blue-100 transition" />
                <div className="absolute -bottom-2 right-1/2 translate-x-1/2 bg-yellow-400 text-white text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" />
                  {inst.rating || 5}
                </div>
              </div>
              <h3 className="font-bold text-gray-900 text-lg">{inst.name || `${inst.userId?.firstName} ${inst.userId?.lastName}`}</h3>
              <p className="text-sm text-blue-600 font-medium mb-3">{inst.specialty || inst.title}</p>
              <p className="text-sm text-gray-500 line-clamp-2">{inst.bio || `${inst.students || 0} دانشجو`}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
