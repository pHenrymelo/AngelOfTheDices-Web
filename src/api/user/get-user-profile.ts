import { api } from '@/lib/axios';
import type { UserProfile } from '@/types/user';

export async function getProfile(): Promise<UserProfile> {
  const response = await api.get<UserProfile>('/users/me');
  return response.data;
}
