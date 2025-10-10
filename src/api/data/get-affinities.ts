import { api } from '@/lib/axios';
import type { Affinity } from '@/types/sheet/sheet-rules';

export async function getAffinities(): Promise<Affinity[]> {
  const response = await api.get<Affinity[]>('/affinities');
  return response.data;
}
