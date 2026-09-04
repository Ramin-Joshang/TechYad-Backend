import Link from "next/link";
import { Clock, Book, User } from "lucide-react";

export function CourseList({ title, data = [] }: { title: string, data: any[] }) {
  if (!data?.length) return null;
  
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
            <div className="h-1 w-20 bg-blue-600 rounded-full"></div>
          </div>
          <Link href="/courses" className="text-blue-600 font-medium hover:text-blue-700 transition">مشاهده همه</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.map((course: any) => (
            <Link key={course._id} href={`/courses/${course.slug}`} className="group flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-blue-900/5 transition duration-300">
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                <img src={course.coverImage || course.thumbnail || `https://picsum.photos/seed/${course.slug}/400/250`} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                {course.tags?.[0] && (
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
                    {course.tags[0]}
                  </div>
                )}
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition">{course.title}</h3>
                <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
                  <User className="w-4 h-4" />
                  <span className="truncate">{course.instructor?.name || course.instructor || (course.instructors?.[0]?.firstName ? `${course.instructors[0].firstName} ${course.instructors[0].lastName}` : 'نامشخص')}</span>
                </div>
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1"><Clock className="w-4 h-4"/> {typeof course.duration === 'string' ? course.duration : course.totalDuration ? Math.round(course.totalDuration / 60) + 'h' : '0h'}</div>
                    <div className="flex items-center gap-1"><Book className="w-4 h-4"/> {course.totalLessons || course.studentsCount || 0} درس</div>
                  </div>
                  <div className="font-bold text-blue-600">
                    {course.price === 0 ? "رایگان" : `${course.price.toLocaleString()} تومان`}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
