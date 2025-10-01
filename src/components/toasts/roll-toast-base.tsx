interface RollToastBaseProps {
  faces: number;
  result: number;
}

export function RollToastBase({ faces, result }: RollToastBaseProps) {
  return (
    <div className="flex flex-col gap-2">
      <div>
        Rolou um <span className="font-bold">D{faces}</span> e tirou:{' '}
        <span className="font-bold text-primary">{result}</span>
      </div>
      {result === 20 && faces === 20 && (
        <span className="text-xs font-normal text-emerald-500 my-auto">
          SUCESSO CRÍTICO
        </span>
      )}
      {result === 1 && faces === 20 && (
        <span className="text-xs font-normal text-red-600 my-auto">
          FALHA CRÍTICA
        </span>
      )}
    </div>
  );
}
