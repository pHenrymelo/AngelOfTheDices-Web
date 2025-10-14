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
import { cn } from '@/lib/utils';
import type {
  RitualRequestDTO,
  RitualResponseDTO,
} from '@/types/character/ritual';
import { RitualFormDialog } from './ritual-form-dialog';

interface RitualCardProps {
  ritual: RitualResponseDTO;
  onUpdate: (ritualId: string, dto: RitualRequestDTO) => void;
  onDelete: (ritualId: string) => void;
  isSaving: boolean;
  isDeleting: boolean;
}

const circleMap: Record<string, number> = {
  FIRST: 1,
  SECOND: 2,
  THIRD: 3,
  FOURTH: 4,
};

const elementColorMap: Record<string, string> = {
  BLOOD: 'text-red-500',
  DEATH: 'text-zinc-950',
  ENERGY: 'text-purple-800',
  KNOWLEDGE: 'text-yellow-400',
  FEAR: 'text-blue-500',
};

export function RitualCard({
  ritual,
  isDeleting,
  isSaving,
  onDelete,
  onUpdate,
}: RitualCardProps) {
  const currentCircle = circleMap[ritual.circle.name];
  const elementColorClass =
    elementColorMap[ritual.element.name] || 'text-muted-foreground';
  return (
    <Card className="flex-1 p-4">
      <CardHeader className="flex justify-between items-center p-2 border-b border-border">
        <div className="flex flex-col justify-start">
          <CardTitle className="text-primary text-xl font-heading">
            {ritual.name}
          </CardTitle>
          <span className={cn('font-semibold text-lg', elementColorClass)}>
            [ {ritual.element.displayName} ]
          </span>
        </div>
        <div className="flex">
          <RitualFormDialog
            ritual={ritual}
            onSave={(dto) => onUpdate(ritual.id, dto)}
            isSaving={isSaving}
          >
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <PenBox className="h-4 w-4" />
            </Button>
          </RitualFormDialog>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirmar Esquecimento</AlertDialogTitle>
                <AlertDialogDescription>
                  Tem certeza que deseja esquecer o ritual "{ritual.name}"?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => onDelete(ritual.id)}
                  disabled={isDeleting}
                >
                  {isDeleting ? 'Esquecendo...' : 'Esquecer'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardHeader>
      <CardContent className="p-2 space-y-4">
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold font-heading">CÍRCULO</span>
          {[1, 2, 3, 4].map((circle) => (
            <div key={circle} className="flex items-center gap-1">
              <div
                className={cn('h-4 w-4 border-2 border-zinc-500', {
                  'bg-primary border-primary-foreground':
                    currentCircle === circle,
                })}
              />
              <span>{circle}º</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          <div>
            <span className="text-xs text-muted-foreground font-heading">
              EXECUÇÃO
            </span>
            <p className="font-semibold">{ritual.execution.displayName}</p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground font-heading">
              ALCANCE
            </span>
            <p className="font-semibold">{ritual.range.displayName}</p>
          </div>
          <div className="col-span-2">
            <span className="text-xs text-muted-foreground font-heading">
              ALVO
            </span>
            <p className="font-semibold">
              {ritual.target ? ritual.target : '—'}
            </p>
          </div>
          <div className="col-span-2">
            <span className="text-xs text-muted-foreground font-heading">
              DURAÇÃO
            </span>
            <p className="font-semibold">
              {ritual.duration ? ritual.duration : '—'}
            </p>
          </div>
          <div className="col-span-2">
            <span className="text-xs text-muted-foreground font-heading">
              RESISTÊNCIA
            </span>
            <p className="font-semibold">
              {ritual.resistance ? ritual.resistance : '—'}
            </p>
          </div>
        </div>
        <div className="pt-2 border-t border-zinc-800">
          <p className="text-sm text-muted-foreground">
            {ritual.description ? ritual.description : '—'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
