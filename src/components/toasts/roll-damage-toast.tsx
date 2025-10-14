interface Props {
  attackName: string;
  totalDamage: number;
  rolls: number[];
  damageBonus: number;
  isCritical: boolean;
}

export function RollDamageToast({
  attackName,
  totalDamage,
  rolls,
  damageBonus,
  isCritical,
}: Props) {
  const formula = `[${rolls.join(' + ')}] ${damageBonus !== 0 ? (damageBonus > 0 ? `+ ${damageBonus}` : `- ${Math.abs(damageBonus)}`) : ''}`;

  return (
    <div className="flex flex-col">
      <span>
        Dano de <span className="font-bold">{attackName}: </span>
      </span>
      {isCritical && (
        <span className="text-xs text-emerald-600 my-auto font-heading font-bold">
          ACERTOU UM ATAQUE CRÍTICO
        </span>
      )}
      <span className="flex font-bold gap-2 items-center">
        Total:{' '}
        <span className="font-bold text-destructive text-lg font-number">
          {totalDamage}
        </span>
      </span>
      <span className="text-xs font-normal text-muted-foreground my-auto font-number">
        Fórmula: {formula}
      </span>
    </div>
  );
}
