import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function AbilityCard() {
  return (
    <Card className="flex-1 p-4">
      <CardHeader className="flex flex-col justify-center items-center border-b-2 py-1 font-heading">
        <CardTitle className="text-primary text-xl">Golpe de sorte</CardTitle>
        <p className="text-sm text-muted-foreground">(Poder Paranormal)</p>
      </CardHeader>
      <CardContent className="w-full flex my-auto">
        Seus ataques recebem +1 na margem de ameaça. Pré-requisito: Energia 1.
        Afinidade: seus ataques recebem +1 no multiplicador de crítico.
      </CardContent>
    </Card>
  );
}
