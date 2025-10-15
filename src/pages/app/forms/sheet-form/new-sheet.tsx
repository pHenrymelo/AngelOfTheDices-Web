import { createCharacter } from '@/api/sheet/create-sheet';
import { getGameRules } from '@/api/sheet/get-game-rules';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useMemo } from 'react';
import { type Resolver, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import * as z from 'zod';
import { AttributesSection } from './attributes-section';
import { CharacterInfoSection } from './character-info-section';
import { RulesSection } from './rules-section';

const createCharacterSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'O nome precisa ter no mínimo 3 caracteres.' }),
  age: z.preprocess(
    (val) => (val === '' || val === null ? undefined : val),
    z.coerce.number({ error: 'A idade deve ser um número.' }).optional(),
  ),
  gender: z.string().optional(),

  origin: z.string().min(1, { message: 'Selecione uma origem.' }),
  characterClass: z.string().min(1, { message: 'Selecione uma classe.' }),
  path: z.string().min(1, { message: 'Selecione uma trilha.' }),
  affinity: z.string().min(1, { message: 'Selecione uma afinidade.' }),
  rank: z.string().min(1, { message: 'Selecione uma patente.' }),

  nex: z.coerce
    .number({ error: 'NEX deve ser um número.' })
    .min(0, { message: 'NEX mínimo é 0%.' })
    .max(99, { message: 'NEX máximo é 99%.' }),
  prestigePoints: z.coerce
    .number({ error: 'Pontos de Prestígio deve ser um número.' })
    .min(0)
    .default(0),
  useDeterminationPoints: z.boolean().default(false),
  strength: z.coerce
    .number({ error: 'Força deve ser um número.' })
    .min(0)
    .default(1),
  agility: z.coerce
    .number({ error: 'Agilidade deve ser um número.' })
    .min(0)
    .default(1),
  intellect: z.coerce
    .number({ error: 'Intelecto deve ser um número.' })
    .min(0)
    .default(1),
  presence: z.coerce
    .number({ error: 'Presença deve ser um número.' })
    .min(0)
    .default(1),
  vigor: z.coerce
    .number({ error: 'Vigor deve ser um número.' })
    .min(0)
    .default(1),

  armorDefenseBonus: z.coerce
    .number({ error: 'Bônus de Armadura deve ser um número.' })
    .optional()
    .default(0),
  otherDefenseBonus: z.coerce
    .number({
      error: 'Outros Bônus de Defesa deve ser um número.',
    })
    .optional()
    .default(0),
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
      useDeterminationPoints: false,
      nex: 5,
      prestigePoints: 0,
      strength: 1,
      agility: 1,
      intellect: 1,
      presence: 1,
      vigor: 1,
      armorDefenseBonus: 0,
      otherDefenseBonus: 0,
    },
  });

  const { data: gameRules, isLoading: isLoadingData } = useQuery({
    queryKey: ['gameRules'],
    queryFn: getGameRules,
    staleTime: Infinity,
  });

  const selectedClass = form.watch('characterClass');
  const filteredPaths = useMemo(
    () =>
      gameRules?.paths.filter(
        (path) => path.characterClass === selectedClass,
      ) || [],
    [gameRules?.paths, selectedClass],
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
          className="space-y-8 w-full  flex flex-col justify-center items-center"
        >
          <CharacterInfoSection control={form.control} />
          <RulesSection
            control={form.control}
            data={{
              origins: gameRules?.origins ?? [],
              classes: gameRules?.classes ?? [],
              paths: filteredPaths,
              affinities: gameRules?.affinities ?? [],
              ranks: gameRules?.ranks ?? [],
            }}
            isLoading={isLoadingData}
          />
          <AttributesSection
            control={form.control}
            setValue={form.setValue}
            selectedClass={selectedClass}
          />
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
