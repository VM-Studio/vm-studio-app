'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  username: string;
  role: 'admin' | 'client';
  name?: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string, isAdmin?: boolean, securityCode?: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const savedUser = localStorage.getItem('vm-studio-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (
    username: string, 
    password: string, 
    isAdmin = false, 
    securityCode?: string
  ): Promise<boolean> => {
    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (isAdmin) {
        // Admin login
        if (securityCode !== 'VMSTUDIO2024') {
          setIsLoading(false);
          return false;
        }
        
        if (username === 'admin' && password === 'admin123') {
          const adminUser: User = {
            id: 'admin-1',
            username: 'admin',
            role: 'admin',
            name: 'Administrator'
          };
          setUser(adminUser);
          localStorage.setItem('vm-studio-user', JSON.stringify(adminUser));
          setIsLoading(false);
          return true;
        }
      } else {
        // Client login
        if (username === 'client' && password === 'client123') {
          const clientUser: User = {
            id: 'client-1',
            username: 'client',
            role: 'client',
            name: 'John Doe'
          };
          setUser(clientUser);
          localStorage.setItem('vm-studio-user', JSON.stringify(clientUser));
          setIsLoading(false);
          return true;
        }
      }

      setIsLoading(false);
      return false;
    } catch (error) {
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('vm-studio-user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}