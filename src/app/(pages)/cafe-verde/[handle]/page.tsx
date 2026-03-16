import { mockGreenLots, procesoColorMap } from '@/lib/mock-data';
import { buildWhatsAppUrl, buildEnquiryEmailUrl } from '@/lib/whatsapp';
import { ImagePlaceholder } from '@/app/_components/ImagePlaceholder';
import { ColombiaMap } from '@/app/_components/ColombiaMap';

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl md:text-3xl font-extrabold text-coffee-black mb-6">
      {children}
    </h2>
  );
}

function Divider() {
  return <div className="border-t border-gray-200" />;
}

export default function GreenCoffeeLotPage() {
  const lot = mockGreenLots[0];
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
      {/* Hero color bar */}
      <div className="h-3 w-full" style={{ backgroundColor: procesoColor }} />

      {/* Hero image */}
      <div className="w-full">
        <ImagePlaceholder aspectRatio="21/9" label="Lot hero — finca photography" className="w-full" />
      </div>

      <div className="pt-12 md:pt-16 pb-24">
        {/* Header */}
        <div className="max-w-3xl mx-auto px-5 md:px-8 mb-12 md:mb-16">
          <span
            className="inline-block text-[10px] tracking-[0.12em] uppercase px-3 py-1 rounded-full text-white font-medium mb-5"
            style={{ backgroundColor: procesoColor }}
          >
            {lot.proceso}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-coffee-black leading-tight mb-3">
            {lot.name}
          </h1>
          <p className="text-sm text-gray-500 tracking-wide">
            {ubicacionLabel[lot.ubicacion] || lot.ubicacion} · {lot.region}, Colombia
          </p>
        </div>

        {/* Quick Specs */}
        <div className="max-w-3xl mx-auto px-5 md:px-8 mb-12 md:mb-16">
          <Divider />
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 py-8">
            {[
              ['Varietal', lot.variedad],
              ['Region', lot.region],
              ['Altitude', `${lot.altura} masl`],
              ['Score', `${lot.puntaje} pts`],
              ['Finca', lot.finca],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="text-[10px] tracking-[0.15em] uppercase text-gray-400 mb-1.5">{label}</p>
                <p className="text-sm font-semibold text-coffee-black">{value}</p>
              </div>
            ))}
          </div>
          <Divider />
        </div>

        {/* Pricing Details */}
        <div className="max-w-3xl mx-auto px-5 md:px-8 mb-12 md:mb-16">
          <p className="text-[10px] tracking-[0.15em] uppercase text-gray-400 mb-6">Pricing Details</p>
          <div className="space-y-0">
            <div className="flex items-center justify-between py-4 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                </svg>
                <span className="text-[11px] tracking-[0.1em] uppercase font-semibold text-coffee-black">FOB (USD; Green)</span>
              </div>
              <span className="text-base font-bold text-coffee-black">{lot.price}</span>
            </div>
            <div className="flex items-center justify-between py-4 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400">
                  <rect x="2" y="7" width="20" height="14" rx="2" />
                  <path d="M16 7V5a4 4 0 00-8 0v2" />
                </svg>
                <span className="text-[11px] tracking-[0.1em] uppercase font-semibold text-coffee-black">Available</span>
              </div>
              <span className="text-base font-bold text-coffee-black">{lot.weight}</span>
            </div>
            <Divider />
          </div>
        </div>

        {/* Origen */}
        <div className="max-w-3xl mx-auto px-5 md:px-8 mb-12 md:mb-16">
          <Divider />

          {/* Colombia map */}
          <div className="py-10 md:py-14 flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/2 shrink-0">
              <ColombiaMap
                region={lot.region}
                highlightColor={procesoColor}
                className="w-full h-auto"
              />
            </div>
            <div className="flex-1">
              <SectionHeading>Origen</SectionHeading>
              <div className="mb-4">
                <p className="text-sm font-semibold text-coffee-black">{lot.finca}</p>
                <p className="text-sm text-gray-500 mt-1">{lot.region}, Colombia</p>
                <p className="text-sm text-gray-500">{lot.altura} msnm</p>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Producido por familias cafeteras con generaciones de experiencia. Cultivado a gran altitud en suelos volcánicos ricos en minerales. La relación directa con Juan permite retroalimentación continua sobre calidad y prácticas agrícolas que maximizan el potencial del terroir.
              </p>
            </div>
          </div>
          <Divider />
        </div>

        {/* Proceso */}
        <div className="max-w-3xl mx-auto px-5 md:px-8 mb-12 md:mb-16">
          <ImagePlaceholder aspectRatio="16/7" label="Processing — fermentation, drying" className="rounded-lg mb-8" />
          <div className="py-4 md:py-6">
            <SectionHeading>Proceso</SectionHeading>
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6">
              <div>
                <p className="text-[10px] tracking-[0.15em] uppercase text-gray-400 mb-1.5">Método</p>
                <p className="text-sm font-semibold text-coffee-black">{lot.proceso}</p>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Cereza seleccionada a mano en punto óptimo de maduración. Fermentación controlada de 48–60 horas con monitoreo de temperatura. Secado en camas elevadas durante 15–20 días hasta alcanzar 10.5–11% de humedad. Todo el proceso supervisado por el equipo de Coffee Five.
              </p>
            </div>
          </div>
          <Divider />
        </div>

        {/* Sabor */}
        <div className="max-w-3xl mx-auto px-5 md:px-8 mb-12 md:mb-16">
          <div className="py-10 md:py-14">
            <SectionHeading>Sabor</SectionHeading>
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6">
              <div className="space-y-3">
                {['Frutas tropicales', 'Cítrico brillante', 'Cacao', 'Panela', 'Final limpio'].map((note) => (
                  <p key={note} className="text-sm text-coffee-black">{note}</p>
                ))}
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Notas de frutas tropicales, acidez cítrica brillante, cuerpo medio con un final limpio y prolongado. Un café con carácter que destaca en métodos de filtro y también en espresso. Complejidad que evoluciona a medida que la taza se enfría.
              </p>
            </div>
          </div>
          <Divider />
        </div>

        {/* Análisis Verde */}
        <div className="max-w-3xl mx-auto px-5 md:px-8 mb-12 md:mb-16">
          <div className="py-10 md:py-14">
            <SectionHeading>Análisis Verde</SectionHeading>
            <div className="space-y-0">
              {[
                ['Humedad', '10.8%'],
                ['Actividad de agua', '0.55'],
                ['Densidad', '720 g/L'],
                ['Criba', '16/17'],
                ['Defectos', '<5 por 350g'],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-[11px] tracking-[0.1em] uppercase text-gray-400">{label}</span>
                  <span className="text-sm font-medium text-coffee-black">{value}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-4">
              Análisis realizado en Lab Coffee Five, Medellín.
            </p>
          </div>
          <Divider />
        </div>

        {/* Preparación */}
        <div className="max-w-3xl mx-auto px-5 md:px-8 mb-16 md:mb-20">
          <div className="py-10 md:py-14">
            <SectionHeading>Preparación</SectionHeading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-[10px] tracking-[0.15em] uppercase text-gray-400 mb-3">Tueste</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Primer crack a los 9–10 min. Desarrollo 15–20% del tiempo total. Perfil de tueste recomendado: light-medium para resaltar acidez y complejidad.
                </p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.15em] uppercase text-gray-400 mb-3">Brewing</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  V60: 15g café, 250ml agua a 93°C. Ratio 1:16.7. Tiempo total 2:45–3:00 min. También excelente como espresso con ratio 1:2, 25–28 segundos de extracción.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Enquiry CTAs */}
        <div className="max-w-3xl mx-auto px-5 md:px-8">
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
                WhatsApp
              </a>
              <a
                href={buildEnquiryEmailUrl(lotInfo)}
                className="flex items-center justify-center gap-2 flex-1 py-3 bg-coffee-black text-white text-[12px] tracking-[0.1em] uppercase rounded-md hover:bg-gray-800 transition-colors min-h-[48px] font-semibold"
              >
                Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
