import { RollAttributeToast } from '@/components/toasts/roll-attribute-toast';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import type { Character } from '@/types/character/character';
import type { CharacterUpdateDTO } from '@/types/character/dtos/createCharacterDTO';
import type { CharacterExpertise } from '@/types/character/expertise';
import { PenBox } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { AttributeItem } from './attribute-item';
import { AttributesEditDialog } from './attributes-edit-dialog';

interface AttributesProps {
  character: Character;
  expertises: CharacterExpertise[];
  onCharacterUpdate: (dto: CharacterUpdateDTO) => Promise<void>;
  isUpdating: boolean;
}

export function Attributes({
  character,
  isUpdating,
  onCharacterUpdate,
  expertises,
}: AttributesProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const fortitudeExpertise = expertises.find(
    (exp) => exp.expertiseName.displayName === 'Fortitude',
  );
  const blockValue =
    (fortitudeExpertise?.trainingRank.bonus ?? 0) +
    (fortitudeExpertise?.otherBonus ?? 0) +
    character.blockBonus;

  const reflexExpertise = expertises.find(
    (exp) => exp.expertiseName.displayName === 'Reflexos',
  );
  const reflexesBonus =
    (reflexExpertise?.trainingRank.bonus ?? 0) +
    (reflexExpertise?.otherBonus ?? 0);
  const dodgeValue =
    character.defense.total + reflexesBonus + character.dodgeBonus;

  function handleRollDice(attributeName: string, attributeValue: number) {
    const diceCount = attributeValue > 0 ? attributeValue : 2;
    const rolls: number[] = [];

    for (let i = 0; i < diceCount; i++) {
      rolls.push(Math.floor(Math.random() * 20) + 1);
    }

    const result = attributeValue > 0 ? Math.max(...rolls) : Math.min(...rolls);

    toast(
      <RollAttributeToast
        attributeName={attributeName}
        result={result}
        rolls={rolls}
      />,
    );
  }

  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <Card className="flex-1 p-4">
        <CardHeader className="relative flex items-center border-b pt-3">
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 text-muted-foreground hover:text-primary"
            >
              <PenBox className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <CardTitle className="flex flex-col md:flex-row md:mx-auto font-heading text-xl">
            ATRIBUTOS
          </CardTitle>
        </CardHeader>
        <div className="grid grid-cols-5 py-4">
          <AttributeItem
            name="PRE"
            value={character.presence}
            onRoll={handleRollDice}
          />
          <AttributeItem
            name="FOR"
            value={character.strength}
            onRoll={handleRollDice}
          />
          <AttributeItem
            name="AGI"
            value={character.agility}
            onRoll={handleRollDice}
          />
          <AttributeItem
            name="INT"
            value={character.intellect}
            onRoll={handleRollDice}
          />
          <AttributeItem
            name="VIG"
            value={character.vigor}
            onRoll={handleRollDice}
          />
        </div>
        <div className="w-full grid grid-cols-2 gap-4 my-auto ">
          <div className="text-xl flex flex-col justify-center items-center border-b gap-2 py-1 font-heading font-semibold">
            Deslocamento
            <span className="font-bold text-xl font-number text-primary">
              {character.movement}m
            </span>
          </div>
          <div className="text-xl flex flex-col justify-center items-center border-b gap-2 py-1 font-heading font-semibold">
            Defesa
            <span className="font-bold text-xl text-primary font-number">
              {character.defense.total}{' '}
            </span>
          </div>
          <div className="text-xl flex flex-col justify-center items-center border-b gap-2 py-1 font-heading font-semibold">
            Esquiva
            <span className="font-bold text-xl text-primary font-number">
              {dodgeValue}
            </span>
          </div>
          <div className="text-xl flex flex-col justify-center items-center border-b gap-2 py-1 font-heading font-semibold">
            Bloqueio
            <span className="font-bold text-xl text-primary font-number">
              {blockValue}
            </span>
          </div>
        </div>
      </Card>
      <AttributesEditDialog
        character={character}
        onUpdate={onCharacterUpdate}
        isUpdating={isUpdating}
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      />
    </Dialog>
  );
}
