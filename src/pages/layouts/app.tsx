import { Outlet } from 'react-router';
import { Header } from '@/components/header';

export function AppLayout() {
  return (
    <div className="flex flex-col h-screen antialiased pt-16">
      <Header />
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-8 pt-6">
        <Outlet />
      </div>
    </div>
  );
}
