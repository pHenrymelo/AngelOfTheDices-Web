import { PenBox } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import type { Character } from '@/types/character/character';
import type { CharacterUpdateDTO } from '@/types/character/dtos/createCharacterDTO';
import { PersonalDetailsEditDialog } from './personal-details-edit-dialog';

interface PersonalDetailsProps {
  character: Character;
  onCharacterUpdate: (dto: CharacterUpdateDTO) => Promise<void>;
  isUpdating: boolean;
}

export function PersonalDetails({
  character,
  isUpdating,
  onCharacterUpdate,
}: PersonalDetailsProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <Card className="w-full lg:w-1/2 p-4 relative">
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 text-muted-foreground hover:text-primary"
          >
            <PenBox className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <CardTitle className="flex font-bold text-2xl justify-center font-heading">
          DETALHES PESSOAIS
        </CardTitle>
        <CardContent className="flex flex-col px-2 space-y-4 mt-6">
          <div className="flex flex-col md:flex-row space-y-2">
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
      <PersonalDetailsEditDialog
        character={character}
        onUpdate={onCharacterUpdate}
        isUpdating={isUpdating}
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      />
    </Dialog>
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
    <div className="flex-1 flex-col min-w-0">
      {' '}
      <span className="font-semibold font-heading">{label}</span>
      <p className="border-b-2 text-muted-foreground p-2 whitespace-nowrap overflow-hidden text-ellipsis">
        {value ?? '—'}
      </p>
    </div>
  );
}
