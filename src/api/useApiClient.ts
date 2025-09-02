import { useAuth } from './useAuth';

export interface ApiCallState {
  isLoading: boolean;
  error: unknown;
}

type AppErrors = Record<string, string[] | string>;

export class ApiError extends Error {
  status: number;
  statusText: string;
  errors?: AppErrors;

  constructor(
    message: string,
    status: number,
    statusText: string,
    errors?: AppErrors,
  ) {
    super(message);
    this.status = status;
    this.statusText = statusText;
    this.errors = errors;
  }
}

type AuthenticatedCall = <T>(
  endpoint: string,
  options?: RequestInit,
) => Promise<T>;

async function fetchWithAuth<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token = localStorage.getItem('token');

  const headers = {
    ...(options.headers || {}),
    ...(token ? { Authorization: `Token ${token}` } : {}),
  };

  const response = await fetch(endpoint, {
    ...options,
    headers,
  });

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('token');
    }
    throw new Error(`Request failed: ${response.statusText}`);
  }

  return response.json();
}

export function useApiClient(): {
  callApiWithAuth: AuthenticatedCall;
} {
  const { setToken } = useAuth();

  const authenticatedCall = async <T>(
    endpoint: string,
    options?: RequestInit,
  ): Promise<T> => {
    try {
      return await fetchWithAuth<T>(endpoint, options);
    } catch (error) {
      if (error instanceof Error && error.message.includes('401')) {
        setToken(null);
      }
      throw error;
    }
  };

  return { callApiWithAuth: authenticatedCall };
}
