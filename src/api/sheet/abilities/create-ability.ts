import { api } from '@/lib/axios';
import type {
  AbilityRequestDTO,
  AbilityResponseDTO,
} from '@/types/character/ability';

interface CreateAbilityParams {
  characterId: string;
  dto: AbilityRequestDTO;
}

export async function createAbility({
  characterId,
  dto,
}: CreateAbilityParams): Promise<AbilityResponseDTO> {
  const response = await api.post<AbilityResponseDTO>(
    `/characters/${characterId}/abilities`,
    dto,
  );
  return response.data;
}
