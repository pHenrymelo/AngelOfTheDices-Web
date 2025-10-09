interface ExpertiseNameDTO {
  name: string;
  displayName: string;
  baseAttribute: string;
}

interface AttackType {
  name: string;
  displayName: string;
}

interface AttackRange {
  name: string;
  displayName: string;
}

export interface AttackResponseDTO {
  id: string;
  name: string;
  type: AttackType;
  testAttribute: string;
  testExpertise: ExpertiseNameDTO | null;
  testBonus: number;
  damageDiceQuantity: number;
  damageDiceType: string;
  damageBonus: number;
  criticalThreshold: number;
  criticalMultiplier: number;
  range: AttackRange;
  special: string | null;
}
