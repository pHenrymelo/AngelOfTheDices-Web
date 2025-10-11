import { api } from '@/lib/axios';

interface DeleteNoteParams {
  characterId: string;
  noteId: string;
}

export async function deleteNote({
  characterId,
  noteId,
}: DeleteNoteParams): Promise<void> {
  await api.delete(`/characters/${characterId}/notes/${noteId}`);
}
