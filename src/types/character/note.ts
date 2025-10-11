export interface NoteResponseDTO {
  id: string;
  title: string;
  description: string | null;
  createdAt: string;
  isPinned: boolean;
}

export interface NoteRequestDTO {
  title: string;
  description: string | null;
}
