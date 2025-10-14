import { api } from '@/lib/axios';
import type { GameRules } from '@/types/sheet/sheet-rules';

export async function getGameRules(): Promise<GameRules> {
  const response = await api.get<GameRules>('/rules');
  return response.data;
}
