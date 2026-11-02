import { getSiteCopy } from '@/sanity/copy';
import type { Locale } from '@/config/i18n';
import { ProcessPageContent } from './ProcessPageContent';

export default async function ProcessPage({ params }: { params: { locale: string } }) {
  const copy = await getSiteCopy(params.locale as Locale);
  return <ProcessPageContent c={copy.processPage} />;
}
