import { api } from '@/lib/axios';
import type { Rank } from '@/types/sheet/sheet-rules';

export async function getRanks(): Promise<Rank[]> {
  const response = await api.get<Rank[]>('/ranks');
  return response.data;
}
