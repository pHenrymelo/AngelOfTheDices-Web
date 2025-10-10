import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';
import { setCharacterExpertise } from '@/api/sheet/expertise/get-character-expertises';
import { RollExpertiseToast } from '@/components/toasts/roll-expertise-toast';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { queryClient } from '@/lib/react-query';
import type { CharacterAttributes } from '@/types/character/character';
import type { CharacterExpertise } from '@/types/character/expertise';
import { ExpertiseItem } from './expertise-item';

interface ExpertisesProps {
  characterId: string;
  expertises: CharacterExpertise[];
  attributes: CharacterAttributes;
}

export function Expertises({
  attributes,
  characterId,
  expertises,
}: ExpertisesProps) {
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

  const mutation = useMutation({
    mutationFn: setCharacterExpertise,
    onSuccess: () => {
      toast.success('Perícia atualizada com sucesso!');

      queryClient.invalidateQueries({ queryKey: ['character', characterId] });
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || 'Falha ao atualizar perícia.';
        toast.error(errorMessage);
      } else {
        toast.error(
          'Ocorreu um erro inesperado ao tentar atualizar a perícia.',
        );
        console.error('Unexpected error:', error);
      }
    },
  });

  function handleUpdateExpertise(updatedExpertise: CharacterExpertise) {
    mutation.mutate({
      characterId,
      dto: {
        expertiseName: updatedExpertise.expertiseName.name,
        trainingRank: updatedExpertise.trainingRank.name,
        hasKit: updatedExpertise.hasKit,
      },
    });
  }

  return (
    <Card className="flex-1 p-4">
      <CardTitle className="flex justify-center items-center text-xl border-b-2 pb-2 font-heading">
        PERÍCIAS
      </CardTitle>
      <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 pt-4">
        {expertises.map((expertise) => (
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
            onUpdate={handleUpdateExpertise}
          />
        ))}
      </CardContent>
    </Card>
  );
}
