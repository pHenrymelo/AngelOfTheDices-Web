import { ClipboardPenLine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SheetCard } from './sheet-card';

const mockSheets = [
  {
    id: '1',
    characterName: 'Leonard C. Lance',
    playerClass: '???',
    level: 5,
    imageUrl: 'https://placehold.co/400x200/27272a/FFF?text=?',
  },
  {
    id: '2',
    characterName: 'Cesar Cohen',
    playerClass: 'Combatente',
    level: 4,
    imageUrl: 'https://placehold.co/400x200/a1a1aa/FFF?text=?',
  },
  {
    id: '3',
    characterName: 'Arthur Cervero',
    playerClass: 'Especialista',
    level: 5,
    imageUrl: 'https://placehold.co/400x200/52525b/FFF?text=?',
  },
  {
    id: '4',
    characterName: 'Joui Jouki',
    playerClass: 'Combatente',
    level: 4,
    imageUrl: 'https://placehold.co/400x200/71717a/FFF?text=?',
  },
];

export function Sheets() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold tracking-tight">Minhas Fichas</h1>
      <div
        className="w-11/12 mt-12 mx-auto grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 
 xl:grid-cols-4"
      >
        {mockSheets.map((sheet) => (
          <SheetCard key={sheet.id} {...sheet} />
        ))}
      </div>
      <div className="flex grid-cols-4 mx-auto mt-8">
        <Button className="flex-1 w-full h-14 text-xl font-bold font-heading cursor-pointer justify-center items-center ">
          <ClipboardPenLine className="size-8" />
          <span>Criar uma nova ficha</span>
        </Button>
      </div>
    </div>
  );
}
