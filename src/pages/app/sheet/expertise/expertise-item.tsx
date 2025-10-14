import { PenBox, SlidersHorizontal } from 'lucide-react';
import { DiceD20Icon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import type { CharacterAttributes } from '@/types/character/character';
import type { CharacterExpertise } from '@/types/character/expertise';
import { ExpertiseEditDialog } from './expertise-edit-dialog';
import { ExpertiseRollDialog } from './expertise-roll-dialog';

interface ExpertiseItemProps {
  expertise: CharacterExpertise;
  attributes: CharacterAttributes;
  onUpdate: (updatedExpertise: CharacterExpertise) => void;
  onRoll: (params: {
    expertiseName: string;
    totalBonus: number;
    attributeValue: number;
  }) => void;
  isSaving: boolean;
}

export function ExpertiseItem({
  expertise,
  attributes,
  onUpdate,
  onRoll,
  isSaving,
}: ExpertiseItemProps) {
  const trainingBonus = expertise.trainingRank.bonus;
  const otherBonus = expertise.otherBonus;
  const kitPenalty =
    expertise.expertiseName.kitApplicable && !expertise.hasKit ? -5 : 0;
  const totalBonus = trainingBonus + otherBonus + kitPenalty;

  const baseAttributeValue =
    attributes[
      expertise.expertiseName.baseAttribute as keyof CharacterAttributes
    ];

  return (
    <div className="flex flex-col justify-between items-center p-2 border rounded-md h-full">
      <Button
        onClick={() =>
          onRoll({
            expertiseName: expertise.expertiseName.displayName,
            totalBonus: totalBonus,
            attributeValue: baseAttributeValue,
          })
        }
        variant={'ghost'}
        size={'icon'}
        className="w-16 h-16 group flex-col"
      >
        <DiceD20Icon className="group-hover:animate-spin size-8" />
      </Button>

      <div className="text-center">
        <span className="font-bold font-heading">
          {expertise.expertiseName.displayName}
        </span>
        <p className="text-sm text-muted-foreground font-heading font-semibold">
          ({expertise.expertiseName.baseAttribute})
        </p>
      </div>

      <span className="text-primary font-semibold text-2xl font-number">
        {totalBonus >= 0 ? `+${totalBonus}` : totalBonus}
      </span>

      <div className="flex w-full justify-around mt-2 border-t pt-1">
        <ExpertiseEditDialog
          expertise={expertise}
          onUpdate={onUpdate}
          isSaving={isSaving}
        >
          <Button variant={'ghost'} size="icon" title="Editar Perícia">
            <PenBox className="h-4 w-4" />
          </Button>
        </ExpertiseEditDialog>

        <ExpertiseRollDialog
          expertiseName={expertise.expertiseName.displayName}
          baseAttributeName={
            expertise.expertiseName.baseAttribute as keyof CharacterAttributes
          }
          baseTotalBonus={totalBonus}
          attributes={attributes}
          onRoll={onRoll}
        >
          <Button variant={'ghost'} size="icon" title="Configurar Rolagem">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </ExpertiseRollDialog>
      </div>
    </div>
  );
}
