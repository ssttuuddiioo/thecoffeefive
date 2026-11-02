import { getDictionary } from '@/config/dictionaries';
import type { Locale } from '@/config/i18n';
import { ProcessPageContent } from './ProcessPageContent';

export default function ProcessPage({ params }: { params: { locale: string } }) {
  return <ProcessPageContent c={getDictionary(params.locale as Locale).processPage} />;
}
