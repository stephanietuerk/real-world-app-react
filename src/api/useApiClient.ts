import { useAuth } from './AuthProvider';
import { getDataWithAuth } from './getDataWithAuth';

export function useApiClient() {
  const { setToken } = useAuth();

  const authenticatedCall = async <T>(
    endpoint: string,
    options?: RequestInit,
  ): Promise<T> => {
    try {
      return await getDataWithAuth<T>(endpoint, options);
    } catch (error) {
      if (error instanceof Error && error.message.includes('401')) {
        setToken(null);
      }
      throw error;
    }
  };

  return { authenticatedCall };
}
