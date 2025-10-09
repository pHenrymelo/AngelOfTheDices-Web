interface RitualElement {
  name: string;
  displayName: string;
}

interface RitualCircle {
  name: string;
  displayName: string;
}

interface RitualExecution {
  name: string;
  displayName: string;
}

interface RitualRange {
  name: string;
  displayName: string;
}

export interface RitualResponseDTO {
  id: string;
  name: string;
  element: RitualElement;
  circle: RitualCircle;
  execution: RitualExecution;
  range: RitualRange;
  target: string | null;
  duration: string | null;
  resistance: string | null;
  description: string | null;
}
