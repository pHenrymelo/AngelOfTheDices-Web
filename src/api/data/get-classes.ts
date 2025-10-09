import { api } from '@/lib/axios';
import type { CharacterClass } from '@/types/sheet/sheet-rules';

export async function getCharacterClasses(): Promise<CharacterClass[]> {
  const response = await api.get<CharacterClass[]>('/classes');
  return response.data;
}
