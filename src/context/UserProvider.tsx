import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import type { User } from '../api/authenticate';
import { useApiClient } from '../api/useApiClient';
import { API_ROOT } from '../shared/constants/api';

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const { authenticatedCall } = useApiClient();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const url = API_ROOT + 'user';
    authenticatedCall<{ user: User }>(url)
      .then((data) => {
        setUser(data.user);
      })
      .catch((error) => {
        console.log('No user:', error);
        setUser(null);
      });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
