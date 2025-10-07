import { api } from '@/lib/axios';
import type { Character } from '@/types/character/character';

export async function getSheetById(id: string): Promise<Character> {
  const response = await api.get<Character>(`/characters/${id}`);
  return response.data;
}
