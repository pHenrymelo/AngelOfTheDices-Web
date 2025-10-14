export interface ExpertiseName {
  name: string;
  displayName: string;
  baseAttribute: string;
  suffersLoadPenalty: boolean;
  requiresTraining: boolean;
  kitApplicable: boolean;
}

export interface CharacterExpertise {
  expertiseName: ExpertiseName;
  trainingRank: {
    name: string;
    bonus: number;
  };
  hasKit: boolean;
  otherBonus: number;
}

export interface SetExpertiseRequestDTO {
  expertiseName: string;
  trainingRank: string;
  hasKit?: boolean;
  otherBonus?: number;
}
