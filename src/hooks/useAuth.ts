import { useState, useEffect } from 'react';
import { AuthService } from '../services/auth.service';
import type { User } from '../types';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = AuthService.onAuthStateChanged((user) => {
      setUser(user);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    const user = await AuthService.login(email, password);
    setUser(user);
    return user;
  };

  const register = async (name: string, email: string, password: string) => {
    const user = await AuthService.register(name, email, password);
    setUser(user);
    return user;
  };

  const logout = async () => {
    await AuthService.logout();
    setUser(null);
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  };
};