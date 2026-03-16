/**
 * WhatsApp enquiry utilities for green coffee lots.
 *
 * Green coffee uses WhatsApp (or email) for enquiries, NOT Shopify cart.
 * Juan's primary communication channel is WhatsApp.
 */

import { siteConfig } from '@/config/site';

type LotInfo = {
  name: string;
  variedad?: string | null;
  proceso?: string | null;
  finca?: string | null;
  altura?: string | null;
  puntaje?: string | null;
  price?: string;
  quantity?: string;
  ubicacion?: string | null;
};

/**
 * Build a WhatsApp URL for a single lot enquiry.
 * Opens WhatsApp with a pre-filled message containing lot details.
 */
export function buildWhatsAppUrl(lot: LotInfo): string {
  const lines = [
    `Hola, estoy interesado en:`,
    ``,
    `*${lot.name}*`,
    lot.finca && `Finca: ${lot.finca}`,
    lot.variedad && `Variedad: ${lot.variedad}`,
    lot.proceso && `Proceso: ${lot.proceso}`,
    lot.altura && `Altura: ${lot.altura} msnm`,
    lot.puntaje && `Puntaje: ${lot.puntaje} pts`,
    lot.quantity && `Disponible: ${lot.quantity}`,
    lot.price && `Precio: ${lot.price}`,
    ``,
    `¿Podemos hablar sobre este lote?`,
  ].filter(Boolean);

  const message = lines.join('\n');
  return `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

/**
 * Build a WhatsApp URL for a multi-lot enquiry list.
 * Used when buyer has added multiple lots to their enquiry list.
 */
export function buildMultiLotWhatsAppUrl(lots: LotInfo[]): string {
  const lotLines = lots.map((lot, i) => {
    const details = [
      lot.variedad,
      lot.proceso,
      lot.quantity,
      lot.price,
    ].filter(Boolean).join(' · ');
    return `${i + 1}. *${lot.name}* — ${details}`;
  });

  const lines = [
    `Hola, estoy interesado en los siguientes lotes:`,
    ``,
    ...lotLines,
    ``,
    `¿Podemos hablar sobre disponibilidad y precios?`,
  ];

  const message = lines.join('\n');
  return `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

/**
 * Build a mailto URL for email enquiry (alternative to WhatsApp).
 */
export function buildEnquiryEmailUrl(lot: LotInfo): string {
  const subject = `Consulta: ${lot.name}`;
  const body = [
    `Hola Juan,`,
    ``,
    `Estoy interesado en el siguiente lote:`,
    ``,
    `${lot.name}`,
    lot.finca && `Finca: ${lot.finca}`,
    lot.variedad && `Variedad: ${lot.variedad}`,
    lot.proceso && `Proceso: ${lot.proceso}`,
    lot.altura && `Altura: ${lot.altura} msnm`,
    lot.puntaje && `Puntaje: ${lot.puntaje} pts`,
    lot.quantity && `Disponible: ${lot.quantity}`,
    lot.price && `Precio: ${lot.price}`,
    ``,
    `¿Podrías darme más información?`,
    ``,
    `Gracias,`,
  ].filter(Boolean).join('\n');

  return `mailto:${siteConfig.whatsapp.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function buildMultiLotEmailUrl(lots: LotInfo[]): string {
  const subject = `Consulta: ${lots.length} lotes de café verde`;
  const lotLines = lots.map((lot, i) => {
    return `${i + 1}. ${lot.name} — ${[lot.variedad, lot.proceso, lot.quantity, lot.price].filter(Boolean).join(', ')}`;
  });

  const body = [
    `Hola Juan,`,
    ``,
    `Estoy interesado en los siguientes lotes:`,
    ``,
    ...lotLines,
    ``,
    `¿Podemos hablar sobre disponibilidad y precios?`,
    ``,
    `Gracias,`,
  ].join('\n');

  return `mailto:${siteConfig.whatsapp.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
