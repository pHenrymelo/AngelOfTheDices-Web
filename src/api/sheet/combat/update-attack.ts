import { api } from '@/lib/axios';
import type {
  AttackRequestDTO,
  AttackResponseDTO,
} from '@/types/character/attack';

interface UpdateAttackParams {
  characterId: string;
  attackId: string;
  dto: AttackRequestDTO;
}

export async function updateAttack({
  characterId,
  attackId,
  dto,
}: UpdateAttackParams): Promise<AttackResponseDTO> {
  const response = await api.put<AttackResponseDTO>(
    `/characters/${characterId}/attacks/${attackId}`,
    dto,
  );
  return response.data;
}
