export interface CharacterExpertise {
  expertiseName: {
    name: string;
    displayName: string;
  };
  trainingRank: {
    name: string;
    bonus: number;
  };
  hasKit: boolean;
  otherBonus: number;
}
