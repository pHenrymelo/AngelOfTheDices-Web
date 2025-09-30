import { toast } from 'sonner';
import d20 from '@/assets/dice-grey.png';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PersonalDetails } from './personal-details';
import { SheetStatus } from './sheet-status';

export function Sheet() {
  function handleRollDice(faces: number) {
    const result = Math.floor(Math.random() * faces) + 1;
    toast(
      <div className="">
        Rolou um <span className="font-bold">D{faces}</span> e tirou:{' '}
        <span className="font-bold text-primary">{result}</span>
      </div>,
    );
  }

  return (
    <div className=" container mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="flex flex-col lg:flex-row gap-4">
        <SheetStatus />
        <PersonalDetails />
      </div>
      <div className="flex gap-4">
        <Card className="flex-1 p-4">
          <h2 className="flex justify-center items-center text-xl border-b-2 py-1">
            Atributos
          </h2>
          <div>
            <Button
              onClick={() => handleRollDice(20)}
              variant={'ghost'}
              className=" w-16 h-16 group flex-col"
            >
              <span>Força</span>
              <img
                src={d20}
                alt="20 faces rpg dice"
                className="group-hover:animate-spin"
              />
            </Button>
          </div>
        </Card>
        <Card className="flex-1 p-4">
          <div className="flex flex-col justify-center items-center border-b-2 py-1">
            <h2 className="text-xl">Pericias</h2>
            <p className="text-sm text-muted-foreground">Acesso rápido</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <span className="text-muted-foreground text-sm">
              Não há pericias de acesso rápido
            </span>
          </div>
        </Card>
      </div>
    </div>
  );
}
