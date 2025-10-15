import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { PlusCircle } from 'lucide-react';
import { toast } from 'sonner';
import { createItem } from '@/api/sheet/inventory/create-item';
import { deleteItem } from '@/api/sheet/inventory/delete-item';
import { updateItem } from '@/api/sheet/inventory/update-item';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import type { Character } from '@/types/character/character';
import type { ItemRequestDTO } from '@/types/character/item';
import { InventoryTableRow } from './inventory-table-row';
import { ItemFormDialog } from './item-form-dialog';

interface InventoryProps {
  character: Character;
}

export function Inventory({ character }: InventoryProps) {
  const queryClient = useQueryClient();

  const { mutate: createItemFn, isPending: isCreating } = useMutation({
    mutationFn: createItem,
    onSuccess: () => {
      toast.success('Item adicionado ao inventário.');
      queryClient.invalidateQueries({ queryKey: ['character', character.id] });
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || 'Falha ao adicionar item.',
        );
      }
    },
  });

  const { mutate: updateItemFn, isPending: isUpdating } = useMutation({
    mutationFn: updateItem,
    onSuccess: () => {
      toast.success('Item atualizado com sucesso.');
      queryClient.invalidateQueries({ queryKey: ['character', character.id] });
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || 'Falha ao atualizar item.',
        );
      }
    },
  });

  const { mutate: deleteItemFn, isPending: isDeleting } = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      toast.success('Item removido do inventário.');
      queryClient.invalidateQueries({ queryKey: ['character', character.id] });
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || 'Falha ao remover item.');
      }
    },
  });

  function handleCreateItem(dto: ItemRequestDTO) {
    createItemFn({ characterId: character.id, dto });
  }

  function handleUpdateItem(itemId: string, dto: ItemRequestDTO) {
    updateItemFn({ characterId: character.id, itemId, dto });
  }

  function handleDeleteItem(itemId: string) {
    deleteItemFn({ characterId: character.id, itemId });
  }

  const isSaving = isCreating || isUpdating;

  return (
    <Card className="flex-1 p-4">
      <CardHeader className="relative flex items-center border-b">
        <CardTitle className=" flex md:mx-auto font-heading text-xl">
          INVENTÁRIO
        </CardTitle>
        <ItemFormDialog onSave={handleCreateItem} isSaving={isSaving}>
          <Button size="sm" variant="ghost" className="absolute right-0">
            <PlusCircle className="mr-2 h-4 w-4" />
            Adicionar Item
          </Button>
        </ItemFormDialog>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 px-0 md:px-4">
        <div className="flex flex-wrap gap-x-4 gap-y-2 items-center justify-center text-sm text-muted-foreground px-2">
          <div className="flex gap-1 items-center">
            Prestígio:{' '}
            <span className="text-primary font-semibold">
              {character.prestigePoints}
            </span>
          </div>
          <div className="flex gap-1 items-center">
            Patente:{' '}
            <span className="text-primary font-semibold">
              {character.rank.displayName}
            </span>
          </div>
          <div className="flex gap-1 items-center">
            Crédito:{' '}
            <span className="text-primary font-semibold">
              {character.rank.creditLimit}
            </span>
          </div>
          <div className="flex gap-2 items-center">
            Itens p/ Categoria:
            <div className="flex gap-x-2">
              {Object.entries(character.rank.itemLimits).map(([cat, limit]) => (
                <span key={cat}>
                  {cat}:
                  <span className="text-primary font-semibold ml-1">
                    {limit === -1 ? '∞' : limit}
                  </span>
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-1 items-center">
            Carga:{' '}
            <span
              className={cn('font-semibold', {
                'text-destructive': character.currentLoad > character.maxLoad,
              })}
            >
              {character.currentLoad} / {character.maxLoad}
            </span>
          </div>
        </div>

        <div className="max-h-80 overflow-y-auto border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]"></TableHead>
                <TableHead>Nome</TableHead>
                <TableHead className="w-[100px] text-center">
                  Categoria
                </TableHead>
                <TableHead className="w-[100px] text-center">Espaços</TableHead>
                <TableHead>Descrição</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {character.inventory && character.inventory.length > 0 ? (
                character.inventory.map((item) => (
                  <InventoryTableRow
                    key={item.id}
                    item={item}
                    onDelete={handleDeleteItem}
                    onUpdate={handleUpdateItem}
                    isSaving={isSaving}
                    isDeleting={isDeleting}
                  />
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    Inventário vazio.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
