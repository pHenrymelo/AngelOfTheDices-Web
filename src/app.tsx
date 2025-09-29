import { RouterProvider } from 'react-router';
import { ThemeProvider } from './components/theme/theme-provider';
import { router } from './routes';

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
