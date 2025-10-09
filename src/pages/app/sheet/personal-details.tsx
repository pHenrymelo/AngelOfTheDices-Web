import { Card, CardContent, CardTitle } from '@/components/ui/card';
import type { Character } from '@/types/character/character';

interface PersonalDetailsProps {
  character: Character;
}

export function PersonalDetails({ character }: PersonalDetailsProps) {
  return (
    <Card className="w-full lg:w-1/2 p-4">
      <CardTitle className="flex font-bold text-2xl justify-center font-heading">
        DETALHES PESSOAIS
      </CardTitle>
      <CardContent className="flex flex-col px-4 space-y-4 mt-6">
        <div className="flex">
          <DetailItem label="Nome" value={character.name} />
          <DetailItem label="Jogador" value={character.playerName} />
        </div>
        <div className="flex">
          <DetailItem
            label="Classe"
            value={character.characterClass.displayName}
          />
          <DetailItem label="Trilha" value={character.path.displayName} />
        </div>
        <div className="flex">
          <DetailItem label="Idade" value={character.age} />
          <DetailItem label="Genero" value={character.gender} />
        </div>
        <div className="flex">
          <DetailItem label="Patente" value={character.rank.displayName} />
          <DetailItem label="Prestigio" value={character.prestigePoints} />
        </div>
        <div className="flex">
          <DetailItem label="Origem" value={character.origin.displayName} />
          <DetailItem
            label="Afinidade"
            value={character.affinity.displayName}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex-1 flex-col">
      <span className="font-semibold font-heading">{label}</span>
      <p className="border-b-2 text-muted-foreground p-2">{value ?? '—'}</p>
    </div>
  );
}
