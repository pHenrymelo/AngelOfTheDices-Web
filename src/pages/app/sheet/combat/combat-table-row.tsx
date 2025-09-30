import { LucideTrash2 } from 'lucide-react';
import { DiceD20Icon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';

export function CombatTableRow() {
  return (
    <TableRow>
      <TableCell className="justify-center">
        <Button variant={'outline'} size={'icon'}>
          <LucideTrash2 className="size-5" />
        </Button>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium text-center">
        Snyper
      </TableCell>
      <TableCell className="font-medium text-center">Balistico</TableCell>
      <TableCell className="font-medium text-center">
        <Button variant={'ghost'} className="p-2 group">
          <DiceD20Icon className="group-hover:animate-spin" />
          <span>AGI + Pontaria</span>
        </Button>
      </TableCell>
      <TableCell className="font-medium text-center">2d10</TableCell>
      <TableCell className="font-medium text-center">19/3x</TableCell>
      <TableCell className="font-medium text-center">Longo</TableCell>
      <TableCell className="font-medium text-center">III</TableCell>
      <TableCell className="font-medium text-center">2</TableCell>
      <TableCell className="font-medium text-center">Calibre Grosso</TableCell>
    </TableRow>
  );
}
