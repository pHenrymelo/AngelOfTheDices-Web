import { toast } from 'sonner';
import d20 from '@/assets/dice-grey.png';
import Leon from '@/assets/leon.png';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { StatusBar } from './status-bar';

export function Sheet() {
  const maxHP = 50;
  const actualHP = 46;
  const maxSan = 25;
  const actualSan = 23;
  const maxPE = 20;
  const actualPE = 17;

  function handleRollDice(faces: number) {
    const result = Math.floor(Math.random() * faces) + 1;
    toast(
      <div className="">
        Rolou um <span className="font-bold">D{faces}</span> e tirou:{' '}
        <span className="font-bold text-violet-700">{result}</span>
      </div>,
    );
  }

  return (
    <div className="flex flex-col gap-4 w-[1280px] mx-auto">
      <div className="flex gap-4">
        <div className="w-1/2 flex flex-col p-4 space-y-4">
          <div className="w-full flex justify-around items-center">
            <img
              src={Leon}
              alt="Character"
              className="rounded-full w-42 h-42 object-cover"
            />
            <Button
              onClick={() => handleRollDice(20)}
              variant={'ghost'}
              className=" w-42 h-42 group"
            >
              <img
                src={d20}
                alt="20 faces rpg dice"
                className="group-hover:animate-spin"
              />
            </Button>
          </div>
          <div className="space-y-4">
            <StatusBar
              label="Vida"
              variant={'hp'}
              current={actualHP}
              max={maxHP}
            />
            <StatusBar
              label="Sanidade"
              variant={'san'}
              current={actualSan}
              max={maxSan}
            />
            <StatusBar
              label="Pontos de Esforço"
              variant={'ep'}
              current={actualPE}
              max={maxPE}
            />
          </div>
        </div>
        <Card className="w-1/2 p-4"></Card>
      </div>
    </div>
  );
}
