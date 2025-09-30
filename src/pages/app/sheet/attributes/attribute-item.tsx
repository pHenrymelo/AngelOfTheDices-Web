import { DiceD20Icon } from '@/components/icons';
import { Button } from '@/components/ui/button';

interface AttributeItemProps {
  name: string;
  value: number;
  onRoll: (attributeName: string, attributeValue: number) => void;
}

export function AttributeItem({ name, value, onRoll }: AttributeItemProps) {
  return (
    <div className="flex flex-col justify-center items-center">
      <Button
        onClick={() => onRoll(name, value)}
        variant={'ghost'}
        className=" w-16 h-16 group flex-col"
      >
        <DiceD20Icon className="group-hover:animate-spin size-8" />
      </Button>
      <span className="font-semibold">{name}</span>
      <span className="text-primary font-bold text-xl">{value}</span>
    </div>
  );
}
