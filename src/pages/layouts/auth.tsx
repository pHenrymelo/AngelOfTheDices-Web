import { Outlet } from 'react-router';
import Logo from '@/assets/logo-violet.png';
import { Card } from '@/components/ui/card';

export function AuthLayout() {
  return (
    <div className=" min-h-screen flex flex-col justify-between items-center antialiased py-10">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col justify-center items-center">
          <img
            className="w-60 h-w-60 col-start-1 row-start-1 opacity-80"
            src={Logo}
            alt="Dice with wings"
          />
          <h1 className="text-3xl font-heading font-bold">
            Angel of the <span className="text-primary">Dices</span>
          </h1>
        </div>
        <Card className="flex flex-col items-center justify-center bg-background px-8">
          <Outlet />
        </Card>
      </div>
      <footer className="text-sm">
        Angel of the Dices &copy; KaiserInc. - {new Date().getFullYear()}
      </footer>
    </div>
  );
}
