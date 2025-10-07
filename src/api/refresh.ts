import { api } from '@/lib/axios';

export async function refreshToken() {
  const response = await api.post('/auth/refresh');
  return response.data;
}
