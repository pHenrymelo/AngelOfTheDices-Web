export interface AbilityResponseDTO {
  id: string;
  name: string;
  description: string | null;
  type: {
    name: string;
    displayName: string;
  };
}

export interface AbilityRequestDTO {
  name: string;
  description: string | null;
  type: string;
}
