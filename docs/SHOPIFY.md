# Shopify Integration Guide

## Overview

**Shopify is the single backend for everything.** Juan manages his entire business from one Shopify admin:

- **Green coffee lots** — stored as products, displayed as an enquiry-based offer list (NO cart/checkout)
- **Roasted coffee** — standard ecommerce with cart + checkout
- **Merch** — same cart + checkout as roasted
- **Blog / Journal** — Shopify's built-in blog editor

The Storefront API (GraphQL) pulls all this data. The frontend decides how to render each product based on which collection it belongs to. Juan's workflow is identical for every product type: add product, fill in fields, assign to collection, save.

The Admin API is NOT used on the frontend. Juan manages everything through the Shopify admin dashboard.

## Setup Requirements

### Shopify Store Configuration
1. Create a Shopify store (or use existing)
2. Create a **Custom App** or **Headless Sales Channel** in Shopify admin
3. Enable Storefront API access with these scopes:
   - `unauthenticated_read_products`
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_tags`
   - `unauthenticated_write_checkouts`
   - `unauthenticated_read_checkouts`
   - `unauthenticated_read_content` (for blog)
4. Copy the Storefront Access Token → `.env.local`

### Product Metafields
Create these metafields in Shopify admin (Settings → Custom data → Products):

| Namespace | Key | Type | Purpose |
|-----------|-----|------|---------|
| coffee | variedad | Single line text | Caturra, Castillo, Geisha, etc. |
| coffee | proceso | Single line text | Lavado, Honey, Natural |
| coffee | finca | Single line text | Farm name |
| coffee | altura | Number (integer) | Altitude in masl |
| coffee | puntaje | Number (decimal) | Cupping score |
| coffee | ubicacion | Single line text | colombia / en_transito / landed_us |
| coffee | notas | Multi-line text | Tasting notes |
| coffee | region | Single line text | Growing region (e.g., Santander) |

### Collections Structure
- **Green Coffee** — All café verde products
- **Green Coffee** (`green-coffee`) — enquiry only, displayed on `/cafe-verde`
- **Roasted Coffee** (`roasted-coffee`) — Shopify cart + checkout, displayed on `/tienda`
- **Merch** (`merch`) — Shopify cart + checkout, displayed on `/tienda`
- Use tags for filtering: variedad, proceso, region

## API Client (src/lib/shopify.ts)

The Shopify client should:
1. Accept GraphQL queries as strings
2. Send them to `https://${SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`
3. Include the Storefront Access Token in `X-Shopify-Storefront-Access-Token` header
4. Return typed responses
5. Handle errors gracefully

```typescript
// Pattern for the client
const SHOPIFY_ENDPOINT = `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`;

export async function shopifyFetch<T>({ query, variables }: {
  query: string;
  variables?: Record<string, unknown>;
}): Promise<T> {
  const response = await fetch(SHOPIFY_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await response.json();

  if (json.errors) {
    throw new Error(json.errors.map((e: any) => e.message).join(', '));
  }

  return json.data;
}
```

## Key GraphQL Queries

### Get All Products (for store page)
```graphql
query GetProducts($first: Int!, $after: String) {
  products(first: $first, after: $after) {
    edges {
      node {
        id
        title
        handle
        description
        descriptionHtml
        productType
        tags
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 5) {
          edges {
            node {
              url
              altText
              width
              height
            }
          }
        }
        variants(first: 10) {
          edges {
            node {
              id
              title
              availableForSale
              price {
                amount
                currencyCode
              }
              selectedOptions {
                name
                value
              }
            }
          }
        }
        metafields(identifiers: [
          { namespace: "coffee", key: "variedad" },
          { namespace: "coffee", key: "proceso" },
          { namespace: "coffee", key: "finca" },
          { namespace: "coffee", key: "altura" },
          { namespace: "coffee", key: "puntaje" },
          { namespace: "coffee", key: "ubicacion" },
          { namespace: "coffee", key: "notas" },
          { namespace: "coffee", key: "region" }
        ]) {
          key
          value
        }
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
```

### Get Single Product (for product page)
```graphql
query GetProductByHandle($handle: String!) {
  productByHandle(handle: $handle) {
    # Same fields as above, plus:
    seo {
      title
      description
    }
  }
}
```

### Get Blog Articles (for journal)
```graphql
query GetBlogArticles($first: Int!) {
  blogs(first: 1) {
    edges {
      node {
        articles(first: $first, sortKey: PUBLISHED_AT, reverse: true) {
          edges {
            node {
              id
              title
              handle
              excerpt
              contentHtml
              publishedAt
              image {
                url
                altText
                width
                height
              }
              authorV2 {
                name
              }
              tags
              seo {
                title
                description
              }
            }
          }
        }
      }
    }
  }
}
```

### Cart Operations
```graphql
# Create Cart
mutation CreateCart($lines: [CartLineInput!]!) {
  cartCreate(input: { lines: $lines }) {
    cart {
      id
      checkoutUrl
      totalQuantity
      cost {
        totalAmount { amount currencyCode }
        subtotalAmount { amount currencyCode }
      }
      lines(first: 100) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                price { amount currencyCode }
                product {
                  title
                  handle
                  images(first: 1) {
                    edges { node { url altText } }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

# Add to Cart
mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
  cartLinesAdd(cartId: $cartId, lines: $lines) {
    cart { ...CartFields }
  }
}

# Update Cart Line
mutation UpdateCartLine($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
  cartLinesUpdate(cartId: $cartId, lines: $lines) {
    cart { ...CartFields }
  }
}

# Remove from Cart
mutation RemoveFromCart($cartId: ID!, $lineIds: [ID!]!) {
  cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
    cart { ...CartFields }
  }
}
```

## Cart State Management

- Store cart ID in a cookie (`coffee-five-cart`)
- Cart state is client-side — use React Context or a lightweight store
- On "Checkout" → redirect to `cart.checkoutUrl` (Shopify hosted checkout)
- Never build custom checkout UI

## Revalidation (ISR)

Set up a webhook endpoint at `/api/revalidate` that Shopify hits when products update:

```typescript
// src/app/api/revalidate/route.ts
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-shopify-webhook-hmac-sha256');
  // Verify webhook signature in production

  revalidatePath('/store');
  revalidatePath('/');

  return NextResponse.json({ revalidated: true });
}
```

Configure in Shopify admin → Settings → Notifications → Webhooks:
- Product creation → `https://yourdomain.com/api/revalidate`
- Product update → `https://yourdomain.com/api/revalidate`

## Pricing & Currency

- Primary currency: USD (even though Juan is in Colombia, his US-facing customers pay in USD)
- Consider COP display for Colombian customers (future)
- Shopify handles currency formatting — use their `amount` + `currencyCode` fields
- Green coffee typically priced per kg or per lb
- Roasted coffee typically priced per bag (250g, 340g, 1lb)
