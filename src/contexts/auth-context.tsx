import type React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { signOutFromApi } from '@/api/auth/logout';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  accessToken: string | null;
  login: (token: string) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: AuthProviderProps) {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem('accessToken'),
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setAccessToken(token);
    setIsLoading(false);
  }, []);

  const login = (token: string) => {
    localStorage.setItem('accessToken', token);
    setAccessToken(token);
  };

  const logout = async () => {
    try {
      await signOutFromApi();
    } catch (error) {
      console.error('Failed to logout from server:', error);
    } finally {
      localStorage.removeItem('accessToken');
      setAccessToken(null);
    }
  };

  const isAuthenticated = !!accessToken;

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, accessToken, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
