import { API_ROOT } from '../shared/constants/api';
import { useApiClient } from './useApiClient';
import type { Profile } from './useProfile';

function getEndpoint(username: string): string {
  return `${API_ROOT}profiles/${username}/follow`;
}

export function useFollowActions() {
  const { callApiWithAuth } = useApiClient();

  const followUser = async (username: string) => {
    return callApiWithAuth<{ profile: Profile }>(getEndpoint(username), {
      method: 'POST',
    });
  };

  const unfollowUser = async (username: string) => {
    return callApiWithAuth<{ profile: Profile }>(getEndpoint(username), {
      method: 'DELETE',
    });
  };

  return { followUser, unfollowUser };
}
