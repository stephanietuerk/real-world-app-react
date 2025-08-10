import { createContext, useEffect, useState, type ReactNode } from 'react';

interface AuthContextType {
  hasToken: boolean;
  setToken: (token: string | null) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    setHasToken(!!localStorage.getItem('token'));

    const handler = () => setHasToken(!!localStorage.getItem('token'));
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const setToken = (token: string | null) => {
    console.log('setToken called with:', token);
    console.log('Type of token:', typeof token);
    if (token) {
      console.log('About to save token to localStorage');
      localStorage.setItem('token', token);
      console.log(
        'Token saved. Checking localStorage:',
        localStorage.getItem('token'),
      );
    } else {
      localStorage.removeItem('token');
    }
    console.log('Setting hasToken to:', !!token);
    setHasToken(!!token);
  };

  return (
    <AuthContext.Provider value={{ hasToken, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}
