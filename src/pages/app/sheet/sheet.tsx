import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getSheetById } from '@/api/sheet/get-sheet-by-id';
import { Skeleton } from '@/components/ui/skeleton';
import { Abilities } from './abilities/abilities';
import { Attributes } from './attributes/attributes';
import { Combat } from './combat/combat';
import { Expertises } from './expertise/expertises';
import { FixedExpertise } from './expertise/fixed-expertise';
import { Inventory } from './inventory/inventory';
import { Notes } from './notes/notes';
import { PersonalDetails } from './personal-details';
import { Rituals } from './rituals/rituals';
import { SheetStatus } from './status/sheet-status';

export function Sheet() {
  const { id: characterId } = useParams<{ id: string }>();

  const {
    data: character,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['character', characterId],
    queryFn: () => getSheetById(characterId!),
    enabled: !!characterId,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Carregando Dossiê...
        </h1>
        <Skeleton className="mt-4 h-[80vh] w-full" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-destructive py-20">
        <h1 className="text-2xl font-bold">Ops... Falha Crítica.</h1>
        <p>
          Houve um erro ao carregar esta ficha. Verifique se ela existe ou tente
          novamente.
        </p>
      </div>
    );
  }

  return (
    <div className=" container mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="flex flex-col lg:flex-row gap-4">
        {character && <SheetStatus character={character} />}
        <PersonalDetails />
      </div>
      <div className="flex flex-col lg:flex-row gap-4">
        <Attributes />
        <FixedExpertise />
      </div>
      <Combat />
      <Inventory />
      <Expertises />
      <div className="flex flex-col lg:flex-row gap-4">
        <Abilities />
        <Rituals />
      </div>
      <Notes />
    </div>
  );
}
