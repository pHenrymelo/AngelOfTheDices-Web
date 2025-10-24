import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import type { CharacterAttributes } from '@/types/character/character';
import type { CharacterExpertise } from '@/types/character/expertise';
import { ExpertiseItem } from './expertise-item';

interface ExpertisesProps {
  expertises: CharacterExpertise[];
  attributes: CharacterAttributes;
  onRoll: (params: {
    expertiseName: string;
    totalBonus: number;
    attributeValue: number;
  }) => void;
  onUpdate: (updatedExpertise: CharacterExpertise) => void;
  isSaving: boolean;
}

export function Expertises({
  attributes,
  expertises,
  onRoll,
  onUpdate,
  isSaving,
}: ExpertisesProps) {
  const [filter, setFilter] = useState('');

  const filteredExpertises = useMemo(() => {
    if (!filter) {
      return expertises;
    }
    return expertises.filter((expertise) => {
      return expertise.expertiseName.displayName
        .toLowerCase()
        .includes(filter.toLowerCase());
    });
  }, [expertises, filter]);
  return (
    <Card className="flex-1 p-4">
      <CardTitle className="flex justify-center items-center text-xl border-b pb-2 font-heading">
        PERÍCIAS
      </CardTitle>

      <div className="flex mt-4 w-full md:w-1/2 mx-auto">
        <InputGroup>
          <InputGroupInput
            placeholder="Filtrar perícias..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
      </div>
      <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 p-0 md:px-4 gap-4">
        {filteredExpertises.map((expertise) => (
          <ExpertiseItem
            key={expertise.expertiseName.name}
            expertise={expertise}
            attributes={attributes}
            onRoll={onRoll}
            onUpdate={onUpdate}
            isSaving={isSaving}
          />
        ))}
      </CardContent>
    </Card>
  );
}
