import { SheetCard } from './sheet-card';

const mockSheets = [
  {
    id: '1',
    characterName: 'Leonard C. Lance',
    playerClass: '???',
    level: 5,
    imageUrl: 'https://placehold.co/400x200/27272a/FFF?text=Leon',
  },
  {
    id: '2',
    characterName: 'Cesar Cohen',
    playerClass: 'Combatente',
    level: 4,
    imageUrl: 'https://placehold.co/400x200/a1a1aa/FFF?text=Kaiser',
  },
  {
    id: '3',
    characterName: 'Arthur Cervero',
    playerClass: 'Especialista',
    level: 5,
    imageUrl: 'https://placehold.co/400x200/52525b/FFF?text=Arthur',
  },
  {
    id: '4',
    characterName: 'Joui Jouki',
    playerClass: 'Combatente',
    level: 4,
    imageUrl: 'https://placehold.co/400x200/71717a/FFF?text=Joui',
  },
];

export function Sheets() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold tracking-tight">Minhas Fichas</h1>
      <div
        className="w-11/12 mx-auto grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 
 xl:grid-cols-4"
      >
        {mockSheets.map((sheet) => (
          <SheetCard key={sheet.id} {...sheet} />
        ))}
      </div>
    </div>
  );
}
