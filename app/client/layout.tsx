// app/client/layout.tsx
'use client';

import { ClientLayout } from '@/components/client/client-layout';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { AuthProvider } from '@/lib/auth/auth-context';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ProtectedRoute requiredRole="client">
        <ClientLayout>
          {children}
        </ClientLayout>
      </ProtectedRoute>
    </AuthProvider>
  );
}
