import { api } from '@/lib/axios';
import type { Character } from '@/types/character/character';
import type { CharacterCreateDTO } from '@/types/character/dtos/createCharacterDTO';

export async function createCharacter(
  dto: CharacterCreateDTO,
): Promise<Character> {
  const response = await api.post<Character>('/characters', dto);
  return response.data;
}
