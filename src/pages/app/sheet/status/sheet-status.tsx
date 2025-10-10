import { toast } from 'sonner';
import { DiceD20Icon } from '@/components/icons';
import { RollToastBase } from '@/components/toasts/roll-toast-base';
import { Button } from '@/components/ui/button';
import type { Character } from '@/types/character/character';
import type { CharacterStatusUpdateDTO } from '@/types/character/dtos/characterStatusUpdateDTO';
import { StatusBar } from './status-bar';

interface SheetStatusProps {
  character: Character;
  onStatusUpdate: (dto: CharacterStatusUpdateDTO) => void;
}

export function SheetStatus({ character, onStatusUpdate }: SheetStatusProps) {
  function handleRollDice(faces: number) {
    const result = Math.floor(Math.random() * faces) + 1;

    toast(<RollToastBase faces={faces} result={result} />);
  }

  const handleHpChange = (newHp: number) => {
    onStatusUpdate({ currentHitPoints: newHp });
  };
  const handleEpChange = (newEp: number) => {
    onStatusUpdate({ currentEffortPoints: newEp });
  };
  const handleSanChange = (newSan: number) => {
    onStatusUpdate({ currentSanity: newSan });
  };

  return (
    <div className="w-full lg:w-1/2 flex flex-col p-4 space-y-4">
      <div className="w-full flex flex-col xl:flex-row gap-4 justify-around items-center">
        <div className=" w-full xl:w-1/2 flex justify-around items-center">
          <img
            src={
              character.portraitUrl ||
              `https://ui-avatars.com/api/?name=${character.name.replace(/\s/g, '+')}&background=1c1917&color=a8a29e`
            }
            alt={`Retrato de ${character.name}`}
            className="rounded-full w-32 h-32 lg:w-42 lg:h-42 object-cover"
          />
          <Button
            onClick={() => handleRollDice(20)}
            variant={'ghost'}
            className=" w-32 h-32 group"
          >
            <DiceD20Icon className="group-hover:animate-spin size-20" />
          </Button>
        </div>
        <div className="w-full xl:w-1/2 flex justify-around items-center">
          <div className=" text-2xl flex flex-col justify-center items-center border-b-2 gap-2 py-1 font-heading font-semibold">
            NEX{' '}
            <span className="font-bold text-3xl text-primary font-number">
              {character.nex}%
            </span>
          </div>
          <div className=" text-2xl flex flex-col justify-center items-center border-b-2 gap-2 py-1 font-heading font-semibold">
            PE/rodada{' '}
            <span className="font-bold text-3xl text-emerald-900 font-number">
              {character.pePerRound}
            </span>
          </div>
        </div>
      </div>
      <div className=" flex flex-col space-y-8 my-auto">
        <StatusBar
          label="Vida"
          variant={'hp'}
          current={character.currentHitPoints}
          max={character.maxHitPoints}
          onCurrentChange={handleHpChange}
        />
        <StatusBar
          label="Sanidade"
          variant={'san'}
          current={character.currentSanity}
          max={character.maxSanity}
          onCurrentChange={handleSanChange}
        />
        <StatusBar
          label="Pontos de Esforço"
          variant={'ep'}
          current={character.currentEffortPoints}
          max={character.maxEffortPoints}
          onCurrentChange={handleEpChange}
        />
      </div>
    </div>
  );
}
