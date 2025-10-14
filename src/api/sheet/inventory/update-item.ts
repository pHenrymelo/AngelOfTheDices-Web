import { api } from '@/lib/axios';
import type { ItemRequestDTO, ItemResponseDTO } from '@/types/character/item';

interface UpdateItemParams {
  characterId: string;
  itemId: string;
  dto: ItemRequestDTO;
}

export async function updateItem({
  characterId,
  itemId,
  dto,
}: UpdateItemParams): Promise<ItemResponseDTO> {
  const response = await api.put<ItemResponseDTO>(
    `/characters/${characterId}/inventory/${itemId}`,
    dto,
  );
  return response.data;
}
