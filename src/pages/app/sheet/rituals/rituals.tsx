import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import type { RitualResponseDTO } from '@/types/character/ritual';
import { RitualCard } from './ritual-card';

interface RitualsProps {
  characterId: string;
  rituals: RitualResponseDTO[];
}

export function Rituals({ characterId, rituals }: RitualsProps) {
  function handleCreateNewRitual() {
    console.log('Criar novo ritual para o personagem:', characterId);
  }

  return (
    <Card className="flex-1 p-4">
      <div className="relative flex justify-center items-center border-b-2 pb-1 mb-4">
        <CardTitle className="font-heading text-xl">Rituais</CardTitle>
        <Button
          onClick={handleCreateNewRitual}
          size="sm"
          variant="ghost"
          className="absolute right-0"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Adicionar
        </Button>
      </div>
      <CardContent className="grid grid-cols-1 gap-4 px-8 max-h-[600px] overflow-y-auto pr-2">
        {rituals && rituals.length > 0 ? (
          rituals.map((ritual) => (
            <RitualCard key={ritual.id} ritual={ritual} />
          ))
        ) : (
          <p className="col-span-full text-center text-muted-foreground py-4">
            Nenhum ritual conhecido.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
