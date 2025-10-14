import { api } from '@/lib/axios';
import type { ItemRequestDTO, ItemResponseDTO } from '@/types/character/item';

interface CreateItemParams {
  characterId: string;
  dto: ItemRequestDTO;
}

export async function createItem({
  characterId,
  dto,
}: CreateItemParams): Promise<ItemResponseDTO> {
  const response = await api.post<ItemResponseDTO>(
    `/characters/${characterId}/inventory`,
    dto,
  );
  return response.data;
}
