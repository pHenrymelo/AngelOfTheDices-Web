import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { AbilityCard } from './ability-card';

export function Abilities() {
  return (
    <Card className="flex-1 p-4">
      <CardTitle className="flex justify-center items-center text-xl border-b-2 py-1 font-heading">
        Habilidades e Poderes
      </CardTitle>
      <CardContent className="w-full flex justify-evenly my-auto">
        <AbilityCard />
      </CardContent>
    </Card>
  );
}
