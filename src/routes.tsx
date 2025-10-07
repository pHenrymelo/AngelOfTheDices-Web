import { createBrowserRouter } from 'react-router';
import { ProtectedRoute } from './components/auth/protected-route';
import { NotFound } from './pages/404';
import { Dashboard } from './pages/app/dashboard/dashboard';
import { Dices } from './pages/app/dices/dices';
import { Sheet } from './pages/app/sheet/sheet';
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
      { path: '/', element: <Dashboard /> },
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
