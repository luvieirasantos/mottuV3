import { useState, useEffect } from 'react';
import { AuthService } from '../services/auth.service';
import type { User } from '../types';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadInitialUser = async () => {
      const currentUser = await AuthService.getCurrentUser();
      setUser(currentUser);
      setIsLoading(false);
    };
    loadInitialUser();
  }, []);

  const login = async (email: string, password: string) => {
    const loggedInUser = await AuthService.login(email, password);
    setUser(loggedInUser);
    return loggedInUser;
  };

  const register = async (name: string, email: string, password: string) => {
    const registeredUser = await AuthService.register(name, email, password);
    setUser(registeredUser);
    return registeredUser;
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