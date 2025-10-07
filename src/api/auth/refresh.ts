import { api } from '@/lib/axios';

export interface RefreshResponse {
  accessToken: string;
}

export async function refreshToken(): Promise<RefreshResponse> {
  const response = await api.post('/auth/refresh');
  return response.data;
}
