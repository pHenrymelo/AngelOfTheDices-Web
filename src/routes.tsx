import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from './components/auth/protected-route';
import { NotFound } from './pages/404';
import { Dices } from './pages/app/dices/dices';
import { Sheet } from './pages/app/sheet/sheet';
import { Sheets } from './pages/app/sheets/sheets';
import { SignIn } from './pages/auth/sign-in';
import { SignUp } from './pages/auth/sign-up';
import { AppLayout } from './pages/layouts/app';
import { AuthLayout } from './pages/layouts/auth';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
    children: [
      { path: '/', element: <Sheets /> },
      { path: '/sheets', element: <Sheet /> },
      { path: '/dices', element: <Dices /> },
    ],
  },

  {
    element: <AuthLayout />,
    children: [
      { path: '/sign-in', element: <SignIn /> },
      { path: '/sign-up', element: <SignUp /> },
    ],
  },
]);
