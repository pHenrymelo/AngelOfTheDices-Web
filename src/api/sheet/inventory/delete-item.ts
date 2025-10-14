import { api } from '@/lib/axios';

interface DeleteItemParams {
  characterId: string;
  itemId: string;
}

export async function deleteItem({
  characterId,
  itemId,
}: DeleteItemParams): Promise<void> {
  await api.delete(`/characters/${characterId}/inventory/${itemId}`);
}
