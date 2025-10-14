import { LucideTrash2, PenBox } from 'lucide-react';
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
import { TableCell, TableRow } from '@/components/ui/table';
import type { ItemRequestDTO, ItemResponseDTO } from '@/types/character/item';
import { ItemFormDialog } from './item-form-dialog';

interface InventoryTableRowProps {
  item: ItemResponseDTO;
  onDelete: (itemId: string) => void;
  onUpdate: (itemId: string, dto: ItemRequestDTO) => void;
  isSaving: boolean;
  isDeleting: boolean;
}

export function InventoryTableRow({
  item,
  onDelete,
  onUpdate,
  isSaving,
  isDeleting,
}: InventoryTableRowProps) {
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
                Tem certeza que deseja remover o item "{item.name}" do seu
                inventário?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => onDelete(item.id)}
                disabled={isDeleting}
              >
                {isDeleting ? 'Removendo...' : 'Remover'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <ItemFormDialog
          item={item}
          onSave={(dto) => onUpdate(item.id, dto)}
          isSaving={isSaving}
        >
          <Button variant={'outline'} size={'icon'} disabled={isSaving}>
            <PenBox className="size-5" />
          </Button>
        </ItemFormDialog>
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
