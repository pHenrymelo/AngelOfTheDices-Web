import { CritialFailure, CritialRole } from './roll-toast-base';

interface RollToastBaseProps {
  expertiseName: string;
  finalResult: number;
  finalRoll: number;
  totalBonus: number;
  rolls: number[];
}

export function RollExpertiseToast({
  expertiseName,
  finalResult,
  rolls,
  finalRoll,
  totalBonus,
}: RollToastBaseProps) {
  return (
    <div>
      A rolagem de <span className="font-bold">{expertiseName}</span> deu:{' '}
      <div className="flex items-center gap-2">
        {rolls.map((roll) => (
          <span
            key={roll}
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
      {finalRoll === 20 && <CritialRole />}
      {finalRoll === 1 && <CritialFailure />}
    </div>
  );
}
