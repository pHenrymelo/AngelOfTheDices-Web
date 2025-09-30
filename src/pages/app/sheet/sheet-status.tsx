import { useState } from 'react';
import { toast } from 'sonner';
import d20 from '@/assets/dice-grey.png';
import Leon from '@/assets/leon.png';
import { Button } from '@/components/ui/button';
import { StatusBar } from './status-bar';

export function SheetStatus() {
  const [maxHealthPoints, _setMaxHealthPoints] = useState(100);
  const [currentHealthPoints, setCurrentHealthPoints] =
    useState(maxHealthPoints);

  const [maxSanityPoints, _setMaxSanityPoints] = useState(100);
  const [currentSanityPoints, setCurrentSanityPoints] =
    useState(maxSanityPoints);

  const [maxEfortPoints, _setMaxEfortPoints] = useState(100);
  const [currentEfortPoints, setCurrentEfortPoints] = useState(maxEfortPoints);

  const NEX = 99;
  const PEPerRound = Math.ceil(NEX / 5);
  const moviment = 9;
  const def = 10;

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
            NEX <span className="font-bold text-3xl text-primary">{NEX}%</span>
          </div>
          <div className=" text-2xl font-medium flex flex-col justify-center items-center border-b-2 gap-2 py-1">
            PE/rodada{' '}
            <span className="font-bold text-3xl text-emerald-900">
              {PEPerRound}
            </span>
          </div>
        </div>
      </div>
      <div className=" flex flex-col space-y-4">
        <StatusBar
          label="Vida"
          variant={'hp'}
          current={currentHealthPoints}
          max={maxHealthPoints}
          onCurrentChange={setCurrentHealthPoints}
        />
        <StatusBar
          label="Sanidade"
          variant={'san'}
          current={currentSanityPoints}
          max={maxSanityPoints}
          onCurrentChange={setCurrentSanityPoints}
        />
        <StatusBar
          label="Pontos de Esforço"
          variant={'ep'}
          current={currentEfortPoints}
          max={maxEfortPoints}
          onCurrentChange={setCurrentEfortPoints}
        />

        <div className="w-full flex justify-around items-center">
          <div className=" text-2xl font-medium flex flex-col justify-center items-center border-b-2 gap-2 py-1">
            Deslocamento{' '}
            <span className="font-bold text-3xl text-muted-foreground">
              {moviment} m
            </span>
          </div>
          <div className=" text-2xl font-medium flex flex-col justify-center items-center border-b-2 gap-2 py-1">
            Defesa{' '}
            <span className="font-bold text-3xl text-muted-foreground">
              {def}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
