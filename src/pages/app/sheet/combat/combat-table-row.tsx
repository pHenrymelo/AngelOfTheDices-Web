import { Dices, LucideTrash2, PenBox } from 'lucide-react';
import { DiceD20Icon } from '@/components/icons';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TableCell, TableRow } from '@/components/ui/table';
import type {
  AttackRequestDTO,
  AttackResponseDTO,
} from '@/types/character/attack';
import { AttackFormDialog } from './attack-form-dialog';

interface CombatTableRowProps {
  attack: AttackResponseDTO;
  onDelete: (attackId: string) => void;
  onUpdate: (attackId: string, dto: AttackRequestDTO) => void;
  onRollTest: (attack: AttackResponseDTO) => void;
  onRollDamage: (attack: AttackResponseDTO, isCritical: boolean) => void;
  isSaving: boolean;
  isDeleting: boolean;
}

export function CombatTableRow({
  attack,
  onDelete,
  onUpdate,
  onRollTest,
  onRollDamage,
  isSaving,
  isDeleting,
}: CombatTableRowProps) {
  const testString = `${attack.testAttribute} + ${attack.testExpertise?.displayName || 'N/A'}${attack.testBonus > 0 ? ` +${attack.testBonus}` : ''}`;
  const damageString = `${attack.damageDiceQuantity}${attack.damageDiceType.toLowerCase()}${attack.damageBonus > 0 ? `+${attack.damageBonus}` : ''}`;
  const criticalString = `${attack.criticalThreshold}/x${attack.criticalMultiplier}`;

  return (
    <TableRow>
      <TableCell className="justify-center space-x-1">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant={'outline'} size={'icon'} disabled={isDeleting}>
              <LucideTrash2 className="size-5 text-destructive" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
              <AlertDialogDescription>
                Tem certeza que deseja remover o ataque "{attack.name}"?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => onDelete(attack.id)}
                disabled={isDeleting}
              >
                {isDeleting ? 'Removendo...' : 'Remover'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <AttackFormDialog
          attack={attack}
          onSave={(dto) => onUpdate(attack.id, dto)}
          isSaving={isSaving}
        >
          <Button variant={'outline'} size={'icon'} disabled={isSaving}>
            <PenBox className="size-5" />
          </Button>
        </AttackFormDialog>
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
          onClick={() => onRollTest(attack)}
        >
          <DiceD20Icon className="group-hover:animate-spin" />
          <span>{testString}</span>
        </Button>
      </TableCell>
      <TableCell className="font-medium text-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={'ghost'} className="p-2 group">
              <Dices className="group-hover:animate-spin size-5" />
              <span>{damageString}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => onRollDamage(attack, false)}>
              Rolar Dano Normal
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onRollDamage(attack, true)}
              className="text-destructive"
            >
              Rolar Dano Crítico (x{attack.criticalMultiplier})
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
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
