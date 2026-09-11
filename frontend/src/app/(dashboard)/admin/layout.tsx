import { RoleGuard } from '@/features/auth/components/guards/RoleGuard';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard allowedRoles={['admin', 'super-admin']} fallback={
      <div className="p-8 text-center text-red-500 font-bold">شما دسترسی لازم برای مشاهده این بخش را ندارید.</div>
    }>
      {children}
    </RoleGuard>
  );
}
