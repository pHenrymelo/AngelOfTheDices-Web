import { authenticate } from '@/api/sign-in';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/auth-context';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router';
import { toast } from 'sonner';
import { z } from 'zod';

const signInForm = z.object({
  email: z.email(),
  password: z.string(),
});

type SignInForm = z.infer<typeof signInForm>;

export function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { login } = useAuth();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>({
    defaultValues: {
      email: searchParams.get('email') ?? '',
    },
  });

  const { mutateAsync: authenticateFn } = useMutation({
    mutationFn: authenticate,
  });

  async function handleSignIn(data: SignInForm) {
    try {
      const response = await authenticateFn(data);
      login(response.data.accessToken);
      toast.success('Autenticado com sucesso!');
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch (error) {
      if (isAxiosError(error)) {
        if (error?.response?.status === 401) {
          toast.error('Credenciais inválidas.');
        } else {
          toast.error('Ocorrou um erro inesperado. Tente novamente.');
        }
      }
    }
  }

  return (
    <div className="p-8">
      <div className="w-[350px] flex flex-col justify-center gap-6">
        <h1 className="text-2xl font-semibold tracking-tight mx-auto">
          Acessar
        </h1>
        <p></p>
      </div>
      <form
        onSubmit={handleSubmit(handleSignIn)}
        className="flex flex-col space-y-4"
      >
        <div className="flex flex-col gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register('email')} />
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="password">Senha</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
            />
            <Button
              type="button"
              variant={'ghost'}
              size={'icon'}
              className="absolute right-0 top-1/2 -translate-y-1/2 hover:cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <Eye className="size-4" />
              ) : (
                <EyeOff className="sise-4" />
              )}
            </Button>
          </div>
        </div>
        <div className="flex flex-col mt-3 gap-3">
          <Button disabled={isSubmitting} className="cursor-pointer">
            Rolar o dado!
          </Button>
          <Button asChild variant={'link'}>
            <Link to="/sign-up">Ainda não tem uma conta? Registrar</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}
