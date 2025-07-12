'use client';

import { LoginForm } from '@/components/auth/login-form';
import { AuthProvider } from '@/lib/auth/auth-context';

export default function HomePage() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
        
        <div className="w-full max-w-md space-y-4">
          
        <div className="flex flex-col items-center justify-center mb-6">
  <img
    src="/mi-logo.png"
    alt="VM Studio Logo"
    className="h-12 mb-2" // Tamaño más chico y margen inferior
  />
  <h1 className="text-4xl font-bold text-white text-center">
    Welcome to <span className="text-[#0049FF]">VM Studio</span>
  </h1>
  <p className="mt-1 text-sm text-gray-400 text-center">
    Professional project management platform
  </p>
</div>


          <LoginForm />
        
        </div>

      </div>
    </AuthProvider>
  );
}
