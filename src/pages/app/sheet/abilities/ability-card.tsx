import { PenBox, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type {
  AbilityRequestDTO,
  AbilityResponseDTO,
} from '@/types/character/ability';
import { AbilityFormDialog } from './ability-form-dialog';

interface AbilityCardProps {
  ability: AbilityResponseDTO;
  onUpdate: (abilityId: string, dto: AbilityRequestDTO) => void;
  onDelete: (abilityId: string) => void;
  isSaving: boolean;
  isDeleting: boolean;
}

export function AbilityCard({
  ability,
  isDeleting,
  isSaving,
  onDelete,
  onUpdate,
}: AbilityCardProps) {
  return (
    <Card className="flex-1 p-4">
      <CardHeader className="flex items-center border-b px-2 font-heading">
        <div className="flex-1 min-w-0">
          <CardTitle className="text-primary text-xl break-words">
            {ability.name}
          </CardTitle>
          <p className="text-sm text-muted-foreground font-semibold">
            ({ability.type.displayName})
          </p>
        </div>
        <div className="flex">
          <AbilityFormDialog
            ability={ability}
            onSave={(dto) => onUpdate(ability.id, dto)}
            isSaving={isSaving}
          >
            <Button variant="ghost" size="icon">
              <PenBox className="h-4 w-4" />
            </Button>
          </AbilityFormDialog>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                <AlertDialogDescription>
                  Tem certeza que deseja remover a habilidade "{ability.name}"?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => onDelete(ability.id)}
                  disabled={isDeleting}
                >
                  {isDeleting ? 'Removendo...' : 'Remover'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardHeader>
      <CardContent className="w-full flex my-auto text-muted-foreground text-sm">
        {ability.description}
      </CardContent>
    </Card>
  );
}
