import { api } from '@/lib/axios';
import type { Character } from '@/types/character/character';

interface UploadPortraitParams {
  characterId: string;
  file: File;
}

export async function uploadCharacterPortrait({
  characterId,
  file,
}: UploadPortraitParams): Promise<Character> {
  const formData = new FormData();

  formData.append('file', file);

  const response = await api.post<Character>(
    `/characters/${characterId}/portrait`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return response.data;
}
