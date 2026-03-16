import { HeroSection } from './_components/sections/HeroSection';
import { IdentitySection } from './_components/sections/IdentitySection';
import { ProcessSection } from './_components/sections/ProcessSection';
import { GreenCoffeeSection } from './_components/sections/GreenCoffeeSection';
import { RoastedCoffeeSection } from './_components/sections/RoastedCoffeeSection';
import { ConsultingSection } from './_components/sections/ConsultingSection';
import { JournalSection } from './_components/sections/JournalSection';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <IdentitySection />
      <GreenCoffeeSection />
      <RoastedCoffeeSection />
      <ProcessSection />
      <ConsultingSection />
      <JournalSection />
    </main>
  );
}
