import { useState } from 'react';
import { toast } from 'sonner';
import { RollExpertiseToast } from '@/components/toasts/roll-expertise-toast';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import type { Expertise } from '@/types/sheet/training-bonus';
import { ExpertiseItem } from './expertise-item';

const exemples: Expertise[] = [
  { name: 'Acrobacia', attribute: 'AGI', training: 'UNTRAINED', otherBonus: 0 },
  {
    name: 'Adestramento',
    attribute: 'PRE',
    training: 'TRAINED',
    otherBonus: 0,
  },
  { name: 'Pontaria', attribute: 'INT', training: 'EXPERT', otherBonus: 2 },
];

export function Expertises() {
  const attributes = { AGI: 3, INT: 5, VIG: 1, PRE: 3, FOR: 0 };

  const [expertises, setExpertises] = useState(exemples);

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

  function handleUpdateExpertise(updateExpertise: Expertise) {
    setExpertises((prev) =>
      prev.map((exp) =>
        exp.name === updateExpertise.name ? updateExpertise : exp,
      ),
    );
  }

  return (
    <Card className="flex-1 p-4">
      <CardTitle className="flex justify-center items-center text-xl border-b-2 py-1 font-heading">
        PERÍCIAS
      </CardTitle>
      <CardContent className="flex items-center gap-4">
        {expertises.map((expertise) => (
          <ExpertiseItem
            key={expertise.name}
            expertise={expertise}
            attributeValue={attributes[expertise.attribute]}
            onRoll={handleRoll}
            onUpdate={handleUpdateExpertise}
          />
        ))}
      </CardContent>
    </Card>
  );
}
