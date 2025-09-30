import { toast } from 'sonner';
import { DiceD20Icon } from '@/components/icons';

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
      <div className="flex gap-4flex flex-col lg:flex-row gap-4">
        <Card className="flex-1 p-4">
          <h2 className="flex justify-center items-center text-xl border-b-2 py-1">
            Atributos
          </h2>
          <div className="grid grid-cols-5">
            <div className="flex flex-col justify-center items-center">
              <span className="font-semibold">Força</span>
              <Button
                onClick={() => handleRollDice(20)}
                variant={'ghost'}
                className=" w-16 h-16 group flex-col"
              >
                <DiceD20Icon className="group-hover:animate-spin size-8" />
              </Button>
            </div>
            <div className="flex flex-col justify-center items-center">
              <span className="font-semibold">Destreza</span>
              <Button
                onClick={() => handleRollDice(20)}
                variant={'ghost'}
                className=" w-16 h-16 group flex-col"
              >
                <DiceD20Icon className="group-hover:animate-spin size-8" />
              </Button>
            </div>
            <div className="flex flex-col justify-center items-center">
              <span className="font-semibold">Constituição</span>
              <Button
                onClick={() => handleRollDice(20)}
                variant={'ghost'}
                className=" w-16 h-16 group flex-col"
              >
                <DiceD20Icon className="group-hover:animate-spin size-8" />
              </Button>
            </div>
            <div className="flex flex-col justify-center items-center">
              <span className="font-semibold">Intelecto</span>
              <Button
                onClick={() => handleRollDice(20)}
                variant={'ghost'}
                className=" w-16 h-16 group flex-col"
              >
                <DiceD20Icon className="group-hover:animate-spin size-8" />
              </Button>
            </div>
            <div className="flex flex-col justify-center items-center">
              <span className="font-semibold">Presença</span>
              <Button
                onClick={() => handleRollDice(20)}
                variant={'ghost'}
                className=" w-16 h-16 group flex-col"
              >
                <DiceD20Icon className="group-hover:animate-spin size-8" />
              </Button>
            </div>
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
