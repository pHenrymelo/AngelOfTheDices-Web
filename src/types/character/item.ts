export interface ItemResponseDTO {
  id: string;
  name: string;
  description: string | null;
  category: number;
  spaces: number;
}

export interface ItemRequestDTO {
  name: string;
  description: string | null;
  category: number;
  spaces: number;
}
