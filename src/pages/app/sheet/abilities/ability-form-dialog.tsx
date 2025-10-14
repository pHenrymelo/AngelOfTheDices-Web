import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import type {
  AbilityRequestDTO,
  AbilityResponseDTO,
} from '@/types/character/ability';

const abilityFormSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório.'),
  description: z.string().nullable(),
  type: z.string().min(1, 'O tipo é obrigatório.'),
});

type AbilityForm = z.infer<typeof abilityFormSchema>;

interface AbilityFormDialogProps {
  ability?: AbilityResponseDTO | null;
  onSave: (dto: AbilityRequestDTO) => void;
  isSaving: boolean;
  children: React.ReactNode;
}

export function AbilityFormDialog({
  ability,
  onSave,
  isSaving,
  children,
}: AbilityFormDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<AbilityForm>({
    resolver: zodResolver(abilityFormSchema),
    defaultValues: {
      name: '',
      description: '',
      type: '',
    },
  });

  useEffect(() => {
    if (isOpen) {
      form.reset({
        name: ability?.name ?? '',
        description: ability?.description ?? '',
        type: ability?.type.name ?? '',
      });
    }
  }, [isOpen, ability, form.reset]);

  const handleFormSubmit = form.handleSubmit((data) => {
    const payload: AbilityRequestDTO = {
      name: data.name,
      description: data.description || null,
      type: data.type,
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
            {ability ? 'Editar Habilidade' : 'Criar Nova Habilidade'}
          </DialogTitle>
          <DialogDescription>
            {ability
              ? 'Modifique os detalhes da sua habilidade.'
              : 'Adicione uma nova habilidade ou poder à sua ficha.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id="ability-form"
            onSubmit={handleFormSubmit}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="CLASS_ABILITY">
                        Habilidade de Classe
                      </SelectItem>
                      <SelectItem value="ORIGIN_POWER">
                        Poder de Origem
                      </SelectItem>
                      <SelectItem value="PARANORMAL_POWER">
                        Poder Paranormal
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
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
          <Button type="submit" form="ability-form" disabled={isSaving}>
            {isSaving ? 'Salvando...' : 'Salvar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
