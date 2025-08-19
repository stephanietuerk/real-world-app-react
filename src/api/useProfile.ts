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
  profile: Profile | null;
}

export function useProfile(username: string | undefined): ProfileState {
  const { callApiWithAuth } = useApiClient();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);

  const fetchProfile = async () => {
    if (!username) return;

    setIsLoading(true);
    const url = API_ROOT + 'profiles/' + username;

    try {
      const data = await callApiWithAuth<{ profile: Profile }>(url);
      setProfile(data.profile);
    } catch (error) {
      setError(error);
      setProfile(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [username]);

  return { profile, isLoading, error };
}
