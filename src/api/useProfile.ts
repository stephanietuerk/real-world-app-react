import { useEffect, useState } from 'react';
import { API_ROOT } from '../shared/constants/api';
import { useApiClient } from './useApiClient';

export interface Profile {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}

export function useProfile(user: string | undefined): {
  profile: Profile;
  isLoading: boolean;
} {
  const { authenticatedCall } = useApiClient();
  const [state, setState] = useState<{
    profile: Profile;
    isLoading: boolean;
  }>({
    profile: {} as Profile,
    isLoading: true,
  });

  useEffect(() => {
    setState((prev) => ({ ...prev, isLoading: true }));
    if (user) {
      const url = API_ROOT + 'profiles/' + user;
      authenticatedCall<{ profile: Profile }>(url)
        .then((data) => {
          setState({
            profile: data.profile,
            isLoading: false,
          });
        })
        .catch((error) => {
          console.log('Error in useProfile:', error);
          setState((prev) => ({ ...prev, profile: {} as Profile }));
        });
    }
  }, [user]);

  return state;
}
