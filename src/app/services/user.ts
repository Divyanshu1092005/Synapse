import type { User } from '../types';
import { apiRequest } from './api';
import { getStoredAccessToken } from './auth';

export interface CurrentUserResponse {
  user: User;
  permissions?: string[];
}

export async function getCurrentUserProfile(token?: string): Promise<CurrentUserResponse> {
  const accessToken = token || getStoredAccessToken();
  if (!accessToken) throw new Error('No access token available.');

  return apiRequest('/users/me', { method: 'GET' }, accessToken);
}

export async function updateCurrentUserProfile(
  payload: Partial<User>,
  token?: string
): Promise<CurrentUserResponse> {
  const accessToken = token || getStoredAccessToken();
  if (!accessToken) throw new Error('No access token available.');

  return apiRequest(
    '/users/me',
    {
      method: 'PATCH',
      body: JSON.stringify(payload),
    },
    accessToken
  );
}
