import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { AdminUser, UserRole } from '@/lib/permissions';
import { SAMPLE_USERS, hasPermission } from '@/lib/permissions';

interface AuthContextValue {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check persisted session
    const stored = localStorage.getItem('admin_user');
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch { /* ignore */ }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Demo auth — in production use Appwrite account.createEmailPasswordSession
    const found = SAMPLE_USERS.find(u => u.email === email && u.status === 'active');
    if (!found || password.length < 6) {
      throw new Error('invalid_credentials');
    }
    setUser(found);
    localStorage.setItem('admin_user', JSON.stringify(found));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('admin_user');
  };

  const checkPermission = (permission: string) => {
    if (!user) return false;
    return hasPermission(user.role, permission);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout, checkPermission }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}
