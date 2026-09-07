import { ClassDetailsContainer } from '@/components/classes/ClassDetailsContainer';

export const metadata = {
  title: 'جزئیات کلاس | TechYad',
};

export default function ClassDetailsPage({ params }: { params: { slug: string } }) {
  return <ClassDetailsContainer slug={params.slug} />;
}
