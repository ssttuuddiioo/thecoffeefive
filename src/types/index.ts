// Re-export Shopify types from the client library
export type {
  ShopifyProduct,
  ShopifyCollection,
  ShopifyArticle,
  ShopifyCart,
} from '@/lib/shopify';

// Coffee-specific types
export type CoffeeLocation = 'colombia' | 'en_transito' | 'landed_us';

export type CoffeeMetafields = {
  variedad: string | null;
  proceso: string | null;
  finca: string | null;
  altura: number | null;
  puntaje: number | null;
  ubicacion: CoffeeLocation | null;
  notas: string | null;
  region: string | null;
};

export type Locale = 'es' | 'en';
