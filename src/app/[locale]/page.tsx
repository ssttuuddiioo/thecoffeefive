import { HeroSection } from '@/app/_components/sections/HeroSection';
import { SignupSection } from '@/app/_components/sections/SignupSection';
import { IdentitySection } from '@/app/_components/sections/IdentitySection';
import { ProcessSection } from '@/app/_components/sections/ProcessSection';
import { ConsultingSection } from '@/app/_components/sections/ConsultingSection';

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
