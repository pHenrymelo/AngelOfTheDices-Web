import { api } from '@/lib/axios';

export async function deleteCharacter(characterId: string): Promise<void> {
  await api.delete(`/characters/${characterId}`);
}
