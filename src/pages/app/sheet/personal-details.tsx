import { Card, CardTitle } from '@/components/ui/card';

export function PersonalDetails() {
  return (
    <Card className="w-full lg:w-1/2 p-4">
      <CardTitle className=" flex font-bold text-2xl justify-center">
        DETALHES PESSOAIS
      </CardTitle>
      <div className="flex flex-col">
        <span className="font-semibold">Nome</span>
        <p className="border-b-2 text-muted-foreground p-2">Leonard C. Lance</p>
      </div>
      <div className="flex flex-col">
        <span className="font-semibold">Jogador</span>
        <p className="border-b-2 text-muted-foreground p-2"> Pedro Melo</p>
      </div>
      <div className="flex flex-col">
        <span className="font-semibold">Origem</span>
        <p className="border-b-2 text-muted-foreground p-2">
          Perito forense e Tecnico
        </p>
      </div>
      <div className="flex flex-col">
        <span className="font-semibold">Trilha</span>
        <p className="border-b-2 text-muted-foreground p-2">
          Portador do Grimorio
        </p>
      </div>
      <div className="flex flex-col">
        <span className="font-semibold">Idade</span>
        <p className="border-b-2 text-muted-foreground p-2">25</p>
      </div>
      <div className="flex flex-col">
        <span className="font-semibold">Sexo</span>
        <p className="border-b-2 text-muted-foreground p-2">Masculino</p>
      </div>
    </Card>
  );
}
