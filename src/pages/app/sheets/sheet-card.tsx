import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface SheetCardProps {
  id: string;
  name: string;
  characterClass: { displayName: string };
  nex: number;
  portraitUrl?: string | null;
}

export function SheetCard({
  id,
  name,
  characterClass,
  nex,
  portraitUrl,
}: SheetCardProps) {
  return (
    <Card className="mt-8 transition-all hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1">
      <img
        src={
          portraitUrl ||
          `https://ui-avatars.com/api/?name=${name.replace(/\s/g, '+')}&background=1c1917&color=a8a29e`
        }
        alt={name}
        className="w-40 h-40 mx-auto rounded-full object-cover -mt-16 border-4 border-background"
      />
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>
          {characterClass.displayName} - NEX {nex}%
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button asChild className="w-full">
          <Link to={`/sheets/${id}`}>Abrir Ficha</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
