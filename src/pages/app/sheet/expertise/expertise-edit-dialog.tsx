import { useEffect, useState } from 'react';
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
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import type { CharacterExpertise } from '@/types/character/expertise';

const trainingRanks = [
  { name: 'UNTRAINED', displayName: 'Destreinado', bonus: 0 },
  { name: 'TRAINED', displayName: 'Treinado', bonus: 5 },
  { name: 'VETERAN', displayName: 'Veterano', bonus: 10 },
  { name: 'EXPERT', displayName: 'Expert', bonus: 15 },
];

interface Props {
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
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRankName, setSelectedRankName] = useState(
    expertise.trainingRank.name,
  );
  const [hasKit, setHasKit] = useState(expertise.hasKit);

  useEffect(() => {
    if (isOpen) {
      setSelectedRankName(expertise.trainingRank.name);
      setHasKit(expertise.hasKit);
    }
  }, [isOpen, expertise]);

  function handleSaveChanges() {
    const newRank = trainingRanks.find(
      (rank) => rank.name === selectedRankName,
    )!;
    const updatedExpertise: CharacterExpertise = {
      ...expertise,
      trainingRank: {
        name: newRank.name,
        bonus: newRank.bonus,
      },
      hasKit: hasKit,
    };
    onUpdate(updatedExpertise);
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Editar Perícia: {expertise.expertiseName.displayName}
          </DialogTitle>
          <DialogDescription>
            Ajuste o grau de treinamento e o uso de kit para esta perícia.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex items-center justify-between">
            <Label>Grau de Treinamento</Label>
            <Select
              onValueChange={setSelectedRankName}
              value={selectedRankName}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent>
                {trainingRanks.map((rank) => (
                  <SelectItem key={rank.name} value={rank.name}>
                    {rank.displayName} (+{rank.bonus})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {expertise.expertiseName.kitApplicable && (
            <div className="flex items-center justify-between">
              <Label>Usando Kit de Perícia</Label>
              <Switch checked={hasKit} onCheckedChange={setHasKit} />
            </div>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button onClick={handleSaveChanges} disabled={isSaving}>
            {isSaving ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
