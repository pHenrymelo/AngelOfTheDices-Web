export interface NoteResponseDTO {
  id: string;
  title: string;
  description: string | null;
  isPinned: boolean;
  createdAt: string;
}

export interface NoteRequestDTO {
  title: string;
  description: string | null;
}
