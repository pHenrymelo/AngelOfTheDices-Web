import type { SmartEnum } from '../sheet/sheet-rules';

interface RitualElement extends SmartEnum {}

interface RitualCircle extends SmartEnum {}

interface RitualExecution extends SmartEnum {}

interface RitualRange extends SmartEnum {}

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

export interface RitualRequestDTO {
  name: string;
  element: string;
  circle: string;
  execution: string;
  range: string;
  target: string | null;
  duration: string | null;
  resistance: string | null;
  description: string | null;
}
