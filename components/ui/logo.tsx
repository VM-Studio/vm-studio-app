import { cn } from '@/lib/utils';
import { Monitor } from 'lucide-react';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative">
        <Monitor className="h-8 w-8 text-blue-600" />
        <div className="absolute -top-1 -right-1 h-3 w-3 bg-purple-500 rounded-full"></div>
      </div>
      <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        VM Studio
      </span>
    </div>
  );
}