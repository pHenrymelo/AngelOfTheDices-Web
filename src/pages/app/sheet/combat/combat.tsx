import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { PlusCircle } from 'lucide-react';
import { toast } from 'sonner';
import { createAttack } from '@/api/sheet/combat/create-attack';
import { deleteAttack } from '@/api/sheet/combat/delete-attack';
import { updateAttack } from '@/api/sheet/combat/update-attack';
import { RollAttackToast } from '@/components/toasts/roll-attack-toast';
import { RollDamageToast } from '@/components/toasts/roll-damage-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type {
  AttackRequestDTO,
  AttackResponseDTO,
} from '@/types/character/attack';
import type { Character } from '@/types/character/character';
import { AttackFormDialog } from './attack-form-dialog';
import { CombatTableRow } from './combat-table-row';

interface CombatProps {
  character: Character;
}

export function Combat({ character }: CombatProps) {
  const { id: characterId, attacks } = character;
  const queryClient = useQueryClient();

  const { mutate: createAttackFn, isPending: isCreating } = useMutation({
    mutationFn: createAttack,
    onSuccess: () => {
      toast.success('Ataque adicionado com sucesso.');
      queryClient.invalidateQueries({ queryKey: ['character', characterId] });
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || 'Falha ao adicionar ataque.',
        );
      }
    },
  });

  const { mutate: updateAttackFn, isPending: isUpdating } = useMutation({
    mutationFn: updateAttack,
    onSuccess: () => {
      toast.success('Ataque atualizado com sucesso.');
      queryClient.invalidateQueries({ queryKey: ['character', characterId] });
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || 'Falha ao atualizar ataque.',
        );
      }
    },
  });

  const { mutate: deleteAttackFn, isPending: isDeleting } = useMutation({
    mutationFn: deleteAttack,
    onSuccess: () => {
      toast.success('Ataque removido com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['character', characterId] });
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || 'Falha ao remover ataque.',
        );
      }
    },
  });

  function handleCreateAttack(dto: AttackRequestDTO) {
    createAttackFn({ characterId, dto });
  }

  function handleUpdateAttack(attackId: string, dto: AttackRequestDTO) {
    updateAttackFn({ characterId, attackId, dto });
  }

  function handleDeleteAttack(attackId: string) {
    deleteAttackFn({ characterId, attackId });
  }

  function handleRollTest(attack: AttackResponseDTO) {
    const attributeMap: Record<string, keyof Character> = {
      FOR: 'strength',
      AGI: 'agility',
      INT: 'intellect',
      PRE: 'presence',
      VIG: 'vigor',
    };

    const attributeKey = attributeMap[attack.testAttribute];
    const attributeValue = character[attributeKey as keyof Character] as number;

    const expertise = character.expertises.find(
      (exp) => exp.expertiseName.name === attack.testExpertise?.name,
    );
    const expertiseBonus = expertise?.trainingRank.bonus ?? 0;

    const totalBonus = expertiseBonus + attack.testBonus;

    const diceCount = attributeValue > 0 ? attributeValue : 2;
    const rolls: number[] = [];
    for (let i = 0; i < diceCount; i++) {
      rolls.push(Math.floor(Math.random() * 20) + 1);
    }
    const finalRoll =
      attributeValue > 0 ? Math.max(...rolls) : Math.min(...rolls);
    const finalResult = finalRoll + totalBonus;

    const isCritical = finalRoll >= attack.criticalThreshold;

    toast(
      <RollAttackToast
        attackName={attack.name}
        finalResult={finalResult}
        finalRoll={finalRoll}
        totalBonus={totalBonus}
        rolls={rolls}
        isCritical={isCritical}
      />,
    );
  }

  function handleRollDamage(attack: AttackResponseDTO, isCritical: boolean) {
    let totalDamage = 0;
    const rolls: number[] = [];

    const diceType = parseInt(attack.damageDiceType.substring(1), 10);

    let diceQuantity = attack.damageDiceQuantity;
    if (isCritical) {
      diceQuantity *= attack.criticalMultiplier;
    }

    for (let i = 0; i < diceQuantity; i++) {
      const roll = Math.floor(Math.random() * diceType) + 1;
      rolls.push(roll);
      totalDamage += roll;
    }

    totalDamage += attack.damageBonus;

    toast(
      <RollDamageToast
        attackName={attack.name}
        totalDamage={totalDamage}
        rolls={rolls}
        damageBonus={attack.damageBonus}
        isCritical={isCritical}
      />,
    );
  }

  const isSaving = isCreating || isUpdating;

  return (
    <Card className="flex-1 p-4">
      <div className="relative flex justify-center items-center border-b pb-2 mb-4">
        <CardTitle className="font-heading text-xl">Combate</CardTitle>
        <AttackFormDialog onSave={handleCreateAttack} isSaving={isSaving}>
          <Button size="sm" variant="ghost" className="absolute right-0">
            <PlusCircle className="mr-2 h-4 w-4" />
            Adicionar
          </Button>
        </AttackFormDialog>
      </div>
      <CardContent>
        <div className="max-h-80 overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[64px]"></TableHead>
                <TableHead className="text-center">Nome</TableHead>
                <TableHead className="text-center">Tipo</TableHead>
                <TableHead className="text-center">Teste</TableHead>
                <TableHead className="text-center">Dano</TableHead>
                <TableHead className="text-center">Crítico</TableHead>
                <TableHead className="text-center">Alcance</TableHead>
                <TableHead className="text-center">Especial</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attacks && attacks.length > 0 ? (
                attacks.map((attack) => (
                  <CombatTableRow
                    key={attack.id}
                    attack={attack}
                    onDelete={handleDeleteAttack}
                    onUpdate={handleUpdateAttack}
                    onRollTest={handleRollTest}
                    onRollDamage={handleRollDamage}
                    isSaving={isSaving}
                    isDeleting={isDeleting}
                  />
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    Nenhum ataque registrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
