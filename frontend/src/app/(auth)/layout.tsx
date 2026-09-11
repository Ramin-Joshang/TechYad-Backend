import { GuestGuard } from '@/features/auth/components/guards/GuestGuard';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <GuestGuard>
      {children}
    </GuestGuard>
  );
}
