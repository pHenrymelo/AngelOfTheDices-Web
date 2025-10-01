import { Card, CardContent, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { InventoryTableRow } from './inventory-table-row';

export function Inventory() {
  return (
    <Card className="flex-1 p-4">
      <CardTitle className="flex justify-center items-center text-xl border-b-2 py-1 font-heading">
        INVENTÁRIO
      </CardTitle>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row gap-1 items-center justify-center ">
          <div className="flex gap-2 items-center px-2">
            Pontos de prestigio: <span className="text-primary">200</span>
          </div>
          <div className="flex gap-2 items-center px-2">
            Patente: <span className="text-primary">Agente de elite</span>
          </div>
          <div className="flex gap-2 items-center px-2">
            Limite de Credito: <span className="text-primary">Ilimitado</span>
          </div>
          <div className=" px-2 flex flex-col xl:flex-row gap-2">
            Itens p/ categoria:
            <div className="flex gap-2">
              I:<span className="text-primary"> 3</span>
              II:<span className="text-primary">3</span>
              III:<span className="text-primary">3</span>
              IV:<span className="text-primary">2</span>
            </div>
          </div>
          <div className="flex gap-2 items-center px-2">
            Carga: <span className="text-primary">0/20</span>
          </div>
        </div>
        <div className="max-h-80 overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[64px]"></TableHead>
                <TableHead className="text-center">Nome</TableHead>
                <TableHead className="text-center w-[64px]">
                  Categoria
                </TableHead>
                <TableHead className="text-center w-[64px]">Espaços</TableHead>
                <TableHead>Descrição</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <InventoryTableRow />
              <InventoryTableRow />
              <InventoryTableRow />
              <InventoryTableRow />
              <InventoryTableRow />
              <InventoryTableRow />
              <InventoryTableRow />
              <InventoryTableRow />
              <InventoryTableRow />
              <InventoryTableRow />
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
