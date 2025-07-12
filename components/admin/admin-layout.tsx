// layout.tsx actualizado con detección de ruta activa
'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  LayoutDashboard, 
  Users, 
  FolderOpen, 
  MessageSquare, 
  CreditCard, 
  Settings, 
  Menu,
  LogOut,
  Bell
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAuth } from '@/lib/auth/auth-context';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Clients', href: '/admin/clients', icon: Users },
  { name: 'Projects', href: '/admin/projects', icon: FolderOpen },
  { name: 'Messages', href: '/admin/messages', icon: MessageSquare },
  { name: 'Payments', href: '/admin/payments', icon: CreditCard },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    router.push('/');
  };

  const NavigationItems = () => (
    <nav className="flex-1 space-y-1 px-2 py-4">
      {navigation.map((item) => {
        const isActive = pathname === item.href;
        return (
          <a
            key={item.name}
            href={item.href}
            className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
              isActive
                ? 'bg-[#0049FF] text-white'
                : 'text-white hover:bg-[#0049FF] hover:text-white'
            }`}
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.name}
          </a>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Mobile menu */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" className="fixed top-4 left-4 z-50 md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0 bg-black border-r border-black">
          <div className="flex h-full flex-col">
            <div className="flex h-16 items-center justify-center border-b border-black">
              <img src="/mi-logo.png" alt="Logo" className="h-12" />
            </div>
            <NavigationItems />
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow border-r border-black bg-black">
          <div className="flex h-16 items-center justify-center border-b border-black">
            <img src="/mi-logo.png" alt="Logo" className="h-20" />
          </div>
          <NavigationItems />
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-black bg-black px-4 shadow-sm">
          <div className="flex-1" />
          <button className="relative p-2 rounded-full text-white">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-2 -right-2 h-4 w-4 text-xs bg-[#0049FF] text-white rounded-full flex items-center justify-center">3</span>
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center text-white px-3 py-2 rounded-md hover:bg-transparent"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </button>
        </div>

        {/* Page content */}
        <main className="p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
