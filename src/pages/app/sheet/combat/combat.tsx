import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { PlusCircle } from 'lucide-react';
import { toast } from 'sonner';
import { deleteCharacterAttack } from '@/api/sheet/combat/delete-character-attack';
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
import type { AttackResponseDTO } from '@/types/character/attack';
import { CombatTableRow } from './combat-table-row';

interface CombatProps {
  characterId: string;
  attacks: AttackResponseDTO[];
}

export function Combat({ characterId, attacks }: CombatProps) {
  const queryClient = useQueryClient();

  const { mutate: deleteAttackFn } = useMutation({
    mutationFn: deleteCharacterAttack,
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

  function handleDeleteAttack(attackId: string) {
    deleteAttackFn({ characterId, attackId });
  }

  function handleEditAttack(attack: AttackResponseDTO) {
    // TODO: Abrir um Dialog/Modal para edição do ataque
    console.log('Editar ataque:', attack);
    toast.info('Funcionalidade de editar ataque em desenvolvimento.');
  }

  function handleRollTest(testString: string) {
    // TODO: Implementar lógica de rolagem de dados
    console.log('Rolar teste:', testString);
    toast.info(`Rolando: ${testString}`);
  }

  return (
    <Card className="flex-1 p-4">
      <div className="relative flex justify-center items-center border-b-2 pb-2 mb-4">
        <CardTitle className="font-heading text-xl">Combate</CardTitle>
        <Button
          onClick={() => {}}
          size="sm"
          variant="ghost"
          className="absolute right-0"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Adicionar
        </Button>
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
                    onEdit={handleEditAttack}
                    onRoll={handleRollTest}
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
