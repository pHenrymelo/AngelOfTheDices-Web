import type { Path } from 'react-router-dom';
import { api } from '@/lib/axios';

export async function getPaths(): Promise<Path[]> {
  const response = await api.get<Path[]>('/paths');
  return response.data;
}
