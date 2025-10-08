import { toast } from 'sonner';
import { RollExpertiseToast } from '@/components/toasts/roll-expertise-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { CharacterAttributes } from '@/types/character/character';
import type { CharacterExpertise } from '@/types/character/expertise';
import { ExpertiseItem } from './expertise-item';

interface FixedExpertiseProps {
  expertises: CharacterExpertise[];
  attributes: CharacterAttributes;
}

function handleRoll(
  expertiseName: string,
  totalBonus: number,
  attributeValue: number,
) {
  const diceCount = attributeValue > 0 ? attributeValue : 2;
  const rolls: number[] = [];

  for (let i = 0; i < diceCount; i++) {
    rolls.push(Math.floor(Math.random() * 20) + 1);
  }

  const finalRoll =
    attributeValue > 0 ? Math.max(...rolls) : Math.min(...rolls);

  const finalResult = finalRoll + totalBonus;

  toast(
    <RollExpertiseToast
      expertiseName={expertiseName}
      finalResult={finalResult}
      finalRoll={finalRoll}
      rolls={rolls}
      totalBonus={totalBonus}
    />,
  );
}

export function FixedExpertise({
  expertises,
  attributes,
}: FixedExpertiseProps) {
  const trainedExpertises = expertises.filter(
    (exp) => exp.trainingRank.name !== 'UNTRAINED',
  );

  return (
    <Card className="flex-1 p-4 h-96">
      <CardHeader className="flex flex-col justify-center items-center border-b-2 py-1 font-heading">
        <CardTitle className="text-xl">PERÍCIAS</CardTitle>
        <p className="text-sm text-muted-foreground">(Acesso rápido)</p>
      </CardHeader>
      <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4 overflow-y-auto">
        {trainedExpertises.length > 0 ? (
          trainedExpertises.map((expertise) => (
            <ExpertiseItem
              key={expertise.expertiseName.name}
              expertise={expertise}
              attributeValue={
                attributes[
                  expertise.expertiseName
                    .baseAttribute as keyof CharacterAttributes
                ]
              }
              onRoll={handleRoll}
              onUpdate={() => {}}
            />
          ))
        ) : (
          <div className="col-span-2 flex items-center justify-center h-full">
            <span className="text-muted-foreground text-sm">
              Não há perícias treinadas.
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
