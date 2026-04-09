import type { Metadata } from 'next';
import { ComingSoonContent } from './ComingSoonContent';

export const metadata: Metadata = {
  title: 'Próximamente',
};

export default function ComingSoonPage() {
  return <ComingSoonContent />;
}
