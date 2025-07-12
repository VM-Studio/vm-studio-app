'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  LayoutDashboard, 
  FolderOpen, 
  MessageSquare, 
  Bell, 
  Settings, 
  Menu,
  LogOut,
  ExternalLink,
  CreditCard,
  ClipboardList
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/lib/auth/auth-context';

interface ClientLayoutProps {
  children: React.ReactNode;
}

const navigation = [
  { name: 'Dashboard', href: '/client', icon: LayoutDashboard },
  { name: 'My Project', href: '/client/project', icon: FolderOpen },
  { name: 'Messages', href: '/client/messages', icon: MessageSquare },
  { name: 'Notifications', href: '/client/notifications', icon: Bell },
  { name: 'Payment Status', href: '/client/payments', icon: CreditCard },
  { name: 'Additional Services', href: '/client/services', icon: ClipboardList },
  
];

export function ClientLayout({ children }: ClientLayoutProps) {
  const router = useRouter();
  const { logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    router.push('/');
  };

  const NavigationItems = () => (
    <nav className="flex-1 space-y-1 px-2 py-4">
      {navigation.map((item) => (
        <a
          key={item.name}
          href={item.href}
          className="group flex items-center px-3 py-2 text-sm font-medium rounded-lg hover:bg-[#0049FF] hover:text-white transition-colors text-white"
        >
          <item.icon className="mr-3 h-5 w-5" />
          {item.name}
        </a>
      ))}
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
        <div className="flex flex-col flex-grow border-r border-black bg-[#1A1A1A]">
          <div className="flex h-16 items-center justify-center border-b border-black">
            <img src="/mi-logo.png" alt="Logo" className="h-20" />
          </div>
          <NavigationItems />
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-64">
        {/* Top bar */}
<div className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-black bg-[#1A1A1A] px-4 shadow-sm">
  <div className="flex-1" />

  <Button
    variant="ghost"
    size="sm"
    className="gap-2 text-white bg-transparent hover:bg-transparent hover:text-white focus:bg-transparent active:bg-transparent"
  >
    <ExternalLink className="h-4 w-4" />
    Preview Project
  </Button>

  <Button
    variant="ghost"
    size="icon"
    className="relative text-white bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent"
  >
    <Bell className="h-5 w-5" />
    <Badge className="absolute -top-2 -right-2 h-4 w-4 p-0 text-xs bg-[#0049FF]">2</Badge>
  </Button>

  <Button
    variant="ghost"
    onClick={handleLogout}
    className="text-white bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent"
  >
    <LogOut className="mr-2 h-4 w-4" />
    Logout
  </Button>
</div>


        {/* Page content */}
        <main className="p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
