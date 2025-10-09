import { LucideTrash2, PenBox } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import type { ItemResponseDTO } from '@/types/character/item';

interface InventoryTableRowProps {
  item: ItemResponseDTO;
  onDelete: (itemId: string) => void;
  onEdit: (item: ItemResponseDTO) => void;
}

export function InventoryTableRow({
  item,
  onDelete,
  onEdit,
}: InventoryTableRowProps) {
  return (
    <TableRow>
      <TableCell className="justify-center space-x-1">
        <Button
          variant={'outline'}
          size={'icon'}
          onClick={() => onDelete(item.id)}
        >
          <LucideTrash2 className="size-5 text-destructive" />
        </Button>
        <Button variant={'outline'} size={'icon'} onClick={() => onEdit(item)}>
          <PenBox className="size-5" />
        </Button>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium text-center">
        {item.name}
      </TableCell>
      <TableCell className="font-medium text-center">{item.category}</TableCell>
      <TableCell className="font-medium text-center">{item.spaces}</TableCell>
      <TableCell className="font-medium text-sm text-muted-foreground">
        {item.description ?? '—'}
      </TableCell>
    </TableRow>
  );
}
