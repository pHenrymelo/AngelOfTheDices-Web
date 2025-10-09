import type { Control, FieldErrors } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type {
  Affinity,
  CharacterClass,
  Origin,
  Path,
  Rank,
} from '@/types/sheet/sheet-rules';
import type { CreateCharacterForm } from './new-sheet';

interface Props {
  control: Control<CreateCharacterForm>;
  errors: FieldErrors<CreateCharacterForm>;
  data: {
    origins: Origin[];
    classes: CharacterClass[];
    paths: Path[];
    affinities: Affinity[];
    ranks: Rank[];
  };
  isLoading: boolean;
}

export function RulesSection({ control, data, isLoading }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Arquétipo do Agente</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <FormField
          control={control}
          name="origin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Origem</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={isLoading}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {data.origins?.map((o) => (
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
          control={control}
          name="characterClass"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Classe</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={isLoading}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {data.classes?.map((o) => (
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
          control={control}
          name="path"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Trilha</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={isLoading || data.paths.length === 0}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {data.paths?.map((o) => (
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
          control={control}
          name="affinity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Afinidade</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={isLoading}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {data.affinities?.map((o) => (
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
          control={control}
          name="rank"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Patente</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={isLoading}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {data.ranks?.map((o) => (
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
      </CardContent>
    </Card>
  );
}
