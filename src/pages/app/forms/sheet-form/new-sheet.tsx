import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useMemo } from 'react';
import { type Resolver, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import * as z from 'zod';
import { getAffinities } from '@/api/data/get-affinities';
import { getCharacterClasses } from '@/api/data/get-classes';
import { getOrigins } from '@/api/data/get-origins';
import { getPaths } from '@/api/data/get-paths';
import { getRanks } from '@/api/data/get-ranks';
import { createCharacter } from '@/api/sheet/create-sheet';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { AttributesSection } from './attributes-section';
import { CharacterInfoSection } from './character-info-section';
import { RulesSection } from './rules-section';
import { StatusSection } from './status-section';

const createCharacterSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'O nome precisa ter no mínimo 3 caracteres.' }),
  age: z.coerce
    .number()
    .min(16, { message: 'O agente deve ter no mínimo 16 anos.' })
    .optional(),
  gender: z.string().optional(),

  origin: z.string().min(1, { message: 'Selecione uma origem.' }),
  characterClass: z.string().min(1, { message: 'Selecione uma classe.' }),
  path: z.string().min(1, { message: 'Selecione uma trilha.' }),
  affinity: z.string().min(1, { message: 'Selecione uma afinidade.' }),
  rank: z.string().min(1, { message: 'Selecione uma patente.' }),

  nex: z.coerce
    .number()
    .min(0, { message: 'NEX mínimo é 0%.' })
    .max(99, { message: 'NEX máximo é 99%.' }),
  prestigePoints: z.coerce.number().min(0).default(0),

  strength: z.coerce.number().min(0).default(1),
  agility: z.coerce.number().min(0).default(1),
  intellect: z.coerce.number().min(0).default(1),
  presence: z.coerce.number().min(0).default(1),
  vigor: z.coerce.number().min(0).default(1),

  maxHitPoints: z.coerce.number().min(1).default(1),
  maxEffortPoints: z.coerce.number().min(1).default(1),
  maxSanity: z.coerce.number().min(1).default(1),

  armorDefenseBonus: z.coerce.number().optional().default(0),
  otherDefenseBonus: z.coerce.number().optional().default(0),
});

export type CreateCharacterForm = z.infer<typeof createCharacterSchema>;

export function NewSheet() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const form = useForm<CreateCharacterForm>({
    resolver: zodResolver(
      createCharacterSchema,
    ) as Resolver<CreateCharacterForm>,
    defaultValues: {
      name: '',
      age: 18,
      gender: '',
      nex: 5,
      prestigePoints: 0,
      strength: 1,
      agility: 1,
      intellect: 1,
      presence: 1,
      vigor: 1,
      maxHitPoints: 1,
      maxEffortPoints: 1,
      maxSanity: 1,
      armorDefenseBonus: 0,
      otherDefenseBonus: 0,
    },
  });

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

  const selectedClass = form.watch('characterClass');
  const filteredPaths = useMemo(
    () => paths?.filter((path) => path.characterClass === selectedClass) || [],
    [paths, selectedClass],
  );

  const { mutateAsync: createCharacterFn } = useMutation({
    mutationFn: createCharacter,
    onSuccess: (data) => {
      toast.success(`Agente "${data.name}" recrutado com sucesso!`);
      queryClient.invalidateQueries({ queryKey: ['characters'] });
      navigate(`/sheets/${data.id}`);
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || 'Falha ao criar personagem.',
        );
      }
    },
  });

  async function handleCreateCharacter(data: CreateCharacterForm) {
    try {
      await createCharacterFn(data);
    } catch (err) {
      console.error('Erro na submissão:', err);
    }
  }

  return (
    <div className=" flex flex-col justify-center items-center container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold tracking-tight mb-8">
        Criar Nova Ficha de Agente
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleCreateCharacter)}
          className="space-y-8 flex flex-col justify-center items-center"
        >
          <CharacterInfoSection control={form.control} />
          <RulesSection
            control={form.control}
            errors={form.formState.errors}
            data={{
              origins: origins ?? [],
              classes: classes ?? [],
              paths: filteredPaths,
              affinities: affinities ?? [],
              ranks: ranks ?? [],
            }}
            isLoading={isLoadingData}
          />

          <AttributesSection control={form.control} />
          <StatusSection control={form.control} />
          <Button
            type="submit"
            disabled={form.formState.isSubmitting || isLoadingData}
            size="lg"
            className="w-full md:w-auto"
          >
            {form.formState.isSubmitting ? 'Recrutando...' : 'Recrutar Agente'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
