import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { type Resolver, useForm } from 'react-hook-form';
import z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { ItemRequestDTO, ItemResponseDTO } from '@/types/character/item';

const itemFormSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório.'),
  description: z.string().nullable(),
  category: z.coerce.number().min(0, 'Categoria não pode ser negativa.'),
  spaces: z.coerce.number().min(0, 'Espaços não podem ser negativos.'),
});

type ItemForm = z.infer<typeof itemFormSchema>;

interface ItemFormDialogProps {
  item?: ItemResponseDTO | null;
  onSave: (dto: ItemRequestDTO) => void;
  isSaving: boolean;
  children: React.ReactNode;
}

export function ItemFormDialog({
  item,
  onSave,
  isSaving,
  children,
}: ItemFormDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<ItemForm>({
    resolver: zodResolver(itemFormSchema) as Resolver<ItemForm>,
  });

  useEffect(() => {
    if (isOpen) {
      form.reset({
        name: item?.name ?? '',
        description: item?.description ?? '',
        category: item?.category ?? 1,
        spaces: item?.spaces ?? 1,
      });
    }
  }, [isOpen, item, form.reset]);

  const handleFormSubmit = form.handleSubmit((data) => {
    const payload: ItemRequestDTO = {
      ...data,
      description: data.description || null,
    };
    onSave(payload);
    setIsOpen(false);
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {item ? 'Editar Item' : 'Adicionar Novo Item'}
          </DialogTitle>
          <DialogDescription>
            {item
              ? 'Modifique os detalhes do item.'
              : 'Preencha os detalhes do novo item para adicioná-lo ao inventário.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id="item-form"
            onSubmit={handleFormSubmit}
            className="space-y-4 py-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Item</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(+e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="spaces"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Espaços</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(+e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      className="resize-y"
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button type="submit" form="item-form" disabled={isSaving}>
            {isSaving ? 'Salvando...' : 'Salvar Item'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
