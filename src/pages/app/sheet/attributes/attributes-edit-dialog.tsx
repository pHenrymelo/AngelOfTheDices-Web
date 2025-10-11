import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { type Resolver, useForm } from 'react-hook-form';
import z from 'zod';
import { Button } from '@/components/ui/button';
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import type { Character } from '@/types/character/character';
import type { CharacterUpdateDTO } from '@/types/character/dtos/createCharacterDTO';

const attributesSchema = z.object({
  strength: z.coerce.number().min(0),
  agility: z.coerce.number().min(0),
  intellect: z.coerce.number().min(0),
  presence: z.coerce.number().min(0),
  vigor: z.coerce.number().min(0),
  armorDefenseBonus: z.coerce.number().min(0),
  otherDefenseBonus: z.coerce.number().min(0),
});

type AttributesForm = z.infer<typeof attributesSchema>;

interface Props {
  character: Character;
  onUpdate: (dto: CharacterUpdateDTO) => Promise<void>;
  isUpdating: boolean;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function AttributesEditDialog({
  character,
  onUpdate,
  isUpdating,
  isOpen,
  onOpenChange,
}: Props) {
  const form = useForm<AttributesForm>({
    resolver: zodResolver(attributesSchema) as Resolver<AttributesForm>,
  });

  useEffect(() => {
    if (isOpen && character) {
      form.reset({
        strength: character.strength,
        agility: character.agility,
        intellect: character.intellect,
        presence: character.presence,
        vigor: character.vigor,
        armorDefenseBonus: character.defense.armorBonus,
        otherDefenseBonus: character.defense.otherBonus,
      });
    }
  }, [isOpen, character, form.reset]);

  const handleFormSubmit = form.handleSubmit(async (data) => {
    const updateDto: CharacterUpdateDTO = {
      name: character.name,
      age: character.age,
      gender: character.gender,
      nex: character.nex,
      prestigePoints: character.prestigePoints,
      maxHitPoints: character.maxHitPoints,
      maxEffortPoints: character.maxEffortPoints,
      maxSanity: character.maxSanity,

      origin: character.origin.name,
      characterClass: character.characterClass.name,
      path: character.path.name,
      affinity: character.affinity.name,
      rank: character.rank.name,

      ...data,
    };

    await onUpdate(updateDto);
    onOpenChange(false);
  });

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Editar Atributos e Defesas</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form
          id="attributes-edit-form"
          onSubmit={handleFormSubmit}
          className="space-y-4"
        >
          <div className="grid grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="strength"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Força</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="agility"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Agilidade</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="intellect"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Intelecto</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="presence"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Presença</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="vigor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vigor</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4 border-t pt-4">
            <FormField
              control={form.control}
              name="armorDefenseBonus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bônus de Armadura</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="otherDefenseBonus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Outros Bônus (Defesa)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
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
        <Button type="submit" form="attributes-edit-form" disabled={isUpdating}>
          {isUpdating ? 'Salvando...' : 'Salvar'}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
