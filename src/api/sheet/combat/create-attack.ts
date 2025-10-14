import { api } from '@/lib/axios';
import type {
  AttackRequestDTO,
  AttackResponseDTO,
} from '@/types/character/attack';

interface CreateAttackParams {
  characterId: string;
  dto: AttackRequestDTO;
}

export async function createAttack({
  characterId,
  dto,
}: CreateAttackParams): Promise<AttackResponseDTO> {
  const response = await api.post<AttackResponseDTO>(
    `/characters/${characterId}/attacks`,
    dto,
  );
  return response.data;
}
