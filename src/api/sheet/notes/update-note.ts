import { api } from '@/lib/axios';
import type { NoteRequestDTO, NoteResponseDTO } from '@/types/character/note';

interface UpdateNoteParams {
  characterId: string;
  noteId: string;
  dto: NoteRequestDTO;
}

export async function updateNote({
  characterId,
  noteId,
  dto,
}: UpdateNoteParams): Promise<NoteResponseDTO> {
  const response = await api.put<NoteResponseDTO>(
    `/characters/${characterId}/notes/${noteId}`,
    dto,
  );
  return response.data;
}
