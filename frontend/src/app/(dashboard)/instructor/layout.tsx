import { RoleGuard } from '@/features/auth/components/guards/RoleGuard';

export default function InstructorLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard allowedRoles={['instructor']} fallback={
      <div className="p-8 text-center text-red-500 font-bold">شما دسترسی لازم برای مشاهده پنل اساتید را ندارید.</div>
    }>
      {children}
    </RoleGuard>
  );
}
