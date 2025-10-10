import { api } from '@/lib/axios';
import type { Origin } from '@/types/sheet/sheet-rules';

export async function getOrigins(): Promise<Origin[]> {
  const response = await api.get<Origin[]>('/origins');
  return response.data;
}
