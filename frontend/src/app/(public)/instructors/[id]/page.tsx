import { InstructorProfileContainer } from '@/components/instructors/InstructorProfileContainer';

export const metadata = {
  title: 'پروفایل استاد | TechYad',
};

export default function InstructorProfilePage({ params }: { params: { id: string } }) {
  return <InstructorProfileContainer id={params.id} />;
}
