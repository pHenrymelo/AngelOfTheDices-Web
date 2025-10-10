import { useMutation, useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { ClipboardPenLine } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { deleteCharacter } from '@/api/sheet/delete-sheet';
import { getSheets } from '@/api/sheet/get-sheets';
import { ThemeSyncToggle } from '@/components/theme-sinc-togle';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { queryClient } from '@/lib/react-query';
import type { CharacterSummary } from '@/types/character/character';
import { SheetCard } from './sheet-card';

export function Sheets() {
  const {
    data: sheets,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['sheets'],
    queryFn: getSheets,
    retry: false,
  });

  const { mutate: deleteSheetFn, isPending: isDeleting } = useMutation({
    mutationFn: deleteCharacter,
    onSuccess: () => {
      toast.success('Ficha de agente arquivada.');
      queryClient.invalidateQueries({ queryKey: ['sheets'] });
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || 'Falha ao arquivar ficha.',
        );
      }
    },
  });

  if (isError) {
    return (
      <div className="text-center text-destructive py-10">
        Houve um erro ao buscar suas fichas.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Minhas Fichas</h1>
        <ThemeSyncToggle />
      </div>

      <div className="w-11/12 mt-12 mx-auto grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div
                key={`skeleton${i}`}
                className="flex flex-col items-center space-y-2 mt-8"
              >
                <Skeleton className="h-40 w-40 rounded-full -mb-16" />
                <Card className="w-full pt-24">
                  <CardHeader className="items-center">
                    <Skeleton className="h-6 w-3-4" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-10 w-full" />
                  </CardContent>
                </Card>
              </div>
            ))
          : sheets?.map((character: CharacterSummary) => (
              <SheetCard
                key={character.id}
                character={character}
                isDeleting={isDeleting}
                onDelete={deleteSheetFn}
              />
            ))}
      </div>

      <div className="flex grid-cols-4 mx-auto mt-8">
        <Button asChild className="flex-1 w-full h-14 text-xl font-bold ...">
          <Link to="/sheets/new">
            <ClipboardPenLine className="size-8 mr-2" />
            <span>Criar uma nova ficha</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
