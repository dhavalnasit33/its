'use client';

import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import apiService from '@/lib/apiService';
import {
  getToken,
  setToken,
  removeToken,
  getUser as getStoredUser,
  setUser as setStoredUser,
  removeUser as removeStoredUser,
} from '@/lib/authUtils';
import type { User, AuthResponse, SingleResponse, AdminUser } from '@/types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  fetchCurrentUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [token, setTokenState] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  const fetchCurrentUser = useCallback(async () => {
    const storedToken = getToken();
    if (!storedToken) {
      setLoading(false);
      setUserState(null);
      setTokenState(null);
      if (pathname !== '/login') router.push('/login');
      return;
    }

    setLoading(true);
    try {
      const res = await apiService<AuthResponse>('/auth-user/me', { method: 'GET' });

      if (res.success && res.user) {
        const formattedUser = {
          ...res.user,
          id: res.user._id || res.user.id,
        };
        setUserState(formattedUser);
        setStoredUser(formattedUser);
        setTokenState(storedToken);
      } else {
        throw new Error(res.message || 'Failed to load user');
      }
    } catch (err) {
      console.error(err);
      removeToken();
      removeStoredUser();
      setUserState(null);
      setTokenState(null);
      if (pathname !== '/login') router.push('/login');
    } finally {
      setLoading(false);
    }
  }, [pathname, router]);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await apiService<AuthResponse>('/auth-user/login', {
        method: 'POST',
        body: { email, password }as any,
      });

      if (res.success && res.token && res.user) {
        const formattedUser = {
          ...res.user,
          id: res.user._id || res.user.id,
        };

        setToken(res.token);
        setStoredUser(formattedUser);
        setUserState(formattedUser);
        setTokenState(res.token);

        toast({
          title: 'Login Successful',
          description: `Welcome back, ${formattedUser.name}`,
        });

        router.push('/dashboard');
      } else {
        throw new Error(res.message || 'Login failed');
      }
      
    } catch (err: any) {
      toast({
        title: 'Login Failed',
        description:
          err.message || 'Could not connect to the server. Try again later.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const logout = useCallback(async () => {
    try {
      await apiService('/auth-user/logout', { method: 'POST' });
    } catch (err) {
      console.error('Logout API failed', err);
    }
    removeToken();
    removeStoredUser();
    setUserState(null);
    setTokenState(null);
    router.push('/login');
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out.',
    });
  }, [router, toast]);

  useEffect(() => {
    const storedToken = getToken();
    const storedUser = getStoredUser();

    if (storedToken) {
      setTokenState(storedToken);
      if (storedUser) {
        setUserState(storedUser);
        fetchCurrentUser();
      } else {
        fetchCurrentUser();
      }
    } else {
      setLoading(false);
    }
  }, [fetchCurrentUser]);

  // Dynamic Favicon Manager
  useEffect(() => {
    const loadFavicon = async () => {
      try {
        const res = await apiService<{ success: boolean; favicon?: string }>('/website-settings/favicon', { method: 'GET' });
        if (res.success && res.favicon) {
          const faviconUrl = res.favicon;
          let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
          if (!link) {
            link = document.createElement("link");
            link.rel = "shortcut icon";
            document.getElementsByTagName("head")[0].appendChild(link);
          }
          link.href = faviconUrl;
        }
      } catch (err) {
        console.error('Failed to load favicon from website settings:', err);
      }
    };

    loadFavicon();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!user && !!token,
        login,
        logout,
        fetchCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
