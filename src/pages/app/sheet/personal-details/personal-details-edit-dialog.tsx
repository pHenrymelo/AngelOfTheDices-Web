import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';
import { type Resolver, useForm } from 'react-hook-form';
import z from 'zod';
import { getAffinities } from '@/api/data/get-affinities';
import { getCharacterClasses } from '@/api/data/get-classes';
import { getOrigins } from '@/api/data/get-origins';
import { getPaths } from '@/api/data/get-paths';
import { getRanks } from '@/api/data/get-ranks';
import { Button } from '@/components/ui/button';
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Character } from '@/types/character/character';
import type { CharacterUpdateDTO } from '@/types/character/dtos/createCharacterDTO';

const editCharacterDetailsSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'O nome precisa ter no mínimo 3 caracteres.' }),
  age: z.preprocess(
    (val) => (val === '' || val === null ? undefined : val),
    z.coerce
      .number({ error: 'A idade deve ser um número.' })
      .min(16, { message: 'O agente deve ter no mínimo 16 anos.' })
      .optional(),
  ),
  gender: z.string().optional(),
  origin: z.string().min(1, { message: 'Selecione uma origem.' }),
  characterClass: z.string().min(1, { message: 'Selecione uma classe.' }),
  path: z.string().min(1, { message: 'Selecione uma trilha.' }),
  affinity: z.string().min(1, { message: 'Selecione uma afinidade.' }),
  rank: z.string().min(1, { message: 'Selecione uma patente.' }),
  prestigePoints: z.coerce
    .number({ error: 'Prestígio deve ser um número.' })
    .min(0)
    .default(0),
});

type EditDetailsForm = z.infer<typeof editCharacterDetailsSchema>;

interface Props {
  character: Character;
  onUpdate: (dto: CharacterUpdateDTO) => Promise<void>;
  isUpdating: boolean;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function PersonalDetailsEditDialog({
  character,
  onUpdate,
  isUpdating,
  isOpen,
  onOpenChange,
}: Props) {
  const { data: origins, isLoading: isLoadingOrigins } = useQuery({
    queryKey: ['origins'],
    queryFn: getOrigins,
  });
  const { data: classes, isLoading: isLoadingClasses } = useQuery({
    queryKey: ['classes'],
    queryFn: getCharacterClasses,
  });
  const { data: paths, isLoading: isLoadingPaths } = useQuery({
    queryKey: ['paths'],
    queryFn: getPaths,
  });
  const { data: affinities, isLoading: isLoadingAffinities } = useQuery({
    queryKey: ['affinities'],
    queryFn: getAffinities,
  });
  const { data: ranks, isLoading: isLoadingRanks } = useQuery({
    queryKey: ['ranks'],
    queryFn: getRanks,
  });
  const isLoadingData =
    isLoadingOrigins ||
    isLoadingClasses ||
    isLoadingPaths ||
    isLoadingAffinities ||
    isLoadingRanks;

  const form = useForm<EditDetailsForm>({
    resolver: zodResolver(
      editCharacterDetailsSchema,
    ) as Resolver<EditDetailsForm>,
  });

  const selectedClass = form.watch('characterClass');
  const filteredPaths = useMemo(
    () => paths?.filter((path) => path.characterClass === selectedClass) || [],
    [paths, selectedClass],
  );

  useEffect(() => {
    if (isOpen && character) {
      form.reset({
        name: character.name,
        age: character.age ?? undefined,
        gender: character.gender ?? '',
        origin: character.origin.name,
        characterClass: character.characterClass.name,
        path: character.path.name,
        affinity: character.affinity.name,
        rank: character.rank.name,
        prestigePoints: character.prestigePoints,
      });
    }
  }, [isOpen, character, form.reset]);

  const handleFormSubmit = form.handleSubmit(async (data) => {
    const updateDto: CharacterUpdateDTO = {
      ...character,
      ...data,
      origin: data.origin,
      characterClass: data.characterClass,
      path: data.path,
      affinity: data.affinity,
      rank: data.rank,
    };

    await onUpdate(updateDto);
    onOpenChange(false);
  });

  return (
    <DialogContent className="sm:max-w-[625px]">
      <DialogHeader>
        <DialogTitle>Editar Detalhes Pessoais</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form
          id="details-edit-form"
          onSubmit={handleFormSubmit}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4 items-start">
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Idade</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      inputMode="numeric"
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gênero</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="origin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Origem</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={isLoadingData}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {origins?.map((o) => (
                        <SelectItem key={o.name} value={o.name}>
                          {o.displayName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="characterClass"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Classe</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={isLoadingData}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {classes?.map((c) => (
                        <SelectItem key={c.name} value={c.name}>
                          {c.displayName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="path"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trilha</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={isLoadingData || filteredPaths.length === 0}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {filteredPaths.map((p) => (
                        <SelectItem key={p.name} value={p.name}>
                          {p.displayName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="affinity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Afinidade</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={isLoadingData}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {affinities?.map((a) => (
                        <SelectItem key={a.name} value={a.name}>
                          {a.displayName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4 items-start">
            <FormField
              control={form.control}
              name="rank"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Patente</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={isLoadingData}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {ranks?.map((r) => (
                        <SelectItem key={r.name} value={r.name}>
                          {r.displayName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="prestigePoints"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prestígio</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      inputMode="numeric"
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancelar</Button>
        </DialogClose>
        <Button type="submit" form="details-edit-form" disabled={isUpdating}>
          {isUpdating ? 'Salvando...' : 'Salvar'}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
