import { Category } from '../api/home.api';
import * as Icons from 'lucide-react';

interface Props {
  categories: Category[];
}

export function CategoriesSection({ categories }: Props) {
  // Helper to render lucide icon dynamically
  const renderIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName] || Icons.BookOpen;
    return <IconComponent className="w-8 h-8" />;
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">دسته‌بندی‌های آموزشی</h2>
          <p className="text-gray-600">
            از بین صدها دسته آموزشی، مسیر یادگیری خود را پیدا کنید و مهارت‌های جدید کسب کنید.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <a 
              key={category.id} 
              href={`/courses?category=${category.id}`}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100 transition group flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-gray-50 text-gray-700 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                {renderIcon(category.icon)}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">{category.title}</h3>
              <p className="text-sm text-gray-500">{category.courseCount} دوره آموزشی</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
