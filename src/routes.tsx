import { createBrowserRouter } from 'react-router';
import { NotFound } from './pages/404';
import { Dashboard } from './pages/app/dashboard/dashboard';
import { Dices } from './pages/app/dices/dices';
import { SignIn } from './pages/auth/sign-in';
import { SignUp } from './pages/auth/sign-up';
import { AppLayout } from './pages/layouts/app';
import { AuthLayout } from './pages/layouts/auth';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: '/dices', element: <Dices /> },
    ],
  },

  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: '/sign-in', element: <SignIn /> },
      { path: '/sign-up', element: <SignUp /> },
    ],
  },
]);
