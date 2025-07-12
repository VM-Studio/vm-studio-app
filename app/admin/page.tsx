'use client';

import { AdminDashboard } from '@/components/admin/admin-dashboard';
import { AdminLayout } from '@/components/admin/admin-layout';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { AuthProvider } from '@/lib/auth/auth-context';

export default function AdminPage() {
  return (
    <AuthProvider>
      <ProtectedRoute requiredRole="admin">
        <AdminLayout>
          <AdminDashboard />
        </AdminLayout>
      </ProtectedRoute>
    </AuthProvider>
  );
}