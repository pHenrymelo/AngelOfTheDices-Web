import { api } from '@/lib/axios';
import type { NoteRequestDTO, NoteResponseDTO } from '@/types/character/note';

interface CreateNoteParams {
  characterId: string;
  dto: NoteRequestDTO;
}

export async function createNote({
  characterId,
  dto,
}: CreateNoteParams): Promise<NoteResponseDTO> {
  const response = await api.post<NoteResponseDTO>(
    `/characters/${characterId}/notes`,
    dto,
  );
  return response.data;
}
