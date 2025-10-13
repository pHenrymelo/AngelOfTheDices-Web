import { zodResolver } from '@hookform/resolvers/zod';
import { Dices } from 'lucide-react';
import { useState } from 'react';
import { type Resolver, useForm } from 'react-hook-form';
import * as z from 'zod';
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
import type { CharacterAttributes } from '@/types/character/character';

const rollSchema = z.object({
  attributeName: z.string(),
  diceBonus: z.coerce.number().default(0),
  otherBonus: z.coerce.number().default(0),
});

type RollForm = z.infer<typeof rollSchema>;

interface Props {
  expertiseName: string;
  baseAttributeName: keyof CharacterAttributes;
  baseTotalBonus: number;
  attributes: CharacterAttributes;
  onRoll: (params: {
    expertiseName: string;
    totalBonus: number;
    attributeValue: number;
  }) => void;
  children: React.ReactNode;
}

export function ExpertiseRollDialog({
  expertiseName,
  baseAttributeName,
  baseTotalBonus,
  attributes,
  onRoll,
  children,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<RollForm>({
    resolver: zodResolver(rollSchema) as Resolver<RollForm>,
    defaultValues: {
      attributeName: baseAttributeName,
      diceBonus: 0,
      otherBonus: 0,
    },
  });

  const handleRollSubmit = form.handleSubmit((data) => {
    const selectedAttributeValue =
      attributes[data.attributeName as keyof CharacterAttributes];

    const finalTotalBonus = baseTotalBonus + data.otherBonus;

    const finalDiceCount = Math.max(1, selectedAttributeValue + data.diceBonus);

    onRoll({
      expertiseName,
      totalBonus: finalTotalBonus,
      attributeValue: finalDiceCount,
    });

    setIsOpen(false);
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rolar Perícia: {expertiseName}</DialogTitle>
          <DialogDescription>
            Ajuste os bônus e penalidades para esta rolagem específica.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id="roll-form"
            onSubmit={handleRollSubmit}
            className="space-y-4 py-4"
          >
            <FormField
              control={form.control}
              name="attributeName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Atributo</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.keys(attributes).map((attr) => (
                        <SelectItem key={attr} value={attr}>
                          {attr}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="diceBonus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bônus de Dados</FormLabel>
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
                name="otherBonus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Outros Bônus</FormLabel>
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
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button type="submit" form="roll-form">
            <Dices className="mr-2 h-4 w-4" />
            Rolar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
