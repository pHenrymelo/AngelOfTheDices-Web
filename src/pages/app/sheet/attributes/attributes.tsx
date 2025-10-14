import { PenBox } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { RollAttributeToast } from '@/components/toasts/roll-attribute-toast';
import { Button } from '@/components/ui/button';
import { Card, CardTitle } from '@/components/ui/card';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import type { Character } from '@/types/character/character';
import type { CharacterUpdateDTO } from '@/types/character/dtos/createCharacterDTO';
import { AttributeItem } from './attribute-item';
import { AttributesEditDialog } from './attributes-edit-dialog';

interface AttributesProps {
  character: Character;
  onCharacterUpdate: (dto: CharacterUpdateDTO) => Promise<void>;
  isUpdating: boolean;
}

export function Attributes({
  character,
  isUpdating,
  onCharacterUpdate,
}: AttributesProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

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
      <Card className="flex-1 p-4 relative">
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 text-muted-foreground hover:text-primary"
          >
            <PenBox className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <CardTitle className="flex justify-center items-center text-xl border-b pb-2 font-heading">
          ATRIBUTOS
        </CardTitle>
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
        <div className="w-full flex justify-evenly my-auto">
          <div className=" text-xl md:text-2xl font-medium flex flex-col justify-center items-center border-b gap-2 py-1">
            Deslocamento{' '}
            <span className="font-bold text-2xl font-number text-primary">
              {character.movement}m
            </span>
          </div>
          <div className=" text-xl md:text-2xl font-medium flex flex-col justify-center items-center border-b gap-2 py-1">
            Defesa{' '}
            <span className="font-bold text-2xl text-primary font-number">
              {character.defense.total}
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
