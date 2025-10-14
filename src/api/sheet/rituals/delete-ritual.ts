import { api } from '@/lib/axios';

interface DeleteRitualParams {
  characterId: string;
  ritualId: string;
}

export async function deleteRitual({
  characterId,
  ritualId,
}: DeleteRitualParams): Promise<void> {
  await api.delete(`/characters/${characterId}/rituals/${ritualId}`);
}
