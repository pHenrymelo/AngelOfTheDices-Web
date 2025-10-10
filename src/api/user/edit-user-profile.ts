import { api } from '@/lib/axios';
import type { UpdateProfilePayload, UserProfile } from '@/types/user';

export async function updateProfile(
  payload: UpdateProfilePayload,
): Promise<UserProfile> {
  const response = await api.put<UserProfile>('/users/me', payload);
  return response.data;
}
