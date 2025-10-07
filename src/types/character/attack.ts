interface ExpertiseNameDTO {
  name: string;
  displayName: string;
  baseAttribute: string;
}

export interface AttackResponseDTO {
  id: string;
  name: string;
  type: string;
  testAttribute: string;
  testExpertise: ExpertiseNameDTO | null;
  testBonus: number;
  damageDiceQuantity: number;
  damageDiceType: string;
  damageBonus: number;
  criticalThreshold: number;
  criticalMultiplier: number;
  range: string;
  special: string | null;
}
