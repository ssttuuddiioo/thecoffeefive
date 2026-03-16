'use client';

import { useState } from 'react';
import { ImagePlaceholder } from '@/app/_components/ImagePlaceholder';
import { mockGreenLots, procesoColorMap } from '@/lib/mock-data';
import { buildWhatsAppUrl, buildEnquiryEmailUrl } from '@/lib/whatsapp';

const tabs = ['Resumen', 'Sabor', 'Origen', 'Proceso', 'Verde', 'Preparación'] as const;

const tabContent: Record<string, string> = {
  Resumen: 'Un lote excepcional con un perfil de sabor complejo y equilibrado. Cultivado con cuidado en las montañas de Colombia, procesado bajo estricto control de calidad en nuestro laboratorio en Medellín.',
  Sabor: 'Notas de frutas tropicales, acidez cítrica brillante, cuerpo medio con un final limpio y prolongado. Un café con carácter que destaca en métodos de filtro y también en espresso.',
  Origen: 'Producido por familias cafeteras con generaciones de experiencia. Cultivado a gran altitud en suelos volcánicos ricos en minerales. La relación directa con Juan permite retroalimentación continua sobre calidad y prácticas.',
  Proceso: 'Cereza seleccionada a mano en punto óptimo de maduración. Fermentación controlada de 48-60 horas con monitoreo de temperatura. Secado en camas elevadas durante 15-20 días hasta alcanzar 10.5-11% de humedad.',
  Verde: 'Humedad: 10.8% · Actividad de agua: 0.55 · Densidad: 720 g/L · Tamaño de criba: 16/17 · Defectos: <5 por 350g · Análisis realizado en Lab Coffee Five, Medellín.',
  'Preparación': 'Para tueste: Primer crack a los 9-10 min. Desarrollo 15-20% del tiempo total. Perfil de tueste recomendado: light-medium para resaltar acidez y complejidad. Sugerencia V60: 15g café, 250ml agua a 93°C.',
};

export default function GreenCoffeeLotPage() {
  const [activeTab, setActiveTab] = useState<string>('Resumen');

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
    colombia: '📍 Colombia',
    en_transito: '🚢 En tránsito',
    landed_us: '📦 EE.UU.',
  };

  return (
    <main className="pt-20 md:pt-24">
      <div className="container-site section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-16">
          {/* Images */}
          <div className="space-y-3">
            <ImagePlaceholder aspectRatio="4/3" label="Lot / farm photo" className="rounded-md" />
            <div className="grid grid-cols-3 gap-3">
              <ImagePlaceholder aspectRatio="1/1" label="Detail" className="rounded-sm" />
              <ImagePlaceholder aspectRatio="1/1" label="Process" className="rounded-sm" />
              <ImagePlaceholder aspectRatio="1/1" label="Farm" className="rounded-sm" />
            </div>
          </div>

          {/* Details */}
          <div>
            <span
              className="inline-block text-[10px] tracking-[0.1em] uppercase px-3 py-1 rounded-full text-white font-medium mb-4"
              style={{ backgroundColor: procesoColor }}
            >
              {lot.proceso}
            </span>

            <h1 className="text-2xl md:text-3xl font-bold text-coffee-white mb-2">{lot.name}</h1>
            <p className="text-sm text-coffee-400 mb-6">
              {ubicacionLabel[lot.ubicacion] || lot.ubicacion}
            </p>

            {/* Metadata grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-8 py-6 border-y border-coffee-800">
              {[
                ['Variedad', lot.variedad],
                ['Proceso', lot.proceso],
                ['Finca', lot.finca],
                ['Región', lot.region],
                ['Altura', `${lot.altura} msnm`],
                ['Puntaje', `${lot.puntaje} pts`],
                ['Disponible', lot.weight],
                ['Precio', lot.price],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-[10px] tracking-[0.1em] uppercase text-coffee-400 mb-1">{label}</p>
                  <p className="text-sm text-coffee-white font-medium">{value}</p>
                </div>
              ))}
            </div>

            {/* Enquiry CTAs */}
            <div className="space-y-3">
              <a
                href={buildWhatsAppUrl(lotInfo)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full py-3 bg-[#25D366] text-white text-[12px] tracking-[0.1em] uppercase rounded-sm hover:bg-[#20bd5a] transition-colors min-h-[44px]"
              >
                Consultar por WhatsApp
              </a>
              <a
                href={buildEnquiryEmailUrl(lotInfo)}
                className="flex items-center justify-center w-full py-3 border border-coffee-700 text-coffee-white text-[12px] tracking-[0.1em] uppercase rounded-sm hover:border-coffee-white transition-colors min-h-[44px]"
              >
                Consultar por Email
              </a>
            </div>
          </div>
        </div>

        {/* Tab bar */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-coffee-800 pb-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`tab-pill ${activeTab === tab ? 'tab-pill-active' : ''}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="max-w-2xl min-h-[160px] mb-16">
          <p className="text-sm text-coffee-400 leading-relaxed">
            {tabContent[activeTab]}
          </p>
        </div>
      </div>
    </main>
  );
}
