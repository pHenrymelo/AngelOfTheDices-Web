import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';
import { z } from 'zod';
import { registerUser } from '@/api/sign-up';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const signUpForm = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string(),
});

type SignUpForm = z.infer<typeof signUpForm>;

export function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpForm>();

  const { mutateAsync: registerUserFn } = useMutation({
    mutationFn: registerUser,
  });

  const navigate = useNavigate();

  async function handleSignUp(data: SignUpForm) {
    try {
      await registerUserFn({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      toast.success('Novo usuario registrado!', {
        action: {
          label: 'Login',
          onClick: () => navigate(`/sign-in?email=${data.email}`),
        },
      });
    } catch {
      toast.error('Erro ao registrar usuario.');
    }
  }

  return (
    <div className="p-8">
      <div className="w-[350px] flex flex-col justify-center gap-6">
        <h1 className="text-2xl font-semibold tracking-tight mx-auto">
          Registrar
        </h1>
        <p></p>
      </div>
      <form
        onSubmit={handleSubmit(handleSignUp)}
        className="flex flex-col space-y-4"
      >
        <div className="flex flex-col gap-3">
          <Label htmlFor="name">Nome</Label>
          <Input id="name" type="name" {...register('name')} />
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register('email')} />
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="password">Senha</Label>
          <Input id="password" type="password" {...register('password')} />
        </div>
        <Button disabled={isSubmitting} className="cursor-pointer">
          Create Account
        </Button>
        <Button asChild variant={'link'}>
          <Link to="/sign-in">Ja tem uma conta? Login.</Link>
        </Button>
      </form>
    </div>
  );
}
