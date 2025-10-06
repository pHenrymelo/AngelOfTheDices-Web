import { Abilities } from './abilities/abilities';
import { Attributes } from './attributes/attributes';
import { Combat } from './combat/combat';
import { Expertises } from './expertise/expertises';
import { FixedExpertise } from './expertise/fixed-expertise';
import { Inventory } from './inventory/inventory';
import { PersonalDetails } from './personal-details';
import { Rituals } from './rituals/rituals';
import { SheetStatus } from './status/sheet-status';

export function Sheet() {
  return (
    <div className=" container mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="flex flex-col lg:flex-row gap-4">
        <SheetStatus />
        <PersonalDetails />
      </div>
      <div className="flex flex-col lg:flex-row gap-4">
        <Attributes />
        <FixedExpertise />
      </div>
      <Combat />
      <Inventory />
      <Expertises />
      <div className="flex flex-col lg:flex-row gap-4">
        <Abilities />
        <Rituals />
      </div>
    </div>
  );
}
