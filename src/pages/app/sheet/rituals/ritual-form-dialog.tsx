import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { getGameRules } from '@/api/sheet/get-game-rules';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
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
  RitualRequestDTO,
  RitualResponseDTO,
} from '@/types/character/ritual';

const ritualFormSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório.'),
  element: z.string().min(1, 'O elemento é obrigatório.'),
  circle: z.string().min(1, 'O círculo é obrigatório.'),
  execution: z.string().min(1, 'A execução é obrigatória.'),
  range: z.string().min(1, 'O alcance é obrigatório.'),
  target: z.string().nullable(),
  duration: z.string().nullable(),
  resistance: z.string().nullable(),
  description: z.string().nullable(),
});

type RitualForm = z.infer<typeof ritualFormSchema>;

interface RitualFormDialogProps {
  ritual?: RitualResponseDTO | null;
  onSave: (dto: RitualRequestDTO) => void;
  isSaving: boolean;
  children: React.ReactNode;
}

export function RitualFormDialog({
  ritual,
  onSave,
  isSaving,
  children,
}: RitualFormDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { data: gameRules, isLoading: isLoadingData } = useQuery({
    queryKey: ['gameRules'],
    queryFn: getGameRules,
    staleTime: Infinity,
  });

  const filteredElements = useMemo(() => {
    if (!gameRules?.affinities) return [];

    return gameRules.affinities.filter((element) => element.name !== 'NONE');
  }, [gameRules?.affinities]);

  const form = useForm<RitualForm>({
    resolver: zodResolver(ritualFormSchema),
  });

  useEffect(() => {
    if (isOpen) {
      form.reset({
        name: ritual?.name ?? '',
        description: ritual?.description ?? '',
        element: ritual?.element.name ?? '',
        circle: ritual?.circle.name ?? '',
        execution: ritual?.execution.name ?? '',
        range: ritual?.range.name ?? '',
        target: ritual?.target ?? '',
        duration: ritual?.duration ?? '',
        resistance: ritual?.resistance ?? '',
      });
    }
  }, [isOpen, ritual, form.reset]);

  const handleFormSubmit = form.handleSubmit((data) => {
    onSave(data);
    setIsOpen(false);
  });
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>
            {ritual ? 'Editar Ritual' : 'Adicionar Novo Ritual'}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            id="ritual-form"
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

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="element"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Elemento</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ''}
                      disabled={isLoadingData}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {filteredElements.map((e) => (
                          <SelectItem key={e.name} value={e.name}>
                            {e.displayName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="circle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Círculo</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ''}
                      disabled={isLoadingData}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {gameRules?.circles?.map((c) => (
                          <SelectItem key={c.name} value={c.name}>
                            {c.displayName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="execution"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Execução</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ''}
                      disabled={isLoadingData}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {gameRules?.executionTypes.map((e) => (
                          <SelectItem key={e.name} value={e.name}>
                            {e.displayName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="range"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alcance</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ''}
                      disabled={isLoadingData}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {gameRules?.rangeTypes.map((r) => (
                          <SelectItem key={r.name} value={r.name}>
                            {r.displayName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="target"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alvo</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duração</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="resistance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resistência</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} />
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
          <Button
            type="submit"
            form="ritual-form"
            disabled={isSaving || isLoadingData}
          >
            {isSaving ? 'Salvando...' : 'Salvar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
