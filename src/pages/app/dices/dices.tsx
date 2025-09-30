import { CircleStarIcon } from 'lucide-react';
import { toast } from 'sonner';
import {
  DiceD4Icon,
  DiceD6Icon,
  DiceD8Icon,
  DiceD10Icon,
  DiceD12Icon,
  DiceD20Icon,
} from '@/components/icons';
import { Button } from '@/components/ui/button';

export function Dices() {
  function handleRollDice(faces: number) {
    const result = Math.floor(Math.random() * faces) + 1;
    toast(
      <div>
        Rolou um <span className="font-bold">D{faces}</span> e tirou:{' '}
        <span className="font-bold text-primary">{result}</span>
      </div>,
    );
  }

  function handleFlipCoin() {
    const result = Math.floor(Math.random() * 2) + 1;
    let coin: string;
    if (result === 1) {
      coin = 'Cara';
    } else {
      coin = 'Coroa';
    }
    toast(
      <div>
        E a moeda deu... <span className="text-primary font-bold">{coin}</span>
      </div>,
    );
  }

  return (
    <div className="flex flex-col gap-4 h-full">
      <h1 className="text-3xl font-bold tracking-tight">Roll the dice</h1>
      <div className="grid grid-cols-3 gap-8 w-3/4 mx-auto my-12 space-y-8">
        <div className="w-full flex flex-col justify-center items-center mx-auto">
          <h2 className="text-2xl font-bold">Moeda</h2>
          <Button
            className="p-4 w-24 h-24 group"
            onClick={() => handleFlipCoin()}
            variant={'ghost'}
          >
            <CircleStarIcon className="size-12 group-hover:animate-spin" />
          </Button>
        </div>
        <div className="w-full flex flex-col justify-center items-center mx-auto">
          <h2 className="text-2xl font-bold">D3</h2>
          <Button
            className="p-4 w-24 h-24 group"
            onClick={() => handleRollDice(3)}
            variant={'ghost'}
          >
            <DiceD4Icon className="size-12 group-hover:animate-spin" />
          </Button>
        </div>
        <div className="w-full flex flex-col justify-center items-center mx-auto">
          <h2 className="text-2xl font-bold">D4</h2>
          <Button
            className="p-4 w-24 h-24 group"
            onClick={() => handleRollDice(4)}
            variant={'ghost'}
          >
            <DiceD4Icon className="size-12 group-hover:animate-spin" />
          </Button>
        </div>
        <div className="w-full flex flex-col justify-center items-center mx-auto">
          <h2 className="text-2xl font-bold">D6</h2>
          <Button
            className="p-4 w-24 h-24 group"
            onClick={() => handleRollDice(6)}
            variant={'ghost'}
          >
            <DiceD6Icon className="size-12 group-hover:animate-spin" />
          </Button>
        </div>
        <div className="w-full flex flex-col justify-center items-center mx-auto">
          <h2 className="text-2xl font-bold">D8</h2>
          <Button
            className="p-4 w-24 h-24 group"
            onClick={() => handleRollDice(8)}
            variant={'ghost'}
          >
            <DiceD8Icon className="size-12 group-hover:animate-spin" />
          </Button>
        </div>
        <div className="w-full flex flex-col justify-center items-center mx-auto">
          <h2 className="text-2xl font-bold">D10</h2>
          <Button
            className="p-4 w-24 h-24 group"
            onClick={() => handleRollDice(10)}
            variant={'ghost'}
          >
            <DiceD10Icon className="size-12 group-hover:animate-spin" />
          </Button>
        </div>
        <div className="w-full flex flex-col justify-center items-center mx-auto">
          <h2 className="text-2xl font-bold">D12</h2>
          <Button
            className="p-4 w-24 h-24 group"
            onClick={() => handleRollDice(12)}
            variant={'ghost'}
          >
            <DiceD12Icon className="size-12 group-hover:animate-spin" />
          </Button>
        </div>
        <div className="w-full flex flex-col justify-center items-center mx-auto">
          <h2 className="text-2xl font-bold">D20</h2>
          <Button
            className="p-4 w-24 h-24 group"
            onClick={() => handleRollDice(20)}
            variant={'ghost'}
          >
            <DiceD20Icon className="size-12 group-hover:animate-spin" />
          </Button>
        </div>
        <div className="w-full flex flex-col justify-center items-center mx-auto">
          <h2 className="text-2xl font-bold">D100</h2>
          <Button
            className="p-4 w-24 h-24 group"
            onClick={() => handleRollDice(100)}
            variant={'ghost'}
          >
            <DiceD10Icon className="size-12 group-hover:animate-spin" />
          </Button>
        </div>
      </div>
    </div>
  );
}
