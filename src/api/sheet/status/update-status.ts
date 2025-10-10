import { api } from '@/lib/axios';
import type { Character } from '@/types/character/character';
import type { CharacterStatusUpdateDTO } from '@/types/character/dtos/characterStatusUpdateDTO';

interface UpdateStatusParams {
  characterId: string;
  dto: CharacterStatusUpdateDTO;
}

export async function patchCharacterStatus({
  characterId,
  dto,
}: UpdateStatusParams): Promise<Character> {
  const response = await api.patch<Character>(
    `/characters/${characterId}/status`,
    dto,
  );
  return response.data;
}
