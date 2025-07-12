'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Shield, User } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/lib/auth/auth-context';

export function LoginForm() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [showSecurityDialog, setShowSecurityDialog] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    securityCode: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const success = await login(
        formData.username,
        formData.password,
        isAdmin,
        formData.securityCode
      );

      if (success) {
        toast.success(`Welcome back${isAdmin ? ', Admin' : ''}!`);
        router.push(isAdmin ? '/admin' : '/client');
      } else {
        if (isAdmin && formData.securityCode !== 'VMSTUDIO2024') {
          toast.error('Invalid security code');
        } else {
          toast.error('Invalid credentials');
        }
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
    }
  };

  const handleAdminToggle = (checked: boolean) => {
    setIsAdmin(checked);
    if (checked) {
      setShowSecurityDialog(true);
    }
  };

  const handleSecuritySubmit = () => {
    if (formData.securityCode === 'VMSTUDIO2024') {
      setShowSecurityDialog(false);
      toast.success('Security code verified');
    } else {
      toast.error('Invalid security code');
    }
  };

  return (
    <div className="w-full bg-black flex flex-col items-center justify-center px-4 relative">
      {/* Card con sombra azul */}
      <Card className="w-full max-w-md bg-[#111] text-white shadow-[0_0_25px_#0049FF]">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold text-white">Sign In</CardTitle>
          <CardDescription className="text-gray-400">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={formData.username}
                onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                required
                className="bg-gray-900 text-white border-gray-700 focus:ring-2 focus:ring-[#0049FF]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                required
                className="bg-gray-900 text-white border-gray-700 focus:ring-2 focus:ring-[#0049FF]"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="admin"
                checked={isAdmin}
                onCheckedChange={handleAdminToggle}
                className="accent-[#0049FF]"
              />
              <Label htmlFor="admin" className="flex items-center gap-2 cursor-pointer text-gray-300">
                <Shield className="h-4 w-4" />
                Are you an Administrator?
              </Label>
            </div>

            {isAdmin && (
              <Alert className="border-[#0049FF] bg-black text-white">
                <Shield className="h-4 w-4 text-[#0049FF]" />
                <AlertDescription>
                  Admin access requires additional security verification
                </AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full bg-[#0049FF] hover:bg-[#003ECC] text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <User className="mr-2 h-4 w-4" />
                  Sign In
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-gray-400">
            <p className="text-sm">Demo Credentials:</p>
            <p className="text-xs mt-1">
              <span className="text-white">Admin:</span> admin / admin123 |
              <span className="text-white ml-2">Client:</span> client / client123
            </p>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showSecurityDialog} onOpenChange={setShowSecurityDialog}>
        <DialogContent className="sm:max-w-md bg-[#111] text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-[#0049FF]">
              <Shield className="h-5 w-5" />
              Security Verification
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="securityCode">Security Code</Label>
              <Input
                id="securityCode"
                type="password"
                placeholder="Enter security code"
                value={formData.securityCode}
                onChange={(e) => setFormData(prev => ({ ...prev, securityCode: e.target.value }))}
                className="bg-gray-900 text-white border-gray-700 focus:ring-2 focus:ring-[#0049FF]"
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleSecuritySubmit}
                className="flex-1 bg-[#0049FF] hover:bg-[#003ECC] text-white"
              >
                Verify
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowSecurityDialog(false);
                  setIsAdmin(false);
                  setFormData(prev => ({ ...prev, securityCode: '' }));
                }}
                className="flex-1 border-gray-600 text-white"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
