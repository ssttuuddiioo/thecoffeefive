import { HeroSection } from './_components/sections/HeroSection';
import { SignupSection } from './_components/sections/SignupSection';
import { IdentitySection } from './_components/sections/IdentitySection';
import { ProcessSection } from './_components/sections/ProcessSection';
import { ConsultingSection } from './_components/sections/ConsultingSection';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <SignupSection />
      <IdentitySection />
      <ProcessSection />
      <ConsultingSection />
    </main>
  );
}
