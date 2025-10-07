import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Note } from './note';

export function Notes() {
  return (
    <Card className="flex-1 p-4">
      <CardTitle className="flex justify-center items-center text-xl border-b-2 py-1 font-heading">
        Anotações
      </CardTitle>
      <CardContent className="w-full flex justify-evenly my-auto">
        <Note />
      </CardContent>
    </Card>
  );
}
