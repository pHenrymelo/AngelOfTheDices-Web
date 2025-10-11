import type { AbilityResponseDTO } from './ability';
import type { AttackResponseDTO } from './attack';
import type { CharacterExpertise } from './expertise';
import type { ItemResponseDTO } from './item';
import type { NoteResponseDTO } from './note';
import type { RitualResponseDTO } from './ritual';

interface SmartEnum {
  name: string;
  displayName: string;
}

export type Affinity = SmartEnum;

export interface CharacterClass extends SmartEnum {
  baseHitPoints: number;
  baseEffortPoints: number;
  baseSanity: number;
  hpPerLevel: number;
  epPerLevel: number;
  sanPerLevel: number;
}

export interface Path extends SmartEnum {
  characterClass: string;
  source: string;
}

export interface Origin extends SmartEnum {
  powerDescription: string;
  skillOptions: string[];
  source: string;
}

export interface Rank extends SmartEnum {
  creditLimit: number;
  minPrestige: number;
  itemLimits: Record<number, number>;
}

export interface CharacterAttributes {
  FOR: number;
  AGI: number;
  INT: number;
  PRE: number;
  VIG: number;
}

export interface Defense {
  total: number;
  base: number;
  agilityBonus: number;
  armorBonus: number;
  otherBonus: number;
}

export interface CharacterSummary {
  id: string;
  name: string;
  nex: number;
  portraitUrl: string | null;
  characterClass: SmartEnum;
  rank: SmartEnum;
  affinity: Affinity;
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
  characterClass: CharacterClass;
  path: Path;
  affinity: Affinity;
  rank: Rank;

  strength: number;
  agility: number;
  intellect: number;
  presence: number;
  vigor: number;

  armorDefenseBonus: number;
  otherDefenseBonus: number;

  maxHitPoints: number;
  currentHitPoints: number;
  maxEffortPoints: number;
  currentEffortPoints: number;
  maxSanity: number;
  currentSanity: number;

  pePerRound: number;
  movement: number;
  defense: Defense;
  maxLoad: number;
  currentLoad: number;

  expertises: CharacterExpertise[];
  inventory: ItemResponseDTO[];
  attacks: AttackResponseDTO[];
  abilities: AbilityResponseDTO[];
  rituals: RitualResponseDTO[];
  notes: NoteResponseDTO[];
}
