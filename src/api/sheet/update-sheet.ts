import { api } from '@/lib/axios';
import type { Character } from '@/types/character/character';
import type { CharacterUpdateDTO } from '@/types/character/dtos/createCharacterDTO';

interface UpdateCharacterParams {
  characterId: string;
  dto: CharacterUpdateDTO;
}

export async function updateCharacter({
  characterId,
  dto,
}: UpdateCharacterParams): Promise<Character> {
  const response = await api.put<Character>(`/characters/${characterId}`, dto);
  return response.data;
}
