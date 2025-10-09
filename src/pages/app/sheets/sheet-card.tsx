import { Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { id } from 'zod/v4/locales';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { CharacterSummary } from '@/types/character/character';

interface SheetCardProps {
  character: CharacterSummary;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

export function SheetCard({ character, onDelete, isDeleting }: SheetCardProps) {
  return (
    <AlertDialog>
      <Card className="mt-8 transition-all hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1">
        <img
          src={
            character.portraitUrl ||
            `https://ui-avatars.com/api/?name=${character.name.replace(/\s/g, '+')}&background=1c1917&color=a8a29e`
          }
          alt={character.name}
          className="w-40 h-40 mx-auto rounded-full object-cover -mt-16 border-4 border-background"
        />
        <CardHeader className="flex justify-between items-center">
          <div>
            <CardTitle>{character.name}</CardTitle>
            <CardDescription>
              {character.characterClass.displayName} - NEX {character.nex}%
            </CardDescription>
          </div>
          <AlertDialogTrigger asChild>
            <Button
              size={'icon'}
              variant={'ghost'}
              className="text-destructive"
            >
              <Trash2 className=" h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
        </CardHeader>
        <CardContent className='className="flex-1 flex flex-col justify-end gap-2"'>
          <Button asChild className="w-full">
            <Link to={`/sheets/${id}`}>Abrir Ficha</Link>
          </Button>
        </CardContent>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isso irá arquivar permanentemente
              a ficha de "{character.name}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <Button
              onClick={() => onDelete(character.id)}
              disabled={isDeleting}
            >
              {isDeleting ? 'Arquivando...' : 'Sim, arquivar ficha'}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </Card>
    </AlertDialog>
  );
}
