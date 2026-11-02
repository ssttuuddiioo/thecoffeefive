import Image from 'next/image';
import { redirect } from 'next/navigation';
import { withLocale, type Locale } from '@/config/i18n';
import { buildRoastedWhatsAppUrl } from '@/lib/whatsapp';
import { getSiteCopy } from '@/sanity/copy';
import { getRoastedCoffeeBySlug, isCatalogOpen } from '@/sanity/fetch';

type Props = { params: { locale: string; slug: string } };

export default async function RoastedCoffeePage({ params }: Props) {
  const locale = params.locale as Locale;
  const [open, product, copy] = await Promise.all([
    isCatalogOpen(),
    getRoastedCoffeeBySlug(params.slug, locale),
    getSiteCopy(locale),
  ]);
  // While the catalog is closed, or for a hidden product, the page is Próximamente.
  if (!open || !product) redirect(withLocale(locale, '/tostado'));

  const c = copy.tostado;
  const tags = [product.origin, product.proceso, product.tueste].filter(Boolean);
  const hasBrew = product.brew.ratio || product.brew.temperatura || product.brew.metodos.length > 0;

  return (
    <main className="pt-20 md:pt-24">
      <div className="container-site section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Images */}
          <div className="grid grid-cols-1 gap-3">
            <div className="relative aspect-square rounded-md overflow-hidden">
              <Image src={product.img} alt={product.variedad} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" priority />
            </div>
            <div className="relative aspect-square rounded-md overflow-hidden">
              <Image src={product.imgBack} alt={product.variedad} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
          </div>

          {/* Product info */}
          <div>
            <p className="text-[10px] tracking-[0.15em] uppercase text-coffee-400 mb-3">{c.eyebrow}</p>
            <h1 className="text-2xl md:text-3xl font-bold text-coffee-white mb-2">{product.variedad}</h1>
            {product.fermentacion && <p className="text-base text-coffee-400 italic mb-1">{product.fermentacion}</p>}
            {product.perfil && <p className="text-base text-coffee-400 italic mb-4">{product.perfil}</p>}
            <p className="text-xl font-medium text-coffee-white mb-6">
              {[product.price, product.weight].filter(Boolean).join(' · ')}
            </p>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-6">
                {tags.map((tag) => (
                  <span key={tag} className="tag-pill">{tag}</span>
                ))}
              </div>
            )}

            <a
              href={buildRoastedWhatsAppUrl(product)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full py-3 bg-coffee-white text-coffee-black text-[12px] tracking-[0.1em] uppercase rounded-sm font-medium hover:bg-coffee-200 transition-colors min-h-[44px] mb-8"
            >
              {c.buy}
            </a>

            <div className="border-t border-coffee-800 pt-6">
              <h2 className="text-sm font-medium text-coffee-white mb-2">{c.aboutTitle}</h2>
              <p className="text-sm text-coffee-400 leading-relaxed">{product.descripcion || c.aboutBody}</p>
            </div>

            {hasBrew && (
              <div className="border-t border-coffee-800 pt-6 mt-6">
                <h2 className="text-sm font-medium text-coffee-white mb-4">{c.prep}</h2>
                <div className="grid grid-cols-3 gap-4 mb-5">
                  {[
                    { label: c.ratio, value: product.brew.ratio },
                    { label: c.temperatura, value: product.brew.temperatura },
                    { label: c.metodos, value: product.brew.metodos.join(' · ') },
                  ].map((item) => (
                    <div key={item.label}>
                      <p className="text-[10px] tracking-[0.1em] uppercase text-coffee-400 mb-1">{item.label}</p>
                      <p className="text-sm text-coffee-white font-medium">{item.value}</p>
                    </div>
                  ))}
                </div>
                {product.brew.tip && (
                  <div className="bg-coffee-800/40 rounded-md p-4">
                    <p className="text-[10px] tracking-[0.1em] uppercase text-coffee-400 mb-2">{c.baristaTip}</p>
                    <p className="text-sm text-coffee-300 leading-relaxed italic">{product.brew.tip}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
