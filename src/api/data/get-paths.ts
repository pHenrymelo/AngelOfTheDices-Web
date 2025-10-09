import { api } from '@/lib/axios';
import type { Path } from '@/types/sheet/sheet-rules';

export async function getPaths(): Promise<Path[]> {
  const response = await api.get<Path[]>('/paths');
  return response.data;
}
