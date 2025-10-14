import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { PlusCircle } from 'lucide-react';
import { toast } from 'sonner';
import { createAbility } from '@/api/sheet/abilities/create-ability';
import { deleteAbility } from '@/api/sheet/abilities/delete-ability';
import { updateAbility } from '@/api/sheet/abilities/update-ability';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type {
  AbilityRequestDTO,
  AbilityResponseDTO,
} from '@/types/character/ability';
import { AbilityCard } from './ability-card';
import { AbilityFormDialog } from './ability-form-dialog';

interface AbilitiesProps {
  characterId: string;
  abilities: AbilityResponseDTO[];
}

export function Abilities({ characterId, abilities }: AbilitiesProps) {
  const queryClient = useQueryClient();

  const { mutate: createAbilityFn, isPending: isCreating } = useMutation({
    mutationFn: createAbility,
    onSuccess: () => {
      toast.success('Habilidade adicionada com sucesso.');
      queryClient.invalidateQueries({ queryKey: ['character', characterId] });
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || 'Falha ao adicionar habilidade.',
        );
      }
    },
  });

  const { mutate: updateAbilityFn, isPending: isUpdating } = useMutation({
    mutationFn: updateAbility,
    onSuccess: () => {
      toast.success('Habilidade atualizada com sucesso.');
      queryClient.invalidateQueries({ queryKey: ['character', characterId] });
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || 'Falha ao atualizar habilidade.',
        );
      }
    },
  });

  const { mutate: deleteAbilityFn, isPending: isDeleting } = useMutation({
    mutationFn: deleteAbility,
    onSuccess: () => {
      toast.success('Habilidade removida.');
      queryClient.invalidateQueries({ queryKey: ['character', characterId] });
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || 'Falha ao remover habilidade.',
        );
      }
    },
  });

  function handleCreateAbility(dto: AbilityRequestDTO) {
    createAbilityFn({ characterId, dto });
  }

  function handleUpdateAbility(abilityId: string, dto: AbilityRequestDTO) {
    updateAbilityFn({ characterId, abilityId, dto });
  }

  function handleDeleteAbility(abilityId: string) {
    deleteAbilityFn({ characterId, abilityId });
  }

  const isSaving = isCreating || isUpdating;

  return (
    <Card className="flex-1 p-4">
      <CardHeader className="relative flex justify-center items-center border-b pb-2">
        <CardTitle className="font-heading text-xl">
          Habilidades e Poderes
        </CardTitle>
        <AbilityFormDialog onSave={handleCreateAbility} isSaving={isSaving}>
          <Button size="sm" variant="ghost" className="absolute right-0">
            <PlusCircle className="mr-2 h-4 w-4" />
            Adicionar
          </Button>
        </AbilityFormDialog>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 max-h-[475px] overflow-y-auto p-0 md:px-4">
        {abilities && abilities.length > 0 ? (
          abilities.map((ability) => (
            <AbilityCard
              key={ability.id}
              ability={ability}
              onUpdate={handleUpdateAbility}
              onDelete={handleDeleteAbility}
              isSaving={isSaving}
              isDeleting={isDeleting}
            />
          ))
        ) : (
          <p className="flex-1 text-center text-muted-foreground py-4">
            Nenhuma habilidade ou poder registrado.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
