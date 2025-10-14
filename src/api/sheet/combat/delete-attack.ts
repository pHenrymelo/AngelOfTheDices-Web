import { api } from '@/lib/axios';

interface DeleteAttackParams {
  characterId: string;
  attackId: string;
}

export async function deleteAttack({
  characterId,
  attackId,
}: DeleteAttackParams): Promise<void> {
  await api.delete(`/characters/${characterId}/attacks/${attackId}`);
}
