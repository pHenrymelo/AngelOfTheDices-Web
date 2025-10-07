import { Link } from 'react-router';
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
  characterName: string;
  playerClass: string;
  level: number;
  imageUrl?: string;
}

export function SheetCard({
  id,
  characterName,
  playerClass,
  level,
  imageUrl,
}: SheetCardProps) {
  return (
    <Card>
      <img
        src={imageUrl ?? 'https://placehold.co/400x200/27272a/FFF?text=Ficha'}
        alt={characterName}
        className="h-40 w-full rounded-t-lg object-cover"
      />
      <CardHeader>
        <CardTitle>{characterName}</CardTitle>
        <CardDescription>
          {playerClass} - Nível {level}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button asChild className="w-full">
          <Link to={`/app/sheet/${id}`}>Abrir Ficha</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
