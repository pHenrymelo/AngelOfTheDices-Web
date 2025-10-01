import { CritialFailure, CritialRole } from './roll-toast-base';

interface RollToastBaseProps {
  attributeName: string;
  result: number;
  rolls: number[];
}

export function RollAttributeToast({
  attributeName,
  result,
  rolls,
}: RollToastBaseProps) {
  return (
    <div>
      A rolagem de <span className="font-bold">{attributeName}</span> deu:{' '}
      <div className="flex items-center gap-2">
        {rolls.map((roll) => (
          <span
            key={roll}
            className={
              roll === result
                ? 'font-bold text-primary text-lg font-number'
                : 'text-muted-foreground'
            }
          >
            {roll}
          </span>
        ))}
      </div>
      {result === 20 && <CritialRole />}
      {result === 1 && <CritialFailure />}
    </div>
  );
}
