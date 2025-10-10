import { api } from '@/lib/axios';

export async function signOutFromApi(): Promise<void> {
  await api.post('/auth/logout');
}
