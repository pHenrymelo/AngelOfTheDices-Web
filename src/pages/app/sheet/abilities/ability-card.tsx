import { PenBox, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { AbilityResponseDTO } from '@/types/character/ability';

interface AbilityCardProps {
  ability: AbilityResponseDTO;
}

export function AbilityCard({ ability }: AbilityCardProps) {
  return (
    <Card className="flex-1 p-4">
      <CardHeader className="flex justify-between items-center border-b-2 py-1 font-heading text-center">
        <div className="">
          <CardTitle className="text-primary text-xl">{ability.name}</CardTitle>
          <p className="text-sm text-muted-foreground">
            ({ability.type.displayName})
          </p>
        </div>
        <div className="flex">
          <Button size="icon" variant="ghost">
            <PenBox className=" h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost">
            <Trash2 className=" text-destructive h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="w-full flex my-auto pt-4">
        {ability.description}
      </CardContent>
    </Card>
  );
}
