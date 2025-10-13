import { api } from '@/lib/axios';
import type {
  RitualRequestDTO,
  RitualResponseDTO,
} from '@/types/character/ritual';

interface UpdateRitualParams {
  characterId: string;
  ritualId: string;
  dto: RitualRequestDTO;
}

export async function updateRitual({
  characterId,
  ritualId,
  dto,
}: UpdateRitualParams): Promise<RitualResponseDTO> {
  const response = await api.put<RitualResponseDTO>(
    `/characters/${characterId}/rituals/${ritualId}`,
    dto,
  );
  return response.data;
}
