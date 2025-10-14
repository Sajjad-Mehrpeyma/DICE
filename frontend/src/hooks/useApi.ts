import { useCallback } from 'react';
import api from '@/services/api';

/**
 * Custom hook for API calls with error handling
 */
export const useApi = () => {
  const get = useCallback(async <T>(url: string): Promise<T> => {
    const response = await api.get<T>(url);
    return response.data;
  }, []);

  const post = useCallback(async <T>(url: string, data?: any): Promise<T> => {
    const response = await api.post<T>(url, data);
    return response.data;
  }, []);

  const put = useCallback(async <T>(url: string, data?: any): Promise<T> => {
    const response = await api.put<T>(url, data);
    return response.data;
  }, []);

  const del = useCallback(async <T>(url: string): Promise<T> => {
    const response = await api.delete<T>(url);
    return response.data;
  }, []);

  return { get, post, put, delete: del };
};
