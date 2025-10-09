import { toast } from 'sonner';
import { RollAttributeToast } from '@/components/toasts/roll-attribute-toast';
import { Card, CardTitle } from '@/components/ui/card';
import type { Character } from '@/types/character/character';
import { AttributeItem } from './attribute-item';

interface AttributesProps {
  character: Character;
}

export function Attributes({ character }: AttributesProps) {
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
    <Card className="flex-1 p-4">
      <CardTitle className="flex justify-center items-center text-xl border-b-2 pb-2 font-heading">
        ATRIBUTOS
      </CardTitle>
      <div className="grid grid-cols-5 py-4">
        <AttributeItem
          name="Presença"
          value={character.presence}
          onRoll={handleRollDice}
        />
        <AttributeItem
          name="Força"
          value={character.strength}
          onRoll={handleRollDice}
        />
        <AttributeItem
          name="Agilidade"
          value={character.agility}
          onRoll={handleRollDice}
        />
        <AttributeItem
          name="Intelecto"
          value={character.intellect}
          onRoll={handleRollDice}
        />
        <AttributeItem
          name="Vigor"
          value={character.vigor}
          onRoll={handleRollDice}
        />
      </div>
      <div className="w-full flex justify-evenly my-auto">
        <div className=" text-2xl font-medium flex flex-col justify-center items-center border-b-2 gap-2 py-1">
          Deslocamento{' '}
          <span className="font-bold text-3xl font-number text-primary">
            {character.movement}m
          </span>
        </div>
        <div className=" text-2xl font-medium flex flex-col justify-center items-center border-b-2 gap-2 py-1">
          Defesa{' '}
          <span className="font-bold text-3xl text-primary font-number">
            {character.defense}
          </span>
        </div>
      </div>
    </Card>
  );
}
