import otherSide from '@/assets/other_side.png';
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
        <Button
          className="border border-primary/50 bg-primary/5"
          variant="outline"
          size="icon"
        >
          <img src={otherSide} className="size-6" alt="" />
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
