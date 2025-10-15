import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { PlusCircle } from 'lucide-react';
import { toast } from 'sonner';
import { createRitual } from '@/api/sheet/rituals/create-ritual';
import { deleteRitual } from '@/api/sheet/rituals/delete-ritual';
import { updateRitual } from '@/api/sheet/rituals/update-ritual';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Character } from '@/types/character/character';
import type { RitualRequestDTO } from '@/types/character/ritual';
import { RitualCard } from './ritual-card';
import { RitualFormDialog } from './ritual-form-dialog';

interface RitualsProps {
  character: Character;
}

export function Rituals({ character }: RitualsProps) {
  const { id: characterId, rituals, nex, presence } = character;
  const queryClient = useQueryClient();

  const level = Math.ceil(nex / 5);
  const ritualDT = 10 + level + presence;

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
      <CardHeader className="relative flex items-center border-b pb-2">
        <div className="flex md:mx-auto md:text-center flex-col">
          <CardTitle className="flex font-heading text-xl md:mx-auto">
            RITUAIS
          </CardTitle>
          <div className="text-sm text-muted-foreground">
            DT de Resistência:{' '}
            <span className="font-bold text-primary font-number">
              {ritualDT}
            </span>
          </div>
        </div>
        <RitualFormDialog onSave={handleCreateRitual} isSaving={isSaving}>
          <Button size="sm" variant="ghost" className="absolute right-0">
            <PlusCircle className="mr-2 h-4 w-4" />
            Adicionar
          </Button>
        </RitualFormDialog>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 p-0 max-h-[500px] overflow-y-auto md:px-4">
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
