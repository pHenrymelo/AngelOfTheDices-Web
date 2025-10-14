import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { PlusCircle } from 'lucide-react';
import { toast } from 'sonner';
import { createNote } from '@/api/sheet/notes/create-note';
import { deleteNote } from '@/api/sheet/notes/delete-note';
import { toggleNotePin } from '@/api/sheet/notes/pin-note';
import { updateNote } from '@/api/sheet/notes/update-note';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { queryClient } from '@/lib/react-query';
import type { NoteRequestDTO, NoteResponseDTO } from '@/types/character/note';
import { Note } from './note';
import { NoteFormDialog } from './note-form-dialog';

interface NotesProps {
  characterId: string;
  notes: NoteResponseDTO[];
}

export function Notes({ characterId, notes }: NotesProps) {
  const { mutate: createNoteFn, isPending: isCreating } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      toast.success('Anotação criada com sucesso.');
      queryClient.invalidateQueries({ queryKey: ['character', characterId] });
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || 'Falha ao criar anotação.',
        );
      }
    },
  });

  const { mutate: updateNoteFn, isPending: isUpdating } = useMutation({
    mutationFn: updateNote,
    onSuccess: () => {
      toast.success('Anotação atualizada com sucesso.');
      queryClient.invalidateQueries({ queryKey: ['character', characterId] });
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || 'Falha ao atualizar anotação.',
        );
      }
    },
  });

  const { mutate: deleteNoteFn, isPending: isDeleting } = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      toast.success('Anotação removida.');
      queryClient.invalidateQueries({ queryKey: ['character', characterId] });
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || 'Falha ao remover anotação.',
        );
      }
    },
  });

  const { mutate: togglePinFn, isPending: isPinnig } = useMutation({
    mutationFn: toggleNotePin,
    onSuccess: () => {
      toast.success('Estado da anotação alterado.');
      queryClient.invalidateQueries({ queryKey: ['character', characterId] });
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error('Falha ao alterar o estado da anotação.');
      }
    },
  });

  function handleTogglePin(note: NoteResponseDTO) {
    togglePinFn({ characterId, noteId: note.id, isPinned: !note.isPinned });
  }

  function handleCreateNote(dto: NoteRequestDTO) {
    createNoteFn({ characterId, dto });
  }

  function handleUpdateNote(noteId: string, dto: NoteRequestDTO) {
    updateNoteFn({ characterId, noteId, dto });
  }

  function handleDeleteNote(noteId: string) {
    deleteNoteFn({ characterId, noteId });
  }

  const isSaving = isCreating || isUpdating;

  return (
    <Card className="flex-1 px-4">
      <div className="relative flex justify-center items-center border-b pb-2">
        <CardTitle className="font-heading text-xl">Anotações</CardTitle>
        <NoteFormDialog onSave={handleCreateNote} isSaving={isCreating}>
          <Button size="sm" variant="ghost" className="absolute right-0">
            <PlusCircle className="mr-2 h-4 w-4" />
            Adicionar
          </Button>
        </NoteFormDialog>
      </div>
      <CardContent className="flex flex-col gap-4 max-h-[400px] overflow-y-auto p-0 md:px-4">
        {notes && notes.length > 0 ? (
          notes.map((note) => (
            <Note
              key={note.id}
              note={note}
              onUpdate={handleUpdateNote}
              onDelete={handleDeleteNote}
              onTogglePin={handleTogglePin}
              isSaving={isSaving}
              isDeleting={isDeleting || isPinnig}
            />
          ))
        ) : (
          <p className="flex text-center text-muted-foreground py-4">
            Nenhuma anotação registrada.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
