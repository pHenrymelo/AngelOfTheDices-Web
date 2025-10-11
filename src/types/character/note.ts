export interface NoteResponseDTO {
  id: string;
  title: string;
  description: string | null;
}

export interface NoteRequestDTO {
  title: string;
  description: string;
}
