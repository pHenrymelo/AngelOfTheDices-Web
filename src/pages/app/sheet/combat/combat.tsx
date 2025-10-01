import { Card, CardContent, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CombatTableRow } from './combat-table-row';

export function Combat() {
  return (
    <Card className="flex-1 p-4">
      <CardTitle className="flex justify-center items-center text-xl border-b-2 py-1 font-heading">
        COMBATE
      </CardTitle>
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
                <TableHead className="text-center">Categoria</TableHead>
                <TableHead className="text-center">Espaços</TableHead>
                <TableHead className="text-center">Especial</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <CombatTableRow />
              <CombatTableRow />
              <CombatTableRow />
              <CombatTableRow />
              <CombatTableRow />
              <CombatTableRow />
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
