import { createContext, useContext, useEffect, useState } from 'react';

interface SettingsContextType {
  isThemeSyncEnabled: boolean;
  setIsThemeSyncEnabled: (isEnabled: boolean) => void;
}

const SettingsContext = createContext<SettingsContextType | null>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [isThemeSyncEnabled, setIsThemeSyncEnabled] = useState<boolean>(() => {
    const storedValue = localStorage.getItem('aotd-themeSyncEnabled');
    return storedValue !== null ? JSON.parse(storedValue) : true;
  });

  useEffect(() => {
    localStorage.setItem(
      'aotd-themeSyncEnabled',
      JSON.stringify(isThemeSyncEnabled),
    );
  }, [isThemeSyncEnabled]);

  return (
    <SettingsContext.Provider
      value={{ isThemeSyncEnabled, setIsThemeSyncEnabled }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === null) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
