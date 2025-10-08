import { PenBox, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { NoteResponseDTO } from '@/types/character/note';

interface NoteProps {
  note: NoteResponseDTO;
}

export function Note({ note }: NoteProps) {
  return (
    <Card className="flex-1 py-4 px-2">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-primary text-xl font-heading">
          {note.title}
        </CardTitle>
        <div className="flex">
          <Button size="icon" variant="ghost">
            <PenBox className=" h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost">
            <Trash2 className=" text-destructive h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="w-full flex my-auto">
        {note.description}
      </CardContent>
    </Card>
  );
}
