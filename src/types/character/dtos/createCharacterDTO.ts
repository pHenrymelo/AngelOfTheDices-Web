export interface CharacterCreateDTO {
  name: string;
  age?: number;
  gender?: string;
  origin: string;
  characterClass: string;
  path: string;
  affinity: string;
  rank: string;
  nex: number;
  prestigePoints: number;
  strength: number;
  agility: number;
  intellect: number;
  presence: number;
  vigor: number;
  maxHitPoints: number;
  maxEffortPoints: number;
  maxSanity: number;
  armorDefenseBonus?: number;
  otherDefenseBonus?: number;
}

export interface CharacterUpdateDTO extends CharacterCreateDTO {}
