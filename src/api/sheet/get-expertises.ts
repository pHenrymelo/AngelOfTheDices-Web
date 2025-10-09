import { api } from '@/lib/axios';
import type { ExpertiseName } from '@/types/character/expertise';

export async function getMasterExpertises(): Promise<ExpertiseName[]> {
  const response = await api.get<ExpertiseName[]>('/expertises');
  return response.data;
}
