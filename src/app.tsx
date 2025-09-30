import { RouterProvider } from 'react-router';
import { Toaster } from 'sonner';
import { ThemeProvider } from './components/theme/theme-provider';
import { router } from './routes';

function App() {
  return (
    <ThemeProvider>
      <Toaster position="top-center" />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
