import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { getMasterExpertises } from '@/api/data/get-expertises';
import { setCharacterExpertise } from '@/api/sheet/expertise/get-character-expertises';
import { getSheetById } from '@/api/sheet/get-sheet-by-id';
import { patchCharacterStatus } from '@/api/sheet/status/update-status';
import { updateCharacter } from '@/api/sheet/update-sheet';
import { uploadCharacterPortrait } from '@/api/sheet/upload-character-portrait';
import { RollExpertiseToast } from '@/components/toasts/roll-expertise-toast';
import { Skeleton } from '@/components/ui/skeleton';
import type { CharacterAttributes } from '@/types/character/character';
import type { CharacterStatusUpdateDTO } from '@/types/character/dtos/characterStatusUpdateDTO';
import type { CharacterUpdateDTO } from '@/types/character/dtos/createCharacterDTO';
import type { CharacterExpertise } from '@/types/character/expertise';
import { Abilities } from './abilities/abilities';
import { Attributes } from './attributes/attributes';
import { Combat } from './combat/combat';
import { Expertises } from './expertise/expertises';
import { FixedExpertise } from './expertise/fixed-expertise';
import { Inventory } from './inventory/inventory';
import { Notes } from './notes/notes';
import { PersonalDetails } from './personal-details/personal-details';
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

  const { mutateAsync: updateCharacterFn, isPending: isUpdatingCharacter } =
    useMutation({
      mutationFn: updateCharacter,
      onSuccess: (data) => {
        toast.success(`Ficha de "${data.name}" atualizada.`);
        queryClient.invalidateQueries({ queryKey: ['character', characterId] });
        queryClient.invalidateQueries({ queryKey: ['sheets'] });
      },
      onError: (error) => {
        if (isAxiosError(error)) {
          toast.error(
            error.response?.data?.message || 'Falha ao atualizar a ficha.',
          );
        }
      },
    });

  const { mutateAsync: uploadPortraitFn, isPending: isUploadingPortrait } =
    useMutation({
      mutationFn: uploadCharacterPortrait,
      onSuccess: () => {
        toast.success('Retrato do agente atualizado.');
        queryClient.invalidateQueries({ queryKey: ['character', characterId] });
        queryClient.invalidateQueries({ queryKey: ['sheets'] });
      },
      onError: (error) => {
        if (isAxiosError(error)) {
          toast.error(
            error.response?.data?.message || 'Falha ao enviar o retrato.',
          );
        }
      },
    });

  function handleStatusUpdate(dto: CharacterStatusUpdateDTO) {
    if (!characterId) return;
    updateStatusFn({ characterId, dto });
  }

  async function handleCharacterUpdate(dto: CharacterUpdateDTO) {
    if (!characterId) return;
    await updateCharacterFn({ characterId, dto });
  }

  async function handlePortraitUpload(file: File) {
    if (!characterId) return;
    await uploadPortraitFn({ characterId, file });
  }

  const isUpdating = isUpdatingCharacter || isUploadingPortrait;

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

  function handleRollExpertise({
    expertiseName,
    totalBonus,
    attributeValue,
  }: {
    expertiseName: string;
    totalBonus: number;
    attributeValue: number;
  }) {
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

  const { mutate: updateExpertiseFn, isPending: isSavingExpertise } =
    useMutation({
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
    if (!characterId) return;
    updateExpertiseFn({
      characterId: characterId!,
      dto: {
        expertiseName: updatedExpertise.expertiseName.name,
        trainingRank: updatedExpertise.trainingRank.name,
        hasKit: updatedExpertise.hasKit,
      },
    });
  }

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
        <SheetStatus
          character={character}
          onStatusUpdate={handleStatusUpdate}
          onCharacterUpdate={handleCharacterUpdate}
          onPortraitUpload={handlePortraitUpload}
          isUpdating={isUpdating}
        />
        <PersonalDetails
          character={character}
          onCharacterUpdate={handleCharacterUpdate}
          isUpdating={isUpdating}
        />
      </div>
      <div className="flex flex-col lg:flex-row gap-4">
        <Attributes
          character={character}
          onCharacterUpdate={handleCharacterUpdate}
          isUpdating={isUpdating}
        />
        <FixedExpertise
          attributes={attributes}
          expertises={fullExpertiseList}
          onRoll={handleRollExpertise}
          onUpdate={handleUpdateExpertise}
          isSaving={isSavingExpertise}
        />
      </div>
      <Combat characterId={character.id} attacks={character.attacks} />
      <Inventory character={character} />
      <Expertises
        expertises={fullExpertiseList}
        attributes={attributes}
        onRoll={handleRollExpertise}
        onUpdate={handleUpdateExpertise}
        isSaving={isSavingExpertise}
      />
      <div className="flex flex-col lg:flex-row gap-4">
        <Abilities characterId={character.id} abilities={character.abilities} />
        <Rituals characterId={character.id} rituals={character.rituals} />
      </div>
      <Notes characterId={character.id} notes={character.notes} />
    </div>
  );
}
