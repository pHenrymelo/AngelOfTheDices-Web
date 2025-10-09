import { api } from '@/lib/axios';
import type { SetExpertiseRequestDTO } from '@/types/character/expertise';

interface SetExpertiseParams {
  characterId: string;
  dto: SetExpertiseRequestDTO;
}

export async function setCharacterExpertise({
  characterId,
  dto,
}: SetExpertiseParams) {
  const response = await api.post(`/characters/${characterId}/expertises`, dto);
  return response.data;
}
