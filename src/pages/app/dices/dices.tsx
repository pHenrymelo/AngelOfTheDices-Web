import { Dice6 } from 'lucide-react';
import { Card } from '@/components/ui/card';

export function Dices() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold tracking-tight">Roll the dice</h1>
      <div className=" grid grid-cols-3 gap-8 w-3/4 mx-auto my-12">
        <Card className="w-1/2 flex justify-center items-center mx-auto">
          <h2 className="text-2xl font-bold">Moeda</h2>
          <Dice6 className="size-8" />
        </Card>
        <Card className="w-1/2 flex justify-center items-center mx-auto">
          <h2 className="text-2xl font-bold">D3</h2>
          <Dice6 className="size-8" />
        </Card>
        <Card className="w-1/2 flex justify-center items-center mx-auto">
          <h2 className="text-2xl font-bold">D4</h2>
          <Dice6 className="size-8" />
        </Card>
        <Card className="w-1/2 flex justify-center items-center mx-auto">
          <h2 className="text-2xl font-bold">D6</h2>
          <Dice6 className="size-8" />
        </Card>
        <Card className="w-1/2 flex justify-center items-center mx-auto">
          <h2 className="text-2xl font-bold">D8</h2>
          <Dice6 className="size-8" />
        </Card>
        <Card className="w-1/2 flex justify-center items-center mx-auto">
          <h2 className="text-2xl font-bold">D10</h2>
          <Dice6 className="size-8" />
        </Card>
        <Card className="w-1/2 flex justify-center items-center mx-auto">
          <h2 className="text-2xl font-bold">D12</h2>
          <Dice6 className="size-8" />
        </Card>
        <Card className="w-1/2 flex justify-center items-center mx-auto">
          <h2 className="text-2xl font-bold">D20</h2>
          <Dice6 className="size-8" />
        </Card>
        <Card className="w-1/2 flex justify-center items-center mx-auto">
          <h2 className="text-2xl font-bold">D100</h2>
          <Dice6 className="size-8" />
        </Card>
      </div>
    </div>
  );
}
