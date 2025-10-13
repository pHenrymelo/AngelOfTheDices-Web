import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { PlusCircle } from 'lucide-react';
import { toast } from 'sonner';
import { createRitual } from '@/api/sheet/rituals/create-ritual';
import { deleteRitual } from '@/api/sheet/rituals/delete-ritual';
import { updateRitual } from '@/api/sheet/rituals/update-ritual';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import type {
  RitualRequestDTO,
  RitualResponseDTO,
} from '@/types/character/ritual';
import { RitualCard } from './ritual-card';
import { RitualFormDialog } from './ritual-form-dialog';

interface RitualsProps {
  characterId: string;
  rituals: RitualResponseDTO[];
}

export function Rituals({ characterId, rituals }: RitualsProps) {
  const queryClient = useQueryClient();

  const { mutate: createRitualFn, isPending: isCreating } = useMutation({
    mutationFn: createRitual,
    onSuccess: () => {
      toast.success('Ritual aprendido com sucesso.');
      queryClient.invalidateQueries({ queryKey: ['character', characterId] });
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || 'Falha ao aprender ritual.',
        );
      }
    },
  });

  const { mutate: updateRitualFn, isPending: isUpdating } = useMutation({
    mutationFn: updateRitual,
    onSuccess: () => {
      toast.success('Ritual atualizado com sucesso.');
      queryClient.invalidateQueries({ queryKey: ['character', characterId] });
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || 'Falha ao atualizar ritual.',
        );
      }
    },
  });

  const { mutate: deleteRitualFn, isPending: isDeleting } = useMutation({
    mutationFn: deleteRitual,
    onSuccess: () => {
      toast.success('Ritual esquecido.');
      queryClient.invalidateQueries({ queryKey: ['character', characterId] });
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || 'Falha ao esquecer ritual.',
        );
      }
    },
  });

  function handleCreateRitual(dto: RitualRequestDTO) {
    createRitualFn({ characterId, dto });
  }

  function handleUpdateRitual(ritualId: string, dto: RitualRequestDTO) {
    updateRitualFn({ characterId, ritualId, dto });
  }

  function handleDeleteRitual(ritualId: string) {
    deleteRitualFn({ characterId, ritualId });
  }

  const isSaving = isCreating || isUpdating;

  return (
    <Card className="flex-1 p-4">
      <div className="relative flex justify-center items-center border-b-2 pb-1 mb-4">
        <CardTitle className="font-heading text-xl">Rituais</CardTitle>
        <RitualFormDialog onSave={handleCreateRitual} isSaving={isSaving}>
          <Button size="sm" variant="ghost" className="absolute right-0">
            <PlusCircle className="mr-2 h-4 w-4" />
            Adicionar
          </Button>
        </RitualFormDialog>
      </div>
      <CardContent className="flex flex-col gap-4 p-0 max-h-[450px] overflow-y-auto pr-2">
        {rituals && rituals.length > 0 ? (
          rituals.map((ritual) => (
            <RitualCard
              key={ritual.id}
              ritual={ritual}
              onUpdate={handleUpdateRitual}
              onDelete={handleDeleteRitual}
              isSaving={isSaving}
              isDeleting={isDeleting}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-muted-foreground py-4">
            Nenhum ritual conhecido.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
