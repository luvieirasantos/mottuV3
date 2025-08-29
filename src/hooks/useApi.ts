import { useState, useCallback } from 'react';
import { AuthService } from '../services/auth.service';
import ApiService from '../services/api.service';

interface UseApiOptions {
  onUnauthorized?: () => void;
}

export const useApi = (options: UseApiOptions = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const makeAuthenticatedRequest = useCallback(async <T>(
    endpoint: string,
    requestOptions: RequestInit = {}
  ): Promise<T | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const token = await AuthService.getAuthToken();
      
      if (!token) {
        options.onUnauthorized?.();
        return null;
      }

      const response = await ApiService.makeAuthenticatedRequest<T>(endpoint, token, requestOptions);
      return response.data || null;
    } catch (err: any) {
      if (err.message?.includes('401') || err.message?.includes('Unauthorized')) {
        options.onUnauthorized?.();
        return null;
      }
      
      setError(err.message || 'Erro na requisição');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [options]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    isLoading,
    error,
    makeAuthenticatedRequest,
    clearError,
  };
};
