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
import type { NoteRequestDTO, NoteResponseDTO } from '@/types/character/note';
import { NoteFormDialog } from './note-form-dialog';

interface NoteProps {
  note: NoteResponseDTO;
  onUpdate: (noteId: string, dto: NoteRequestDTO) => void;
  onDelete: (noteId: string) => void;
  isSaving: boolean;
  isDeleting: boolean;
}

export function Note({
  note,
  isDeleting,
  isSaving,
  onDelete,
  onUpdate,
}: NoteProps) {
  return (
    <Card className="flex-1 py-4 px-2">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-primary text-xl font-heading">
          {note.title}
        </CardTitle>
        <div className="flex">
          <NoteFormDialog
            note={note}
            onSave={(dto) => onUpdate(note.id, dto)}
            isSaving={isSaving}
          >
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <PenBox className="h-4 w-4" />
            </Button>
          </NoteFormDialog>
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
      <CardContent className="w-full flex my-auto">
        {note.description}
      </CardContent>
    </Card>
  );
}
