import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { AlertDialogHeader } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import type { NoteRequestDTO, NoteResponseDTO } from '@/types/character/note';

const noteFormSchema = z.object({
  title: z.string().min(1, 'O título é obrigatório.'),
  description: z.string().optional(),
});

type NoteForm = z.infer<typeof noteFormSchema>;

interface NoteFormDialogProps {
  note?: NoteResponseDTO | null;
  onSave: (dto: NoteRequestDTO) => void;
  isSaving: boolean;
  children: React.ReactNode;
}

export function NoteFormDialog({
  note,
  onSave,
  isSaving,
  children,
}: NoteFormDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<NoteForm>({
    resolver: zodResolver(noteFormSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  useEffect(() => {
    if (isOpen) {
      form.reset({
        title: note?.title ?? '',
        description: note?.description ?? '',
      });
    }
  }, [isOpen, note, form.reset]);

  const handleFormSubmit = form.handleSubmit((data) => {
    const payload: NoteRequestDTO = {
      title: data.title,
      description: data.description ?? null,
    };
    onSave(payload);
    setIsOpen(false);
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <AlertDialogHeader>
          <DialogTitle>
            {note ? 'Editar Anotação' : 'Criar Nova Anotação'}
          </DialogTitle>
          <DialogDescription>
            {note
              ? 'Modifique os detalhes da sua anotação.'
              : 'Escreva uma nova anotação para sua ficha.'}
          </DialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form
            id="note-form"
            onSubmit={handleFormSubmit}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
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
                    <Textarea className="resize-y" {...field} />
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
          <Button type="submit" form="note-form" disabled={isSaving}>
            {isSaving ? 'Salvando...' : 'Salvar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
