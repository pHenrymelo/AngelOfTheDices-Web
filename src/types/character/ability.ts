export interface AbilityResponseDTO {
  id: string;
  name: string;
  description: string | null;
  type: {
    name: string;
    displayName: string;
  };
}
