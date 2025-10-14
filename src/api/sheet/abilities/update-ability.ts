import { api } from '@/lib/axios';
import type {
  AbilityRequestDTO,
  AbilityResponseDTO,
} from '@/types/character/ability';

interface UpdateAbilityParams {
  characterId: string;
  abilityId: string;
  dto: AbilityRequestDTO;
}

export async function updateAbility({
  characterId,
  abilityId,
  dto,
}: UpdateAbilityParams): Promise<AbilityResponseDTO> {
  const response = await api.put<AbilityResponseDTO>(
    `/characters/${characterId}/abilities/${abilityId}`,
    dto,
  );
  return response.data;
}
