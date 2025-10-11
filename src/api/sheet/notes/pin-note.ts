import { api } from '@/lib/axios';
import type { NoteResponseDTO } from '@/types/character/note';

interface TogglePinParams {
  characterId: string;
  noteId: string;
  isPinned: boolean;
}

export async function toggleNotePin({
  characterId,
  noteId,
  isPinned,
}: TogglePinParams): Promise<NoteResponseDTO> {
  const response = await api.patch<NoteResponseDTO>(
    `/characters/${characterId}/notes/${noteId}/pin`,
    { isPinned },
  );
  return response.data;
}
