import type { AbilityResponseDTO } from './ability';
import type { AttackResponseDTO } from './attack';
import type { CharacterExpertise } from './expertise';
import type { ItemResponseDTO } from './item';
import type { NoteResponseDTO } from './note';
import type { RitualResponseDTO } from './ritual';

export interface CharacterSummary {
  id: string;
  name: string;
  nex: number;
  portraitUrl: string | null;
  characterClass: {
    name: string;
    displayName: string;
  };
  rank: {
    name: string;
    displayName: string;
  };
}

interface SmartEnum {
  name: string;
  displayName: string;
}

interface Path extends SmartEnum {
  characterClass: string;
  source: string;
}

interface Origin extends SmartEnum {
  powerDescription: string;
  skillOptions: string[];
  source: string;
}

interface Rank extends SmartEnum {
  name: string;
  displayName: string;
  creditLimit: string;
  itemLimits: Record<number, number>;
}

interface Affinity extends SmartEnum {
  name: string;
  displayName: string;
}

export interface CharacterAttributes {
  FOR: number;
  AGI: number;
  INT: number;
  PRE: number;
  VIG: number;
}

export interface Character {
  id: string;
  name: string;
  playerName: string;
  age: number | null;
  gender: string | null;
  portraitUrl: string | null;
  nex: number;
  prestigePoints: number;

  origin: Origin;
  characterClass: SmartEnum;
  path: Path;
  affinity: Affinity;
  rank: Rank;

  strength: number;
  agility: number;
  intellect: number;
  presence: number;
  vigor: number;

  maxHitPoints: number;
  currentHitPoints: number;
  maxEffortPoints: number;
  currentEffortPoints: number;
  maxSanity: number;
  currentSanity: number;

  pePerRound: number;
  movement: number;
  defense: number;
  maxLoad: number;
  currentLoad: number;

  itemLimitsByCategory: Record<number, number>;

  expertises: CharacterExpertise[];
  inventory: ItemResponseDTO[];
  attacks: AttackResponseDTO[];
  abilities: AbilityResponseDTO[];
  rituals: RitualResponseDTO[];
  notes: NoteResponseDTO[];
}
