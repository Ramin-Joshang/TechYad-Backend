'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Hero } from './Hero';
import { Intro } from './Intro';
import { Categories } from './Categories';
import { CourseList } from './CourseList';
import { InstructorGrid } from './InstructorGrid';
import { Advantages } from './Advantages';
import { Testimonials } from './Testimonials';
import { LatestArticles } from './LatestArticles';
import { CTA } from './CTA';
import { Footer } from '../layout/Footer';

export function HomeDataView() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['homeData'],
    queryFn: () => api.get('/home').then(res => res.data),
  });

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">درحال بارگذاری اطلاعات...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">خطا در دریافت اطلاعات</div>;
  }

  const d = data || {};

  return (
    <div className="min-h-screen flex flex-col">
      <Hero />
      <Intro />
      <Categories data={d.categories} />
      <CourseList title="دوره‌های محبوب" data={d.popularCourses} />
      <CourseList title="جدیدترین دوره‌ها" data={d.newCourses} />
      <CourseList title="دوره‌های رایگان" data={d.freeCourses} />
      <InstructorGrid data={d.topInstructors} />
      <CourseList title="کلاس‌های آنلاین" data={d.onlineClasses} />
      <CourseList title="کلاس‌های حضوری" data={d.inPersonClasses} />
      <Advantages />
      <Testimonials data={d.testimonials} />
      <LatestArticles data={d.blogPosts || d.latestArticles} />
      <CTA />
      <Footer />
    </div>
  );
}
