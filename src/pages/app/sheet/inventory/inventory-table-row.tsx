import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { LucideTrash2, PenBox } from 'lucide-react';

export function InventoryTableRow() {
  return (
    <TableRow>
      <TableCell className="justify-center space-x-1">
        <Button variant={'outline'} size={'icon'}>
          <LucideTrash2 className="size-5" />
        </Button>
        <Button variant={'outline'} size={'icon'}>
          <PenBox className="size-5" />
        </Button>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium text-center">
        Item
      </TableCell>
      <TableCell className="font-medium text-center">II</TableCell>
      <TableCell className="font-medium text-center">2</TableCell>
      <TableCell className="font-medium">
        Um item qualquer que eu encontrei em um lugar qualquer{' '}
      </TableCell>
    </TableRow>
  );
}
