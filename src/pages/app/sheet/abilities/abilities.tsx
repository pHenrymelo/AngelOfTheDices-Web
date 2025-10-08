import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import type { AbilityResponseDTO } from '@/types/character/ability';
import { AbilityCard } from './ability-card';

interface AbilitiesProps {
  characterId: string;
  abilities: AbilityResponseDTO[];
}

export function Abilities({ characterId, abilities }: AbilitiesProps) {
  function handleCreateNewAbility() {
    console.log('Criar nova habilidade para o personagem:', characterId);
  }

  return (
    <Card className="flex-1 p-4">
      <div className="relative flex justify-center items-center border-b-2 pb-2 mb-4">
        <CardTitle className="font-heading text-xl">
          Habilidades e Poderes
        </CardTitle>
        <Button
          onClick={handleCreateNewAbility}
          size="sm"
          variant="ghost"
          className="absolute right-0"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Adicionar
        </Button>
      </div>
      <CardContent className="grid grid-cols-1 gap-4 px-8 max-h-[600px] overflow-y-auto">
        {abilities && abilities.length > 0 ? (
          abilities.map((ability) => (
            <AbilityCard key={ability.id} ability={ability} />
          ))
        ) : (
          <p className="col-span-full text-center text-muted-foreground py-4">
            Nenhuma habilidade ou poder registrado.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
