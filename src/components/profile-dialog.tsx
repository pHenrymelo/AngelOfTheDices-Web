import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import { updateProfile } from '@/api/user/edit-user-profile';
import { getProfile } from '@/api/user/get-user-profile';
import { Button } from './ui/button';
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';

const profileSchema = z.object({
  name: z.string().min(3),
});

type ProfileSchema = z.infer<typeof profileSchema>;

export function ProfileDialog() {
  const queryClient = useQueryClient();

  const { data: profile } = useQuery({
    queryFn: getProfile,
    queryKey: ['profile'],
    staleTime: Infinity,
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    if (profile) {
      reset({ name: profile.name });
    }
  }, [profile, reset]);

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      toast.success('Perfil atualizado com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: () => {
      toast.error('Falha ao atualizar o perfil, tente novamente.');
    },
  });

  async function handleUpdateProfile(data: ProfileSchema) {
    await updateProfileFn({ name: data.name });
  }

  return (
    <DialogContent>
      <DialogHeader>Profile</DialogHeader>
      <form className="space-y-3" onSubmit={handleSubmit(handleUpdateProfile)}>
        <div className="space-y-4 px-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="name">
              Name
            </Label>
            <Input className="col-span-3" id="name" {...register('name')} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="name">
              Email
            </Label>
            <span className="col-span-3 text-muted-foreground">
              {profile?.email}
            </span>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant={'ghost'}>
              Exit
            </Button>
          </DialogClose>
          <Button type="submit" variant={'default'} disabled={isSubmitting}>
            Save
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
