import { api } from '@/lib/axios';
import type {
  RitualRequestDTO,
  RitualResponseDTO,
} from '@/types/character/ritual';

interface CreateRitualParams {
  characterId: string;
  dto: RitualRequestDTO;
}

export async function createRitual({
  characterId,
  dto,
}: CreateRitualParams): Promise<RitualResponseDTO> {
  const response = await api.post<RitualResponseDTO>(
    `/characters/${characterId}/rituals`,
    dto,
  );
  return response.data;
}
