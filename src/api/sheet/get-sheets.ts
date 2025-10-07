import { api } from '@/lib/axios';
import type { CharacterSummary } from '@/types/character/character';

export async function getSheets(): Promise<CharacterSummary[]> {
  const response = await api.get<CharacterSummary[]>('/characters');

  return response.data;
}
