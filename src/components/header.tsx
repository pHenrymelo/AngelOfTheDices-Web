import Logo from '@/assets/logo-violet.png';
import { Dices, FileSpreadsheet } from 'lucide-react';
import { AccountMenu } from './account-menu';
import { NavLink } from './nav-link';
import { ThemeToggle } from './theme/theme-togle';

export function Header() {
  return (
    <div className="fixed top-0 left-0 z-50 w-full border-b bg-primary/5 backdrop-blur-xl">
      <div className="flex h-16 items-center gap-3 px-3 md:gap-6 md:px-6">
        <img
          className="size-10 md:size-14"
          src={Logo}
          alt="a dice with wings"
        />
        <nav className="flex items-center space-x-4 lg:space-x-6 border-l h-full px-4">
          <NavLink to="/">
            <FileSpreadsheet className="h-4 w-4" />
            Fichas
          </NavLink>
          <NavLink to="/dices">
            <Dices className="h-4 w-4" />
            Dados
          </NavLink>
        </nav>
        <div className="flex ml-auto items-center gap-2">
          <ThemeToggle />
          <AccountMenu />
        </div>
      </div>
    </div>
  );
}
