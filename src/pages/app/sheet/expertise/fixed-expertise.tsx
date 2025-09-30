import { Card, CardTitle } from '@/components/ui/card';

export function FixedExpertise() {
  return (
    <Card className="flex-1 p-4 h-96">
      <div className="flex flex-col justify-center items-center border-b-2 py-1">
        <CardTitle className="text-xl">PERÍCIAS</CardTitle>
        <p className="text-sm text-muted-foreground">(Acesso rápido)</p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <span className="text-muted-foreground text-sm">
          Não há pericias de acesso rápido
        </span>
      </div>
    </Card>
  );
}
