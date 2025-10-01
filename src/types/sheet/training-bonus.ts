export const TRAINING_BONUS = {
  UNTRAINED: 0,
  TRAINED: 5,
  VETERAN: 10,
  EXPERT: 15,
};

export type TrainigLevel = keyof typeof TRAINING_BONUS;

export interface Expertise {
  name: string;
  attribute: 'AGI' | 'INT' | 'VIG' | 'PRE' | 'FOR';
  training: TrainigLevel;
  otherBonus: number;
}
