import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { RitualCard } from './ritual-card';

export function Rituals() {
  return (
    <Card className="flex-1 p-4">
      <CardTitle className="flex justify-center items-center text-xl border-b-2 pb-2 font-heading">
        Rituais
      </CardTitle>
      <CardContent className="w-full flex justify-evenly my-auto">
        <RitualCard />
      </CardContent>
    </Card>
  );
}
