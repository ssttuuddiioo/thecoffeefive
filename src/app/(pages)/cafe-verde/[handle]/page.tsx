import { notFound } from 'next/navigation';
import Image from 'next/image';
import { greenLotDetailSlug, mockGreenLots, procesoColorMap } from '@/lib/mock-data';
import { buildWhatsAppUrl, buildEnquiryEmailUrl } from '@/lib/whatsapp';
import { ColombiaMap } from '@/app/_components/ColombiaMap';
import { FincaSlideshow } from '@/app/_components/FincaSlideshow';

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-sm md:text-base lg:text-lg font-semibold text-coffee-black tracking-wide mb-6">
      {children}
    </h2>
  );
}

function Divider() {
  return <div className="border-t border-gray-200" />;
}

type Props = { params: { handle: string } };

export function generateStaticParams() {
  return mockGreenLots.map((l) => ({ handle: greenLotDetailSlug(l.name) }));
}

export default function GreenCoffeeLotPage({ params }: Props) {
  const lot = mockGreenLots.find((l) => greenLotDetailSlug(l.name) === params.handle);
  if (!lot) notFound();
  const procesoColor = procesoColorMap[lot.proceso] || lot.color;

  const lotInfo = {
    name: lot.name,
    variedad: lot.variedad,
    proceso: lot.proceso,
    finca: lot.finca,
    altura: lot.altura,
    puntaje: lot.puntaje,
    price: lot.price,
    quantity: lot.weight,
    ubicacion: lot.ubicacion,
  };

  const ubicacionLabel: Record<string, string> = {
    colombia: 'En Colombia',
    en_transito: 'En tránsito',
    landed_us: 'Landed in USA',
  };

  return (
    <main className="bg-white min-h-screen">
      <div className="pb-24 -mt-20 md:-mt-24">
        {/* Hero — full-bleed photo with title overlay */}
        <div className="relative w-full h-screen mb-12 md:mb-16">
          <FincaSlideshow images={lot.photos} alt={lot.name} fullBleed />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 lg:px-20 pb-10 md:pb-16">
            {/* Variedad + Proceso */}
            <div className="flex flex-wrap items-end gap-4 mb-4 md:mb-6">
              <span className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-none tracking-tight">
                {lot.variedad}
              </span>
              <span className="px-5 md:px-8 py-2 md:py-3 text-lg md:text-2xl lg:text-3xl font-bold text-white border-2 border-white rounded-full">
                {lot.proceso}
              </span>
            </div>
            {/* Description */}
            <p className="text-lg md:text-xl lg:text-2xl text-white/70 leading-relaxed max-w-3xl mb-4">
              {lot.notaFinca}
            </p>
            {/* Origin details */}
            <p className="text-sm md:text-base lg:text-lg text-white/80 tracking-wide mb-5">
              {lot.region}, {'municipio' in lot ? lot.municipio : lot.finca} · {lot.altura} masl
            </p>
            <div className="flex items-center gap-2">
              <a
                href={buildWhatsAppUrl(lotInfo)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 text-[10px] tracking-[0.1em] uppercase font-semibold text-white border border-white/60 rounded-full hover:bg-white/10 transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Enquire
              </a>
              <a
                href={buildEnquiryEmailUrl(lotInfo)}
                className="flex items-center gap-1.5 px-4 py-2 text-[10px] tracking-[0.1em] uppercase font-semibold text-white/70 border border-white/40 rounded-full hover:bg-white/10 transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4l-10 8L2 4"/></svg>
                Email
              </a>
            </div>
          </div>
        </div>

        {/* Proceso + Perfil — side by side */}
        <div className="max-w-5xl mx-auto px-5 md:px-8 mb-12 md:mb-16">
          <div className="relative aspect-[16/7] rounded-lg overflow-hidden mb-10">
            <Image src={lot.photos[lot.photos.length > 1 ? 1 : 0]} alt={`${lot.name} — proceso`} fill className="object-cover" sizes="100vw" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            {/* Proceso */}
            <div>
              <SectionHeading>Proceso</SectionHeading>
              <div className="mb-6 min-h-[3rem] flex flex-col justify-end">
                <p className="text-[10px] tracking-[0.15em] uppercase text-gray-400 mb-1.5">Método</p>
                <p className="text-sm font-semibold text-coffee-black">{lot.proceso}</p>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Cereza seleccionada a mano en punto óptimo de maduración. Fermentación controlada de 48–60 horas con monitoreo de temperatura. Secado en camas elevadas durante 15–20 días hasta alcanzar 10.5–11% de humedad. Todo el proceso supervisado por el equipo de Coffee Five.
              </p>
            </div>
            {/* Perfil */}
            <div>
              <SectionHeading>Perfil</SectionHeading>
              <div className="flex flex-wrap gap-2 mb-6 min-h-[3rem] items-end">
                {['Frutas tropicales', 'Cítrico brillante', 'Final limpio'].map((note) => (
                  <span key={note} className="text-xs px-3 py-1 rounded-full border border-gray-300 text-coffee-black">{note}</span>
                ))}
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Notas de frutas tropicales, acidez cítrica brillante, cuerpo medio con un final limpio y prolongado. Un café con carácter que destaca en métodos de filtro y también en espresso. Complejidad que evoluciona a medida que la taza se enfría.
              </p>
            </div>
          </div>
        </div>

        {/* Origen — Map + Quick Facts Grid */}
        <div className="bg-white mb-12 md:mb-16">
          <div className="max-w-5xl mx-auto px-5 md:px-8">
            {/* Breadcrumb */}
            <p className="text-[10px] tracking-[0.2em] uppercase text-gray-500 mb-8">
              Origin{' '}
              <span className="mx-1.5 text-gray-400">&gt;</span>{' '}
              {lot.region}
              <span className="mx-1.5 text-gray-400">&gt;</span>{' '}
              <span className="font-bold text-coffee-black">{'municipio' in lot ? lot.municipio : lot.finca}</span>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              {/* Map */}
              <div>
                <ColombiaMap
                  region={lot.region}
                  highlightColor={procesoColor}
                  className="w-full h-auto"
                />
              </div>

              {/* Facts grid */}
              <div className="grid grid-cols-2 gap-px bg-gray-300/50">
                {[
                  { label: 'Varietal', value: lot.variedad },
                  { label: 'Proceso', value: lot.proceso },
                  { label: 'Region', value: `${lot.region}, Colombia` },
                  { label: 'municipio' in lot ? 'Municipio' : 'Finca', value: 'municipio' in lot ? lot.municipio : lot.finca },
                  { label: 'Altitude', value: `${lot.altura} masl` },
                  { label: 'Puntaje', value: lot.puntaje },
                  { label: 'Available', value: lot.weight },
                  { label: 'Price', value: lot.price, highlight: true },
                ].map((item) => (
                  <div key={item.label} className="bg-white px-5 py-6">
                    <p className="text-[10px] tracking-[0.15em] uppercase text-gray-500 mb-2">{item.label}</p>
                    <p className={`text-xl md:text-2xl font-bold ${item.highlight ? 'text-[#D4A017]' : 'text-coffee-black'}`}>
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Enquiry CTAs */}
        <div className="max-w-5xl mx-auto px-5 md:px-8">
          <div className="bg-gray-50 rounded-lg p-8 md:p-10">
            <p className="text-lg font-bold text-coffee-black mb-2">Interested in this lot?</p>
            <p className="text-sm text-gray-500 mb-6">Contact us directly to discuss availability, pricing, and shipping.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={buildWhatsAppUrl(lotInfo)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 flex-1 py-3 bg-[#25D366] text-white text-[12px] tracking-[0.1em] uppercase rounded-md hover:bg-[#20bd5a] transition-colors min-h-[48px] font-semibold"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp
              </a>
              <a
                href={buildEnquiryEmailUrl(lotInfo)}
                className="flex items-center justify-center gap-2 flex-1 py-3 bg-coffee-black text-white text-[12px] tracking-[0.1em] uppercase rounded-md hover:bg-gray-800 transition-colors min-h-[48px] font-semibold"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4l-10 8L2 4"/></svg>
                Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
