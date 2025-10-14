import { Card, CardContent, CardTitle } from '@/components/ui/card';
import type { CharacterAttributes } from '@/types/character/character';
import type { CharacterExpertise } from '@/types/character/expertise';
import { ExpertiseItem } from './expertise-item';

interface ExpertisesProps {
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

export function Expertises({
  attributes,
  expertises,
  onRoll,
  onUpdate,
  isSaving,
}: ExpertisesProps) {
  return (
    <Card className="flex-1 p-4">
      <CardTitle className="flex justify-center items-center text-xl border-b pb-2 font-heading">
        PERÍCIAS
      </CardTitle>
      <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 p-0 md:px-4 gap-4">
        {expertises.map((expertise) => (
          <ExpertiseItem
            key={expertise.expertiseName.name}
            expertise={expertise}
            attributes={attributes}
            onRoll={onRoll}
            onUpdate={onUpdate}
            isSaving={isSaving}
          />
        ))}
      </CardContent>
    </Card>
  );
}
