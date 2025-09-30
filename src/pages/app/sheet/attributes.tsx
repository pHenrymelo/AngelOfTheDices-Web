import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { AttributeItem } from './attribute-item';

export function Attributes() {
  function handleRollDice(attributeName: string, attributeValue: number) {
    const diceCount = attributeValue > 0 ? attributeValue : 2;
    const rolls: number[] = [];

    for (let i = 0; i < diceCount; i++) {
      rolls.push(Math.floor(Math.random() * 20) + 1);
    }

    const result = attributeValue > 0 ? Math.max(...rolls) : Math.min(...rolls);

    toast(
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
      </div>,
    );
  }

  return (
    <Card className="flex-1 p-4">
      <h2 className="flex justify-center items-center text-xl border-b-2 py-1">
        Atributos
      </h2>
      <div className="grid grid-cols-5">
        <AttributeItem name="Presença" value={3} onRoll={handleRollDice} />
        <AttributeItem name="Força" value={1} onRoll={handleRollDice} />
        <AttributeItem name="Agilidade" value={3} onRoll={handleRollDice} />
        <AttributeItem name="Intelecto" value={5} onRoll={handleRollDice} />
        <AttributeItem name="Vigor" value={1} onRoll={handleRollDice} />
      </div>
    </Card>
  );
}
