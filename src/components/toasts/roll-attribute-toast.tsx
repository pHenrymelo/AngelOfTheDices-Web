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
                ? 'font-bold text-primary text-lg'
                : 'text-muted-foreground'
            }
          >
            {roll}
          </span>
        ))}
      </div>
      {result === 20 && (
        <span className="text-xs font-normal text-emerald-500 my-auto">
          SUCESSO CRÍTICO
        </span>
      )}
      {result === 1 && (
        <span className="text-xs font-normal text-red-600 my-auto">
          FALHA CRÍTICA
        </span>
      )}
    </div>
  );
}
