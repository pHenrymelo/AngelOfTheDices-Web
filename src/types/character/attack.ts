import type { SmartEnum } from '../sheet/sheet-rules';

interface ExpertiseNameDTO extends SmartEnum {
  baseAttribute: string;
}

interface AttackType extends SmartEnum {}

interface AttackRange extends SmartEnum {}

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

export interface AttackRequestDTO {
  name: string;
  type: string;
  testAttribute: string;
  testExpertise: string | null;
  testBonus: number;
  damageDiceQuantity: number;
  damageDiceType: string;
  damageBonus: number;
  criticalThreshold: number;
  criticalMultiplier: number;
  range: string;
  special: string | null;
}
