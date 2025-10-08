import { DiceD20Icon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import type { CharacterExpertise } from '@/types/character/expertise';

interface ExpertiseItemProps {
  expertise: CharacterExpertise;
  attributeValue: number;
  onRoll: (
    expertiseName: string,
    totalBonus: number,
    attributeValue: number,
  ) => void;
  onUpdate: (updatedExpertise: CharacterExpertise) => void;
}

export function ExpertiseItem({
  attributeValue,
  expertise,
  onRoll,
}: ExpertiseItemProps) {
  const trainingBonus = expertise.trainingRank.bonus;
  const otherBonus = expertise.otherBonus;

  const kitPenalty =
    expertise.expertiseName.kitApplicable && !expertise.hasKit ? -5 : 0;

  const totalBonus = trainingBonus + otherBonus + kitPenalty;

  return (
    <div className="flex flex-col justify-center items-center p-2 border rounded-md">
      <Button
        onClick={() =>
          onRoll(
            expertise.expertiseName.displayName,
            totalBonus,
            attributeValue,
          )
        }
        variant={'ghost'}
        className=" w-16 h-16 group flex-col"
      >
        <DiceD20Icon className="group-hover:animate-spin size-8" />
      </Button>
      <span className="font-semibold font-heading text-center">
        {expertise.expertiseName.displayName}
      </span>
      <span className="text-primary font-bold text-2xl font-number">
        {totalBonus >= 0 ? `+${totalBonus}` : totalBonus}
      </span>
    </div>
  );
}
