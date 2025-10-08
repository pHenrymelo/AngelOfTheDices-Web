import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { AbilityResponseDTO } from '@/types/character/ability';

interface AbilityCardProps {
  ability: AbilityResponseDTO;
}

export function AbilityCard({ ability }: AbilityCardProps) {
  return (
    <Card className="flex-1 p-4">
      <CardHeader className="flex flex-col justify-center items-center border-b-2 py-1 font-heading text-center">
        <CardTitle className="text-primary text-xl">{ability.name}</CardTitle>
        <p className="text-sm text-muted-foreground">
          ({ability.type.displayName})
        </p>
      </CardHeader>
      <CardContent className="w-full flex my-auto pt-4">
        {ability.description}
      </CardContent>
    </Card>
  );
}
