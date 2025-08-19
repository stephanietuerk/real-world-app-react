import { useContext } from 'react';
import { UserContext } from '../context/UserProvider';

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
