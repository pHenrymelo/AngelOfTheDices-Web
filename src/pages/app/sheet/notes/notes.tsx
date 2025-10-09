import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import type { NoteResponseDTO } from '@/types/character/note';
import { Note } from './note';

interface NotesProps {
  characterId: string;
  notes: NoteResponseDTO[];
}

export function Notes({ characterId, notes }: NotesProps) {
  function handleCreateNewNote() {
    console.log('Criar nova anotação para o personagem:', characterId);
  }

  return (
    <Card className="flex-1 p-4">
      <div className="relative flex justify-center items-center border-b-2 pb-1 mb-4">
        <CardTitle className="font-heading text-xl">Anotações</CardTitle>
        <Button
          onClick={handleCreateNewNote}
          size="sm"
          variant="ghost"
          className="absolute right-0"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Adicionar Anotação
        </Button>
      </div>
      <CardContent className="grid grid-cols-1 gap-4">
        {notes && notes.length > 0 ? (
          notes.map((note) => <Note key={note.id} note={note} />)
        ) : (
          <p className="col-span-full text-center text-muted-foreground py-4">
            Nenhuma anotação registrada.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
