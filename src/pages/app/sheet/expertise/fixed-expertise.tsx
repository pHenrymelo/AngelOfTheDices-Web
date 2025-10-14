import { Card, CardContent, CardTitle } from '@/components/ui/card';
import type { CharacterAttributes } from '@/types/character/character';
import type { CharacterExpertise } from '@/types/character/expertise';
import { ExpertiseItem } from './expertise-item';

interface FixedExpertiseProps {
  expertises: CharacterExpertise[];
  attributes: CharacterAttributes;
  onRoll: (params: {
    expertiseName: string;
    totalBonus: number;
    attributeValue: number;
  }) => void;
  onUpdate: (updatedExpertise: CharacterExpertise) => void;
  isSaving: boolean;
}

export function FixedExpertise({
  expertises,
  attributes,
  onRoll,
  onUpdate,
  isSaving,
}: FixedExpertiseProps) {
  const trainedExpertises = expertises.filter(
    (exp) => exp.trainingRank.name !== 'UNTRAINED',
  );

  return (
    <Card className="flex-1 p-4 h-96 flex flex-col">
      <div className="flex flex-col justify-center items-center border-b-2 py-1 font-heading">
        <CardTitle className="text-xl">PERÍCIAS</CardTitle>
        <p className="text-sm text-muted-foreground">(Acesso rápido)</p>
      </div>

      <CardContent className="grid grid-cols-3 gap-4 pt-4 overflow-y-auto px-4">
        {trainedExpertises.length > 0 ? (
          trainedExpertises.map((expertise) => (
            <ExpertiseItem
              key={expertise.expertiseName.name}
              expertise={expertise}
              attributes={attributes}
              onRoll={onRoll}
              onUpdate={onUpdate}
              isSaving={isSaving}
            />
          ))
        ) : (
          <div className="col-span-3 flex items-center justify-center h-full">
            <span className="text-muted-foreground text-sm">
              Não há perícias treinadas.
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
