import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import { ThemeProvider } from './components/theme/theme-provider';
import { AuthProvider } from './contexts/auth-context';
import { queryClient } from './lib/react-query';
import { router } from './routes';

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-center" theme="dark" richColors />
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
