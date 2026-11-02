import { getSiteCopy } from '@/sanity/copy';
import { siteConfig } from '@/config/site';

export default async function ContactPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as import('@/config/i18n').Locale;
  const c = (await getSiteCopy(locale)).contact;

  return (
    <main className="pt-20 md:pt-24">
      <div className="container-site section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Info */}
          <div>
            <p className="text-[10px] tracking-[0.15em] uppercase text-coffee-400 mb-4">{c.eyebrow}</p>
            <h1 className="text-3xl md:text-4xl font-bold text-coffee-white mb-6 leading-tight">
              {c.heading}
            </h1>
            <p className="text-sm text-coffee-400 mb-10 leading-relaxed max-w-md">
              {c.intro}
            </p>

            <div className="space-y-6 mb-10">
              <div>
                <h3 className="text-[10px] tracking-[0.15em] uppercase text-coffee-400 mb-2">{c.emailLabel}</h3>
                <a href={`mailto:${siteConfig.email}`} className="text-sm text-coffee-white hover:text-coffee-200 transition-colors inline-flex items-center min-h-[44px]">
                  {siteConfig.email}
                </a>
              </div>
              <div>
                <h3 className="text-[10px] tracking-[0.15em] uppercase text-coffee-400 mb-2">{c.whatsappLabel}</h3>
                <a
                  href={`https://wa.me/${siteConfig.whatsapp.number}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-coffee-white hover:text-coffee-200 transition-colors inline-flex items-center min-h-[44px]"
                >
                  {siteConfig.whatsapp.display}
                </a>
              </div>
              <div>
                <h3 className="text-[10px] tracking-[0.15em] uppercase text-coffee-400 mb-2">{c.labLabel}</h3>
                <p className="text-sm text-coffee-white">{c.labValue}</p>
              </div>
              <div>
                <h3 className="text-[10px] tracking-[0.15em] uppercase text-coffee-400 mb-2">{c.instagramLabel}</h3>
                <a href="https://www.instagram.com/thecoffeefive/" target="_blank" rel="noopener noreferrer" className="text-sm text-coffee-white hover:text-coffee-200 transition-colors inline-flex items-center min-h-[44px]">
                  @coffeefive
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-coffee-900 rounded-md p-6 md:p-8">
            <h2 className="text-lg font-bold text-coffee-white mb-6">{c.formHeading}</h2>
            <form action={`https://formsubmit.co/${siteConfig.email}`} method="POST" className="space-y-5">
              <div>
                <label className="block text-[10px] tracking-[0.15em] uppercase text-coffee-400 mb-2">{c.nameLabel}</label>
                <input type="text" name="name" required className="w-full min-h-[44px] bg-transparent border border-coffee-700 rounded-sm px-3 text-sm text-coffee-white placeholder:text-coffee-700 focus:outline-none focus:border-coffee-white transition-colors" placeholder={c.namePlaceholder} />
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.15em] uppercase text-coffee-400 mb-2">{c.emailLabel}</label>
                <input type="email" name="email" required className="w-full min-h-[44px] bg-transparent border border-coffee-700 rounded-sm px-3 text-sm text-coffee-white placeholder:text-coffee-700 focus:outline-none focus:border-coffee-white transition-colors" placeholder={c.emailPlaceholder} />
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.15em] uppercase text-coffee-400 mb-2">{c.subjectLabel}</label>
                <select name="subject" className="w-full min-h-[44px] bg-transparent border border-coffee-700 rounded-sm px-3 text-sm text-coffee-400 focus:outline-none focus:border-coffee-white transition-colors">
                  <option value="">{c.options.empty}</option>
                  <option value="green">{c.options.green}</option>
                  <option value="roasted">{c.options.roasted}</option>
                  <option value="consulting">{c.options.consulting}</option>
                  <option value="training">{c.options.training}</option>
                  <option value="other">{c.options.other}</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.15em] uppercase text-coffee-400 mb-2">{c.messageLabel}</label>
                <textarea name="message" rows={5} required className="w-full bg-transparent border border-coffee-700 rounded-sm px-3 py-2 text-sm text-coffee-white placeholder:text-coffee-700 focus:outline-none focus:border-coffee-white transition-colors resize-none" placeholder={c.messagePlaceholder} />
              </div>
              <button type="submit" className="w-full py-3 bg-coffee-white text-coffee-black text-[12px] tracking-[0.1em] uppercase rounded-sm font-medium hover:bg-coffee-200 transition-colors min-h-[44px]">
                {c.submit}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
