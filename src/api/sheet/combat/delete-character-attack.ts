import { api } from '@/lib/axios';

export async function deleteCharacterAttack({
  characterId,
  attackId,
}: {
  characterId: string;
  attackId: string;
}) {
  await api.delete(`/characters/${characterId}/attacks/${attackId}`);
}
