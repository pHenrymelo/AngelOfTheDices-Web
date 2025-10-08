import { LucideTrash2, PenBox } from 'lucide-react';
import { DiceD20Icon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import type { AttackResponseDTO } from '@/types/character/attack';

interface CombatTableRowProps {
  attack: AttackResponseDTO;
  onDelete: (attackId: string) => void;
  onEdit: (attack: AttackResponseDTO) => void;
  onRoll: (testString: string) => void;
}

export function CombatTableRow({
  attack,
  onDelete,
  onEdit,
  onRoll,
}: CombatTableRowProps) {
  const testString = `${attack.testAttribute} + ${attack.testExpertise?.displayName || 'N/A'}${attack.testBonus > 0 ? ` +${attack.testBonus}` : ''}`;
  const damageString = `${attack.damageDiceQuantity}${attack.damageDiceType.toLowerCase()}${attack.damageBonus > 0 ? `+${attack.damageBonus}` : ''}`;
  const criticalString = `${attack.criticalThreshold}/x${attack.criticalMultiplier}`;

  return (
    <TableRow>
      <TableCell className="justify-center space-x-1">
        <Button
          variant={'outline'}
          size={'icon'}
          onClick={() => onDelete(attack.id)}
        >
          <LucideTrash2 className="size-5 text-destructive" />
        </Button>
        <Button
          variant={'outline'}
          size={'icon'}
          onClick={() => onEdit(attack)}
        >
          <PenBox className="size-5" />
        </Button>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium text-center">
        {attack.name}
      </TableCell>
      <TableCell className="font-medium text-center">
        {attack.type.displayName}
      </TableCell>
      <TableCell className="font-medium text-center">
        <Button
          variant={'ghost'}
          className="p-2 group"
          onClick={() => onRoll(testString)}
        >
          <DiceD20Icon className="group-hover:animate-spin" />
          <span>{testString}</span>
        </Button>
      </TableCell>
      <TableCell className="font-medium text-center">{damageString}</TableCell>
      <TableCell className="font-medium text-center">
        {criticalString}
      </TableCell>
      <TableCell className="font-medium text-center">
        {attack.range.displayName}
      </TableCell>
      <TableCell className="font-medium text-center" colSpan={2}>
        {attack.special ?? '—'}
      </TableCell>
    </TableRow>
  );
}
