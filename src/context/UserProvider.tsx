import { createContext, useEffect, useState, type ReactNode } from 'react';
import type { User } from '../api/authenticate';
import { useApiClient } from '../api/useApiClient';
import { API_ROOT } from '../shared/constants/api';

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

export function UserProvider({ children }: { children: ReactNode }) {
  const { callApiWithAuth } = useApiClient();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const url = API_ROOT + 'user';
    callApiWithAuth<{ user: User }>(url)
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
