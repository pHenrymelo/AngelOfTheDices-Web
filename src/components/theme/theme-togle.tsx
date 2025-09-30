import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/components/theme/theme-provider';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('dark-red')}>
          Sangue
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          Morte
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark-violet')}>
          Energia
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark-yellow')}>
          Conhecimento
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark-blue')}>
          Medo
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
