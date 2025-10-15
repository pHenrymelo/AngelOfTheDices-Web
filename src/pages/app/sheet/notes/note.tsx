import { PenBox, Pin, Trash2 } from 'lucide-react';
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
import type { NoteRequestDTO, NoteResponseDTO } from '@/types/character/note';
import { NoteFormDialog } from './note-form-dialog';

interface NoteProps {
  note: NoteResponseDTO;
  onUpdate: (noteId: string, dto: NoteRequestDTO) => void;
  onDelete: (noteId: string) => void;
  onTogglePin: (note: NoteResponseDTO) => void;
  isSaving: boolean;
  isDeleting: boolean;
}

export function Note({
  note,
  isDeleting,
  isSaving,
  onDelete,
  onUpdate,
  onTogglePin,
}: NoteProps) {
  return (
    <Card
      className={cn(
        'flex flex-col bg-zinc-900/50 min-h-[150px] transition-colors p-4',
        note.isPinned && 'border-primary/50 ',
      )}
    >
      <CardHeader className="flex flex-row justify-between items-start gap-2 p-0 border-b">
        <div className="flex-1 min-w-0">
          <CardTitle className="text-primary text-xl font-heading break-words">
            {note.title}
          </CardTitle>
        </div>
        <div className="flex flex-shrink-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onTogglePin(note)}
            disabled={isDeleting}
          >
            {note.isPinned ? (
              <Pin className="h-4 w-4 text-primary fill-primary" />
            ) : (
              <Pin className="h-4 w-4" />
            )}
          </Button>
          <NoteFormDialog
            note={note}
            onSave={(dto) => onUpdate(note.id, dto)}
            isSaving={isSaving}
          >
            <Button variant="ghost" size="icon">
              <PenBox className="h-4 w-4" />
            </Button>
          </NoteFormDialog>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className=" text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                <AlertDialogDescription>
                  Tem certeza que deseja apagar a anotação "{note.title}"? Esta
                  ação não pode ser desfeita.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => onDelete(note.id)}
                  disabled={isDeleting}
                >
                  {isDeleting ? 'Apagando...' : 'Apagar'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardHeader>
      <CardContent className="my-auto break-words px-0 min-h-0 overflow-y-auto text-muted-foreground text-sm">
        {note.description}
      </CardContent>
    </Card>
  );
}
