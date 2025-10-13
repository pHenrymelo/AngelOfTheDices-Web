import { CritialFailure, CritialRole } from './roll-toast-base';

interface RollAttackToastProps {
  attackName: string;
  finalResult: number;
  finalRoll: number;
  totalBonus: number;
  rolls: number[];
  isCritical: boolean;
}

export function RollAttackToast({
  attackName,
  finalResult,
  rolls,
  finalRoll,
  totalBonus,
  isCritical,
}: RollAttackToastProps) {
  return (
    <div>
      A rolagem de <span className="font-bold">{attackName}</span> deu:{' '}
      <div className="flex items-center gap-2">
        {rolls.map((roll, index) => (
          <span
            key={`${roll}-${index}`}
            className={
              roll === finalRoll
                ? 'font-bold text-primary text-lg'
                : 'text-muted-foreground'
            }
          >
            {roll}
          </span>
        ))}
      </div>
      <span className="flex font-bold gap-2 items-center">
        Resultado:{' '}
        <span className="font-bold text-primary text-lg font-number">
          {finalResult}
        </span>
        <span className="text-xs font-normal text-muted-foreground my-auto font-number">
          ({finalRoll} + {totalBonus})
        </span>
      </span>
      {isCritical && finalResult !== 20 && finalResult !== 1 && (
        <span className="text-xs text-emerald-600 my-auto font-heading font-bold">
          ACERTOU UM ATAQUE CRÍTICO
        </span>
      )}
      {finalRoll === 20 && <CritialRole />}
      {finalRoll === 1 && <CritialFailure />}
    </div>
  );
}
