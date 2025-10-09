interface SmartEnum {
  name: string;
  displayName: string;
}

export interface Origin extends SmartEnum {
  powerDescription: string;
  expertiseOptions: string[];
  source: string;
}

export interface CharacterClass extends SmartEnum {}

export interface Path extends SmartEnum {
  characterClass: string;
  source: string;
}
