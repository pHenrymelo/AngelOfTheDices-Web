import { api } from '@/lib/axios';

export async function deleteCharacterItem({
  characterId,
  itemId,
}: {
  characterId: string;
  itemId: string;
}) {
  await api.delete(`/characters/${characterId}/inventory/${itemId}`);
}
