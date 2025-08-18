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
  const { callApiWithAuth } = useApiClient();
  const [profile, setProfile] = useState<Profile>({} as Profile);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchProfile = async () => {
    if (!user) return;

    setIsLoading(true);
    const url = API_ROOT + 'profiles/' + user;

    try {
      const data = await callApiWithAuth<{ profile: Profile }>(url);
      setProfile(data.profile);
    } catch (error) {
      console.log('Error in useProfile:', error);
      setProfile({} as Profile);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  return { profile, isLoading };
}
