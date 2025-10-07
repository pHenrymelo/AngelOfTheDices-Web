import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function Note() {
  return (
    <Card className="flex-1 py-4 px-2 ">
      <CardHeader className="flex items-center font-heading">
        <CardTitle className="text-primary text-xl">
          Anotação qualquer (lembrar)
        </CardTitle>
      </CardHeader>
      <CardContent className="w-full flex my-auto">
        Leonard é o portador do grimorio e da mascara de energia
      </CardContent>
    </Card>
  );
}
