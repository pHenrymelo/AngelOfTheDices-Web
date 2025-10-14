import type { ExpertiseName } from '../character/expertise';

export interface SmartEnum {
  name: string;
  displayName: string;
}

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
  creditLimit: string;
  minPrestige: number;
  itemLimits: Record<number, number>;
}

export interface Affinity extends SmartEnum {
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

export interface Defense {
  total: number;
  base: number;
  agilityBonus: number;
  armorBonus: number;
  otherBonus: number;
}

export interface GameRules {
  origins: Origin[];
  classes: CharacterClass[];
  paths: Path[];
  affinities: Affinity[];
  ranks: Rank[];
  circles: SmartEnum[];
  executionTypes: SmartEnum[];
  rangeTypes: SmartEnum[];
  attackTypes: SmartEnum[];
  diceTypes: string[];
  attributes: string[];
  expertises: ExpertiseName[];
}

export const ATTRIBUTES = ['FOR', 'AGI', 'INT', 'PRE', 'VIG'];
export const DAMAGE_DICE_TYPES = [
  'D4',
  'D6',
  'D8',
  'D10',
  'D12',
  'D20',
  'D100',
];
