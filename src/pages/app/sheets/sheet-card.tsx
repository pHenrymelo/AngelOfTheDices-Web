import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Link } from 'react-router';

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
    <Card className="mt-8">
      <img
        src={imageUrl ?? 'https://placehold.co/400x200/27272a/FFF?text=Ficha'}
        alt={characterName}
        className=" w-32 h-32 mx-auto rounded-full object-cover -mt-16"
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
