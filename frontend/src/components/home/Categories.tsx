import Link from "next/link";
import { Folder } from "lucide-react";

export function Categories({ data = [] }: { data: any[] }) {
  if (!data?.length) return null;
  
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">دسته‌بندی‌های آموزشی</h2>
          <p className="text-gray-600">جدیدترین و پرکاربردترین دسته‌بندی‌های آموزشی برای شما</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.map((cat: any) => (
            <Link key={cat._id} href={`/courses?category=${cat.slug}`} className="group bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-100 transition text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition">
                <Folder className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{cat.name}</h3>
              <p className="text-sm text-gray-500 line-clamp-2">{cat.description || "بدون توضیحات"}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
