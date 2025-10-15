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
  AttackRequestDTO,
  AttackResponseDTO,
} from '@/types/character/attack';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { type Resolver, useForm } from 'react-hook-form';
import z from 'zod';

const attackFormSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório.'),
  type: z.string().min(1, 'O tipo de dano é obrigatório.'),
  testAttribute: z.string().min(1, 'O atributo de teste é obrigatório.'),
  testExpertise: z.string().nullable(),
  testBonus: z.coerce.number().default(0),
  damageDiceQuantity: z.coerce.number().min(0).default(0),
  damageDiceType: z.string().min(1, 'O tipo de dado é obrigatório.'),
  damageBonus: z.coerce.number().default(0),
  criticalThreshold: z.coerce.number().min(1).max(20),
  criticalMultiplier: z.coerce.number().min(2),
  range: z.string().min(1, 'O alcance é obrigatório.'),
  special: z.string().nullable(),
});

type AttackForm = z.infer<typeof attackFormSchema>;

interface AttackFormDialogProps {
  attack?: AttackResponseDTO | null;
  onSave: (dto: AttackRequestDTO) => void;
  isSaving: boolean;
  children: React.ReactNode;
}

export function AttackFormDialog({
  attack,
  onSave,
  isSaving,
  children,
}: AttackFormDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { data: gameRules, isLoading: isLoadingData } = useQuery({
    queryKey: ['gameRules'],
    queryFn: getGameRules,
    staleTime: Infinity,
  });

  const form = useForm<AttackForm>({
    resolver: zodResolver(attackFormSchema) as Resolver<AttackForm>,
  });

  useEffect(() => {
    if (isOpen) {
      form.reset({
        name: attack?.name ?? '',
        type: attack?.type.name ?? '',
        testAttribute: attack?.testAttribute ?? 'FOR',
        testExpertise: attack?.testExpertise?.name ?? null,
        testBonus: attack?.testBonus ?? 0,
        damageDiceQuantity: attack?.damageDiceQuantity ?? 1,
        damageDiceType: attack?.damageDiceType ?? 'D4',
        damageBonus: attack?.damageBonus ?? 0,
        criticalThreshold: attack?.criticalThreshold ?? 20,
        criticalMultiplier: attack?.criticalMultiplier ?? 2,
        range: attack?.range.name ?? 'PERSONAL',
        special: attack?.special ?? null,
      });
    }
  }, [isOpen, attack, form.reset]);

  const handleFormSubmit = form.handleSubmit((data) => {
    onSave(data as AttackRequestDTO);
    setIsOpen(false);
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>
            {attack ? 'Editar Ataque' : 'Adicionar Novo Ataque'}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            id="attack-form"
            onSubmit={handleFormSubmit}
            className="space-y-4 max-h-[70vh] overflow-y-auto pr-6"
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
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Dano</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {gameRules?.attackTypes?.map((t) => (
                          <SelectItem key={t.name} value={t.name}>
                            {t.displayName}
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
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {gameRules?.rangeTypes?.map((r) => (
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

            <div className="border-t pt-4 space-y-4">
              <h4 className="font-medium text-muted-foreground">
                Teste de Ataque
              </h4>
              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="testAttribute"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Atributo</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {gameRules?.attributes?.map((a) => (
                            <SelectItem key={a} value={a}>
                              {a}
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
                  name="testExpertise"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Perícia</FormLabel>
                      <Select
                        onValueChange={(value) =>
                          field.onChange(value === 'NONE' ? null : value)
                        }
                        value={field.value ?? 'NONE'}
                        disabled={isLoadingData}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Nenhuma" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="NONE">Nenhuma</SelectItem>
                          {gameRules?.expertises?.map((e) => (
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
                  name="testBonus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bônus</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="border-t pt-4 space-y-4">
              <h4 className="font-medium text-muted-foreground">
                Dano e Crítico
              </h4>
              <div className="grid grid-cols-4 gap-4">
                <FormField
                  control={form.control}
                  name="damageDiceQuantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dados</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="damageDiceType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {gameRules?.diceTypes?.map((d) => (
                            <SelectItem key={d} value={d}>
                              {d}
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
                  name="damageBonus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bônus</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                <FormField
                  control={form.control}
                  name="criticalThreshold"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Margem de Ameaça</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="criticalMultiplier"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Multiplicador</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="special"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Especial</FormLabel>
                  <FormControl>
                    <Textarea {...field} value={field.value ?? ''} />
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
            form="attack-form"
            disabled={isSaving || isLoadingData}
          >
            {isSaving ? 'Salvando...' : 'Salvar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
