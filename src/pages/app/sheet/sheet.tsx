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

  const NEX = 99;
  const PEPerRound = Math.ceil(NEX / 5);

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
    <div className=" container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-1/2 flex flex-col p-4 space-y-4">
          <div className="w-full flex flex-col xl:flex-row gap-4 justify-around items-center">
            <div className=" w-full xl:w-1/2 flex justify-around items-center">
              <img
                src={Leon}
                alt="Character"
                className="rounded-full w-32 h-32 lg:w-42 lg:h-42 object-cover"
              />
              <Button
                onClick={() => handleRollDice(20)}
                variant={'ghost'}
                className=" w-32 h-32 group"
              >
                <img
                  src={d20}
                  alt="20 faces rpg dice"
                  className="group-hover:animate-spin"
                />
              </Button>
            </div>
            <div className="w-full xl:w-1/2 flex justify-around items-center">
              <div className=" text-2xl font-medium flex flex-col justify-center items-center border-b-2 gap-2 py-1">
                NEX{' '}
                <span className="font-bold text-3xl text-primary">{NEX}%</span>
              </div>
              <div className=" text-2xl font-medium flex flex-col justify-center items-center border-b-2 gap-2 py-1">
                PE/rodada{' '}
                <span className="font-bold text-3xl text-emerald-900">
                  {PEPerRound}
                </span>
              </div>
            </div>
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
        <Card className="w-full lg:w-1/2 p-4"></Card>
      </div>
    </div>
  );
}
