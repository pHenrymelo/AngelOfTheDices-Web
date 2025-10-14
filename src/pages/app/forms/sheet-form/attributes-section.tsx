import { useEffect } from 'react';
import type { Control, UseFormSetValue } from 'react-hook-form';
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
  setValue: UseFormSetValue<CreateCharacterForm>;
  selectedClass?: string;
}

export function AttributesSection({ control, setValue, selectedClass }: Props) {
  useEffect(() => {
    if (selectedClass === 'SURVIVOR') {
      setValue('nex', 0, { shouldValidate: true });
    }
  }, [selectedClass, setValue]);

  return (
    <Card className="bg-background w-full md:w-2/3">
      <CardHeader>
        <CardTitle>Atributos e NEX</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <div className="my-auto mx-auto ">
          <FormField
            control={control}
            name="nex"
            render={({ field }) => (
              <FormItem>
                <FormLabel>NEX</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    disabled={selectedClass === 'SURVIVOR'}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="my-auto mx-auto space-y-2 ">
          <FormField
            control={control}
            name="strength"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Força</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === '' ? 0 : +e.target.value,
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="agility"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Agilidade</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === '' ? 0 : +e.target.value,
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="intellect"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Intelecto</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === '' ? 0 : +e.target.value,
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="presence"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Presença</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === '' ? 0 : +e.target.value,
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="vigor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vigor</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === '' ? 0 : +e.target.value,
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
