import { useEffect, useState } from 'react';
import { API_ROOT } from '../shared/constants/api';
import { useApiClient, type ApiCallState } from './useApiClient';

export interface Profile {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}

interface ProfileState extends ApiCallState {
  profile: Profile;
}

export function useProfile(user: string | undefined): ProfileState {
  const { authenticatedCall } = useApiClient();
  const [state, setState] = useState<ProfileState>({
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
