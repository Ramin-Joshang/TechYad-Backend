import { Quote, Star } from "lucide-react";

export function Testimonials({ data = [] }: { data: any[] }) {
  if (!data?.length) return null;
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">نظرات دانشجویان</h2>
          <p className="text-gray-600">افتخار ما، رضایت شماست</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.slice(0,3).map((item: any) => (
            <div key={item._id} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative">
              <Quote className="w-10 h-10 text-blue-100 absolute top-6 left-6" />
              <div className="flex items-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < (item.rating || 5) ? 'text-yellow-400 fill-current' : 'text-gray-200'}`} />
                ))}
              </div>
              <p className="text-gray-600 mb-8 relative z-10 leading-relaxed">"{item.content || item.text}"</p>
              <div className="flex items-center gap-4 border-t border-gray-50 pt-6">
                <img src={item.avatar || `https://ui-avatars.com/api/?name=${item.studentName || item.author}&background=random`} alt={item.studentName || item.author} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold text-gray-900">{item.studentName || item.author}</h4>
                  <p className="text-sm text-gray-500">{item.courseName || item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
