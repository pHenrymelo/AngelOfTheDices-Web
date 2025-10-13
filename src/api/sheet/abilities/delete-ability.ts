import { api } from '@/lib/axios';

interface DeleteAbilityParams {
  characterId: string;
  abilityId: string;
}

export async function deleteAbility({
  characterId,
  abilityId,
}: DeleteAbilityParams): Promise<void> {
  await api.delete(`/characters/${characterId}/abilities/${abilityId}`);
}
