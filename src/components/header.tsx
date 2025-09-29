import Logo from '@/assets/logo-violet.png';
import { Dices, FileSpreadsheet, Home } from 'lucide-react';
import { NavLink } from './nav-link';
import { ThemeToggle } from './theme/theme-togle';

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <div className="w-12 h-12 ">
          <img src={Logo} alt="a dice with wings" />
        </div>
        <nav className="flex items-center space-x-4 lg:space-x-6 border-l h-full px-4">
          <NavLink to="/">
            <Home className="h-4 w-4" />
            Home
          </NavLink>
          <NavLink to="/data">
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
        </div>
      </div>
    </div>
  );
}
