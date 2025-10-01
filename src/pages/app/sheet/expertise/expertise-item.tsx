import { DiceD20Icon } from '@/components/icons';
import { Button } from '@/components/ui/button';

import { type Expertise, TRAINING_BONUS } from '@/types/sheet/training-bonus';

interface ExpertiseItemProps {
  expertise: Expertise;
  attributeValue: number;
  onRoll: (
    skillName: string,
    totalBonus: number,
    attributeValue: number,
  ) => void;
  onUpdate: (updateExpertise: Expertise) => void;
}

export function ExpertiseItem({
  attributeValue,
  expertise,
  onRoll,
}: ExpertiseItemProps) {
  const trainingBonus = TRAINING_BONUS[expertise.training];
  const totalBonus = trainingBonus + expertise.otherBonus;

  return (
    <div className="flex flex-col justify-center items-center">
      <Button
        onClick={() => onRoll(expertise.name, totalBonus, attributeValue)}
        variant={'ghost'}
        className="w-16 h-16 group flex-col"
      >
        <DiceD20Icon className="group-hover:animate-spin size-8" />
      </Button>
      <span className=" w-full flex font-semibold text-primary items-center justify-center">
        ({expertise.attribute})
      </span>
      <span className="font-semibold">{expertise.name}</span>
      <span className=" w-full flex font-bold text-xl text-primary items-center justify-center">
        {totalBonus >= 0 ? `+${totalBonus}` : totalBonus}
      </span>
    </div>
  );
}
