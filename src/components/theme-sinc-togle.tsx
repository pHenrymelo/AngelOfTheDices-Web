import { Label } from '@radix-ui/react-label';
import { useSettings } from '@/contexts/settings-context';
import { Switch } from './ui/switch';

export function ThemeSyncToggle() {
  const { isThemeSyncEnabled, setIsThemeSyncEnabled } = useSettings();

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="theme-sync"
        checked={isThemeSyncEnabled}
        onCheckedChange={setIsThemeSyncEnabled}
      />
      <Label htmlFor="theme-sync">Sincronizar Tema com Afinidade</Label>
    </div>
  );
}
