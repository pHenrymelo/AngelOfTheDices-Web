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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import type { CharacterExpertise } from '@/types/character/expertise';

const expertiseEditSchema = z.object({
  trainingRank: z.string().min(1, 'Selecione um grau de treinamento.'),
  hasKit: z.boolean().default(false),
  otherBonus: z.coerce.number().default(0),
});

type ExpertiseEditForm = z.infer<typeof expertiseEditSchema>;

const trainingRanks = [
  { name: 'UNTRAINED', displayName: 'Destreinado', bonus: 0 },
  { name: 'TRAINED', displayName: 'Treinado', bonus: 5 },
  { name: 'VETERAN', displayName: 'Veterano', bonus: 10 },
  { name: 'EXPERT', displayName: 'Expert', bonus: 15 },
];

interface ExpertiseEditDialogProps {
  expertise: CharacterExpertise;
  onUpdate: (updatedExpertise: CharacterExpertise) => void;
  isSaving: boolean;
  children: React.ReactNode;
}

export function ExpertiseEditDialog({
  expertise,
  onUpdate,
  isSaving,
  children,
}: ExpertiseEditDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<ExpertiseEditForm>({
    resolver: zodResolver(expertiseEditSchema) as Resolver<ExpertiseEditForm>,
  });

  useEffect(() => {
    if (isOpen) {
      form.reset({
        trainingRank: expertise.trainingRank.name,
        hasKit: expertise.hasKit,
        otherBonus: expertise.otherBonus,
      });
    }
  }, [isOpen, expertise, form.reset]);

  const handleSaveChanges = form.handleSubmit((data) => {
    const newRank = trainingRanks.find(
      (rank) => rank.name === data.trainingRank,
    )!;
    const updatedExpertise: CharacterExpertise = {
      ...expertise,
      trainingRank: { name: newRank.name, bonus: newRank.bonus },
      hasKit: data.hasKit,
      otherBonus: data.otherBonus,
    };
    onUpdate(updatedExpertise);
    setIsOpen(false);
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Editar Perícia: {expertise.expertiseName.displayName}
          </DialogTitle>
          <DialogDescription>
            Ajuste os valores permanentes desta perícia.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id="expertise-edit-form"
            onSubmit={handleSaveChanges}
            className="space-y-4 py-4"
          >
            <FormField
              control={form.control}
              name="trainingRank"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel>Grau de Treinamento</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {trainingRanks.map((rank) => (
                        <SelectItem key={rank.name} value={rank.name}>
                          {rank.displayName} (+{rank.bonus})
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
              name="otherBonus"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel>Outros Bônus (Permanente)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      className="w-[180px]"
                      {...field}
                      onChange={(e) => field.onChange(+e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {expertise.expertiseName.kitApplicable && (
              <FormField
                control={form.control}
                name="hasKit"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                    <FormLabel>Usando Kit de Perícia</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button type="submit" form="expertise-edit-form" disabled={isSaving}>
            {isSaving ? 'Salvando...' : 'Salvar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
