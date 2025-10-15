import { zodResolver } from '@hookform/resolvers/zod';
import { Calculator } from 'lucide-react';
import { useEffect, useState } from 'react';
import { type Resolver, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import { Button } from '@/components/ui/button';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import type { Character } from '@/types/character/character';
import type { CharacterUpdateDTO } from '@/types/character/dtos/createCharacterDTO';

const statusEditSchema = z
  .object({
    nex: z.coerce
      .number({ error: 'NEX deve ser um número.' })
      .min(0, { error: 'o NEX não pode ser negativo' })
      .max(99, { error: 'O NEX so pode exceder 99% com a Desconjuração' }),
    useDeterminationPoints: z.boolean(),
    maxHitPoints: z.coerce
      .number({ error: 'PV Máximo deve ser um número.' })
      .min(1),
    maxEffortPoints: z.preprocess(
      (val) => (val === '' || val === null ? undefined : val),
      z.coerce
        .number({ error: 'PE Máximo deve ser um número.' })
        .min(1)
        .optional(),
    ),
    maxSanity: z.preprocess(
      (val) => (val === '' || val === null ? undefined : val),
      z.coerce
        .number({ error: 'SAN Máxima deve ser um número.' })
        .min(1)
        .optional(),
    ),
    maxDeterminationPoints: z.preprocess(
      (val) => (val === '' || val === null ? undefined : val),
      z.coerce
        .number({ error: 'PD Máximo deve ser um número.' })
        .min(1)
        .optional(),
    ),
  })
  .superRefine((data, ctx) => {
    if (data.useDeterminationPoints) {
      if (
        data.maxDeterminationPoints === undefined ||
        data.maxDeterminationPoints < 1
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['maxDeterminationPoints'],
          message: 'PD Máximo é obrigatório e deve ser no mínimo 1.',
        });
      }
    } else {
      if (data.maxEffortPoints === undefined || data.maxEffortPoints < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['maxEffortPoints'],
          message: 'PE Máximo é obrigatório e deve ser no mínimo 1.',
        });
      }
      if (data.maxSanity === undefined || data.maxSanity < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['maxSanity'],
          message: 'SAN Máxima é obrigatória e deve ser no mínimo 1.',
        });
      }
    }
  });

type StatusEditForm = z.infer<typeof statusEditSchema>;

interface StatusEditDialogProps {
  character: Character;
  onCharacterUpdate: (dto: CharacterUpdateDTO) => Promise<void>;
  onPortraitUpload: (file: File) => Promise<void>;
  isUpdating: boolean;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function StatusEditDialog({
  character,
  onCharacterUpdate,
  onPortraitUpload,
  isUpdating,
  isOpen,
  onOpenChange,
}: StatusEditDialogProps) {
  const [portraitFile, setPortraitFile] = useState<File | null>(null);

  const form = useForm<StatusEditForm>({
    resolver: zodResolver(statusEditSchema) as Resolver<StatusEditForm>,
  });

  const useDetermination = form.watch('useDeterminationPoints');

  useEffect(() => {
    if (isOpen) {
      form.reset({
        nex: character.nex,
        useDeterminationPoints: character.useDeterminationPoints,
        maxHitPoints: character.maxHitPoints,
        maxEffortPoints: character.maxEffortPoints,
        maxSanity: character.maxSanity,
        maxDeterminationPoints: character.maxDeterminationPoints,
      });
      setPortraitFile(null);
    }
  }, [isOpen, character, form.reset]);

  function handleRecalculateStats() {
    const { nex } = form.getValues();
    const { vigor, presence, characterClass } = character;

    let level: number;
    if (nex >= 99) {
      level = 20;
    } else {
      level = Math.max(1, Math.ceil(nex / 5));
    }

    if (useDetermination) {
      const newMaxDp =
        characterClass.baseDeterminationPoints +
        (level - 1) * characterClass.dpPerLevel +
        level * presence;
      form.setValue('maxDeterminationPoints', newMaxDp, {
        shouldValidate: true,
      });
    } else {
      const newMaxEp =
        characterClass.baseEffortPoints +
        (level - 1) * characterClass.epPerLevel +
        level * presence;
      const newMaxSan =
        characterClass.baseSanity + (level - 1) * characterClass.sanPerLevel;
      form.setValue('maxEffortPoints', newMaxEp, { shouldValidate: true });
      form.setValue('maxSanity', newMaxSan, { shouldValidate: true });
    }

    const newMaxHp =
      characterClass.baseHitPoints +
      (level - 1) * characterClass.hpPerLevel +
      level * vigor;
    form.setValue('maxHitPoints', newMaxHp, { shouldValidate: true });

    toast.info('Status máximos recalculados!');
  }

  const handleFormSubmit = form.handleSubmit(async (data) => {
    const updateDto: CharacterUpdateDTO = {
      ...character,
      ...data,
      origin: character.origin.name,
      characterClass: character.characterClass.name,
      path: character.path.name,
      affinity: character.affinity.name,
      rank: character.rank.name,
    };
    await onCharacterUpdate(updateDto);
    if (portraitFile) {
      await onPortraitUpload(portraitFile);
    }
    toast.success('Informações atualizadas!');
    onOpenChange(false);
  });

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Editar Status Base e Retrato</DialogTitle>
        <DialogDescription>
          Ajuste os valores estruturais, regras e o retrato do seu agente.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form
          id="status-edit-form"
          onSubmit={handleFormSubmit}
          className="space-y-6 pt-4"
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="portrait">Trocar Retrato do Agente</Label>
            <Input
              id="portrait"
              type="file"
              accept="image/*"
              onChange={(e) => setPortraitFile(e.target.files?.[0] || null)}
              className="p-2"
            />
          </div>
          <FormField
            control={form.control}
            name="nex"
            render={({ field }) => (
              <FormItem>
                <FormLabel>NEX</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    inputMode="numeric"
                    {...field}
                    value={field.value ?? ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="useDeterminationPoints"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Usar Pontos de Determinação</FormLabel>
                  <FormDescription className="text-xs">
                    Substitui SAN e PE por uma única estatística.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="space-y-2 border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium text-sm">Status Máximos</h4>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleRecalculateStats}
              >
                <Calculator className="mr-2 h-4 w-4" />
                Recalcular
              </Button>
            </div>

            {useDetermination ? (
              <div className="grid grid-cols-2 gap-4 items-start">
                <FormField
                  control={form.control}
                  name="maxHitPoints"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>PV (Máx)</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          inputMode="numeric"
                          {...field}
                          value={field.value ?? ''}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="maxDeterminationPoints"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>PD (Máx)</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          inputMode="numeric"
                          {...field}
                          value={field.value ?? ''}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-4 items-start">
                <FormField
                  control={form.control}
                  name="maxHitPoints"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>PV (Máx)</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          inputMode="numeric"
                          {...field}
                          value={field.value ?? ''}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="maxEffortPoints"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>PE (Máx)</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          inputMode="numeric"
                          {...field}
                          value={field.value ?? ''}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="maxSanity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SAN (Máx)</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          inputMode="numeric"
                          {...field}
                          value={field.value ?? ''}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </div>
        </form>
      </Form>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancelar</Button>
        </DialogClose>
        <Button type="submit" form="status-edit-form" disabled={isUpdating}>
          {isUpdating ? 'Salvando...' : 'Salvar'}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
