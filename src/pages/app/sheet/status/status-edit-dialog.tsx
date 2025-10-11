import { Calculator } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Character } from '@/types/character/character';
import type { CharacterUpdateDTO } from '@/types/character/dtos/createCharacterDTO';

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

  const { register, handleSubmit, reset, setValue, getValues } = useForm({
    defaultValues: {
      nex: character.nex,
      maxHitPoints: character.maxHitPoints,
      maxEffortPoints: character.maxEffortPoints,
      maxSanity: character.maxSanity,
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        nex: character.nex,
        maxHitPoints: character.maxHitPoints,
        maxEffortPoints: character.maxEffortPoints,
        maxSanity: character.maxSanity,
      });
      setPortraitFile(null);
    }
  }, [isOpen, character, reset]);

  function handleRecalculateStats() {
    const { nex } = getValues();
    const { vigor, presence, characterClass } = character;

    const level = Math.max(1, Math.ceil(nex / 5));

    const newMaxHp =
      characterClass.baseHitPoints +
      (level - 1) * characterClass.hpPerLevel +
      level * vigor;
    const newMaxEp =
      characterClass.baseEffortPoints +
      (level - 1) * characterClass.epPerLevel +
      level * presence;
    const newMaxSan =
      characterClass.baseSanity + (level - 1) * characterClass.sanPerLevel;

    setValue('maxHitPoints', newMaxHp, { shouldValidate: true });
    setValue('maxEffortPoints', newMaxEp, { shouldValidate: true });
    setValue('maxSanity', newMaxSan, { shouldValidate: true });

    toast.info('Status máximos recalculados!');
  }

  const handleFormSubmit = handleSubmit(async (data) => {
    try {
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
    } catch (error) {
      console.error('Failed to update character', error);
    }
  });

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Editar Status Base e Retrato</DialogTitle>
        <DialogDescription>
          Ajuste os valores estruturais e o retrato do seu agente.
        </DialogDescription>
      </DialogHeader>
      <form
        id="status-edit-form"
        onSubmit={handleFormSubmit}
        className="space-y-4"
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor="portrait">Trocar Retrato do Agente</Label>
          <Input
            id="portrait"
            type="file"
            accept="image/*"
            onChange={(e) => setPortraitFile(e.target.files?.[0] || null)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="nex">NEX</Label>
          <Input
            id="nex"
            type="number"
            max={100}
            {...register('nex', { valueAsNumber: true })}
          />
        </div>
        <div className="space-y-2 border-t pt-4">
          <div className="flex justify-between items-center mb-2">
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
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="maxHitPoints">PV (Máx)</Label>
              <Input
                id="maxHitPoints"
                type="number"
                {...register('maxHitPoints', { valueAsNumber: true })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="maxEffortPoints">PE (Máx)</Label>
              <Input
                id="maxEffortPoints"
                type="number"
                {...register('maxEffortPoints', { valueAsNumber: true })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="maxSanity">SAN (Máx)</Label>
              <Input
                id="maxSanity"
                type="number"
                {...register('maxSanity', { valueAsNumber: true })}
              />
            </div>
          </div>
        </div>
      </form>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancelar</Button>
        </DialogClose>
        <Button type="submit" form="status-edit-form" disabled={isUpdating}>
          {isUpdating ? 'Salvando...' : 'Salvar Alterações'}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
