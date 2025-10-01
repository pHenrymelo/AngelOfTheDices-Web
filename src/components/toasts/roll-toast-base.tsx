interface RollToastBaseProps {
  faces: number;
  result: number;
}

export function RollToastBase({ faces, result }: RollToastBaseProps) {
  return (
    <div className="flex flex-col gap-2">
      <div>
        Rolou um <span className="font-bold">D{faces}</span> e tirou:{' '}
        <span className="font-bold text-primary font-number">{result}</span>
      </div>
      {result === 20 && faces === 20 && <CritialRole />}
      {result === 1 && faces === 20 && <CritialFailure />}
    </div>
  );
}

export function CritialRole() {
  return (
    <span className="text-xs text-emerald-600 my-auto font-heading font-bold">
      SUCESSO CRÍTICO 🍀
    </span>
  );
}

export function CritialFailure() {
  return (
    <span className="text-xs text-red-600 my-auto font-heading font-bold">
      FALHA CRÍTICA ⚠️
    </span>
  );
}
