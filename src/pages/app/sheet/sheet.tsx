import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { getMasterExpertises } from '@/api/data/get-expertises';
import { getSheetById } from '@/api/sheet/get-sheet-by-id';
import { patchCharacterStatus } from '@/api/sheet/status/update-status';
import { Skeleton } from '@/components/ui/skeleton';
import type { CharacterAttributes } from '@/types/character/character';
import type { CharacterStatusUpdateDTO } from '@/types/character/dtos/characterStatusUpdateDTO';
import { Abilities } from './abilities/abilities';
import { Attributes } from './attributes/attributes';
import { Combat } from './combat/combat';
import { Expertises } from './expertise/expertises';
import { FixedExpertise } from './expertise/fixed-expertise';
import { Inventory } from './inventory/inventory';
import { Notes } from './notes/notes';
import { PersonalDetails } from './personal-details';
import { Rituals } from './rituals/rituals';
import { SheetStatus } from './status/sheet-status';

export function Sheet() {
  const { id: characterId } = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  const {
    data: character,
    isLoading: isLoadingCharacter,
    isError: isErrorCharacter,
  } = useQuery({
    queryKey: ['character', characterId],
    queryFn: () => getSheetById(characterId!),
    enabled: !!characterId,
  });

  const {
    data: masterExpertises,
    isLoading: isLoadingMaster,
    isError: isErrorMaster,
  } = useQuery({
    queryKey: ['expertises'],
    queryFn: getMasterExpertises,
  });

  const { mutate: updateStatusFn } = useMutation({
    mutationFn: patchCharacterStatus,
    onSuccess: () => {
      toast.success('Status atualizado.');
      queryClient.invalidateQueries({ queryKey: ['character', characterId] });
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || 'Falha ao atualizar status.',
        );
      }
    },
  });

  function handleStatusUpdate(dto: CharacterStatusUpdateDTO) {
    if (!characterId) return;
    updateStatusFn({ characterId, dto });
  }

  const fullExpertiseList = useMemo(() => {
    if (!masterExpertises || !character) return [];

    const characterSkillsMap = new Map(
      character.expertises.map((skill) => [skill.expertiseName.name, skill]),
    );

    return masterExpertises.map((masterSkill) => {
      const characterSkill = characterSkillsMap.get(masterSkill.name);
      if (characterSkill) {
        return characterSkill;
      }
      return {
        expertiseName: masterSkill,
        trainingRank: { name: 'UNTRAINED', bonus: 0 },
        hasKit: false,
        otherBonus: 0,
      };
    });
  }, [character, masterExpertises]);

  if (isLoadingCharacter || isLoadingMaster) {
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Carregando Dossiê...
        </h1>
        <Skeleton className="mt-4 h-[80vh] w-full" />
      </div>
    );
  }

  if (isErrorCharacter || isErrorMaster || !character) {
    return (
      <div className="text-center text-destructive py-20">
        <h1 className="text-2xl font-bold">Ops... Falha Crítica.</h1>
        <p>
          Houve um erro ao carregar esta ficha. Verifique se ela existe ou tente
          novamente.
        </p>
      </div>
    );
  }

  const attributes: CharacterAttributes = {
    FOR: character.strength,
    AGI: character.agility,
    INT: character.intellect,
    PRE: character.presence,
    VIG: character.vigor,
  };

  return (
    <div className=" container mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="flex flex-col lg:flex-row gap-4">
        {character && (
          <SheetStatus
            character={character}
            onStatusUpdate={handleStatusUpdate}
          />
        )}
        {character && <PersonalDetails character={character} />}
      </div>
      <div className="flex flex-col lg:flex-row gap-4">
        {character && <Attributes character={character} />}
        <FixedExpertise
          attributes={attributes}
          expertises={character.expertises}
        />
      </div>
      <Combat characterId={character.id} attacks={character.attacks} />
      <Inventory character={character} />
      <Expertises
        characterId={character.id}
        expertises={fullExpertiseList}
        attributes={attributes}
      />
      <div className="flex flex-col lg:flex-row gap-4">
        <Abilities characterId={character.id} abilities={character.abilities} />
        <Rituals characterId={character.id} rituals={character.rituals} />
      </div>
      <Notes characterId={character.id} notes={character.notes} />
    </div>
  );
}
