import { CourseDetailsContainer } from "@/components/courses/CourseDetailsContainer";
import { Suspense } from "react";

export const metadata = {
  title: 'جزئیات دوره | TechYad',
};

export default function CoursePage({ params }: { params: { slug: string } }) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">درحال بارگذاری دوره...</div>}>
      <CourseDetailsWrapper params={params} />
    </Suspense>
  );
}

async function CourseDetailsWrapper({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const resolvedParams = await params;
  return <CourseDetailsContainer slug={resolvedParams.slug} />;
}
