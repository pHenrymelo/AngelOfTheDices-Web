import type { Control } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { CreateCharacterForm } from './new-sheet';

interface Props {
  control: Control<CreateCharacterForm>;
}

export function StatusSection({ control }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Status de Combate</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <FormField
          control={control}
          name="maxHitPoints"
          render={({ field }) => (
            <FormItem>
              <FormLabel>PV (Máx)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) =>
                    field.onChange(e.target.value === '' ? 1 : +e.target.value)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="maxEffortPoints"
          render={({ field }) => (
            <FormItem>
              <FormLabel>PE (Máx)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) =>
                    field.onChange(e.target.value === '' ? 1 : +e.target.value)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="maxSanity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SAN (Máx)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) =>
                    field.onChange(e.target.value === '' ? 1 : +e.target.value)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="armorDefenseBonus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bônus de Armadura</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) =>
                    field.onChange(e.target.value === '' ? 0 : +e.target.value)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="otherDefenseBonus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Outros Bônus (Defesa)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) =>
                    field.onChange(e.target.value === '' ? 0 : +e.target.value)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
