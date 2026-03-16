const SHOPIFY_ENDPOINT = `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`;

type ShopifyFetchParams = {
  query: string;
  variables?: Record<string, unknown>;
  cache?: RequestCache;
  tags?: string[];
};

export async function shopifyFetch<T>({
  query,
  variables,
  cache = 'force-cache',
  tags,
}: ShopifyFetchParams): Promise<T> {
  const response = await fetch(SHOPIFY_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token':
        process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
    },
    body: JSON.stringify({ query, variables }),
    cache,
    ...(tags && { next: { tags } }),
  });

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.status} ${response.statusText}`);
  }

  const json = await response.json();

  if (json.errors) {
    throw new Error(
      `Shopify GraphQL error: ${json.errors.map((e: { message: string }) => e.message).join(', ')}`
    );
  }

  return json.data;
}

// ─── Product Queries ───────────────────────────────────────────────

const PRODUCT_FRAGMENT = `
  fragment ProductFields on Product {
    id
    title
    handle
    description
    descriptionHtml
    productType
    tags
    availableForSale
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    compareAtPriceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 10) {
      edges {
        node {
          url
          altText
          width
          height
        }
      }
    }
    variants(first: 20) {
      edges {
        node {
          id
          title
          availableForSale
          quantityAvailable
          price {
            amount
            currencyCode
          }
          compareAtPrice {
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
    seo {
      title
      description
    }
  }
`;

export async function getProducts(first = 20) {
  const query = `
    ${PRODUCT_FRAGMENT}
    query GetProducts($first: Int!) {
      products(first: $first, sortKey: TITLE) {
        edges {
          node {
            ...ProductFields
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `;

  return shopifyFetch<{ products: ShopifyConnection<ShopifyProduct> }>({
    query,
    variables: { first },
    tags: ['products'],
  });
}

export async function getProductByHandle(handle: string) {
  const query = `
    ${PRODUCT_FRAGMENT}
    query GetProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        ...ProductFields
      }
    }
  `;

  return shopifyFetch<{ productByHandle: ShopifyProduct | null }>({
    query,
    variables: { handle },
    tags: ['products', `product-${handle}`],
  });
}

export async function getProductsByCollection(collectionHandle: string, first = 20) {
  const query = `
    ${PRODUCT_FRAGMENT}
    query GetCollection($handle: String!, $first: Int!) {
      collectionByHandle(handle: $handle) {
        id
        title
        description
        products(first: $first) {
          edges {
            node {
              ...ProductFields
            }
          }
        }
      }
    }
  `;

  return shopifyFetch<{ collectionByHandle: ShopifyCollection | null }>({
    query,
    variables: { handle: collectionHandle, first },
    tags: ['products', `collection-${collectionHandle}`],
  });
}

// ─── Blog Queries ──────────────────────────────────────────────────

export async function getBlogArticles(first = 10) {
  const query = `
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
  `;

  return shopifyFetch<{ blogs: ShopifyConnection<{ articles: ShopifyConnection<ShopifyArticle> }> }>({
    query,
    variables: { first },
    tags: ['blog'],
  });
}

export async function getBlogArticleByHandle(handle: string) {
  const query = `
    query GetBlogArticle($handle: String!) {
      blogs(first: 1) {
        edges {
          node {
            articleByHandle(handle: $handle) {
              id
              title
              handle
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
  `;

  return shopifyFetch<{
    blogs: ShopifyConnection<{ articleByHandle: ShopifyArticle | null }>;
  }>({
    query,
    variables: { handle },
    tags: ['blog', `article-${handle}`],
  });
}

// ─── Cart Queries ──────────────────────────────────────────────────

const CART_FRAGMENT = `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      totalAmount { amount currencyCode }
      subtotalAmount { amount currencyCode }
      totalTaxAmount { amount currencyCode }
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          cost {
            totalAmount { amount currencyCode }
          }
          merchandise {
            ... on ProductVariant {
              id
              title
              price { amount currencyCode }
              product {
                title
                handle
                images(first: 1) {
                  edges { node { url altText width height } }
                }
              }
              selectedOptions {
                name
                value
              }
            }
          }
        }
      }
    }
  }
`;

export async function createCart(variantId: string, quantity = 1) {
  const query = `
    ${CART_FRAGMENT}
    mutation CreateCart($lines: [CartLineInput!]!) {
      cartCreate(input: { lines: $lines }) {
        cart { ...CartFields }
        userErrors { field message }
      }
    }
  `;

  return shopifyFetch<{
    cartCreate: { cart: ShopifyCart; userErrors: ShopifyUserError[] };
  }>({
    query,
    variables: {
      lines: [{ merchandiseId: variantId, quantity }],
    },
    cache: 'no-store',
  });
}

export async function addToCart(cartId: string, variantId: string, quantity = 1) {
  const query = `
    ${CART_FRAGMENT}
    mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart { ...CartFields }
        userErrors { field message }
      }
    }
  `;

  return shopifyFetch<{
    cartLinesAdd: { cart: ShopifyCart; userErrors: ShopifyUserError[] };
  }>({
    query,
    variables: {
      cartId,
      lines: [{ merchandiseId: variantId, quantity }],
    },
    cache: 'no-store',
  });
}

export async function updateCartLine(cartId: string, lineId: string, quantity: number) {
  const query = `
    ${CART_FRAGMENT}
    mutation UpdateCartLine($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart { ...CartFields }
        userErrors { field message }
      }
    }
  `;

  return shopifyFetch<{
    cartLinesUpdate: { cart: ShopifyCart; userErrors: ShopifyUserError[] };
  }>({
    query,
    variables: {
      cartId,
      lines: [{ id: lineId, quantity }],
    },
    cache: 'no-store',
  });
}

export async function removeFromCart(cartId: string, lineIds: string[]) {
  const query = `
    ${CART_FRAGMENT}
    mutation RemoveFromCart($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart { ...CartFields }
        userErrors { field message }
      }
    }
  `;

  return shopifyFetch<{
    cartLinesRemove: { cart: ShopifyCart; userErrors: ShopifyUserError[] };
  }>({
    query,
    variables: { cartId, lineIds },
    cache: 'no-store',
  });
}

export async function getCart(cartId: string) {
  const query = `
    ${CART_FRAGMENT}
    query GetCart($cartId: ID!) {
      cart(id: $cartId) {
        ...CartFields
      }
    }
  `;

  return shopifyFetch<{ cart: ShopifyCart | null }>({
    query,
    variables: { cartId },
    cache: 'no-store',
  });
}

// ─── Types ─────────────────────────────────────────────────────────

type ShopifyConnection<T> = {
  edges: { node: T }[];
  pageInfo?: {
    hasNextPage: boolean;
    endCursor: string;
  };
};

type ShopifyMoney = {
  amount: string;
  currencyCode: string;
};

type ShopifyImage = {
  url: string;
  altText: string | null;
  width: number;
  height: number;
};

type ShopifyMetafield = {
  key: string;
  value: string;
} | null;

export type ShopifyProduct = {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  productType: string;
  tags: string[];
  availableForSale: boolean;
  priceRange: {
    minVariantPrice: ShopifyMoney;
    maxVariantPrice: ShopifyMoney;
  };
  compareAtPriceRange: {
    minVariantPrice: ShopifyMoney;
  };
  images: ShopifyConnection<ShopifyImage>;
  variants: ShopifyConnection<{
    id: string;
    title: string;
    availableForSale: boolean;
    quantityAvailable: number;
    price: ShopifyMoney;
    compareAtPrice: ShopifyMoney | null;
    selectedOptions: { name: string; value: string }[];
  }>;
  metafields: ShopifyMetafield[];
  seo: {
    title: string | null;
    description: string | null;
  };
};

export type ShopifyCollection = {
  id: string;
  title: string;
  description: string;
  products: ShopifyConnection<ShopifyProduct>;
};

export type ShopifyArticle = {
  id: string;
  title: string;
  handle: string;
  excerpt: string;
  contentHtml: string;
  publishedAt: string;
  image: ShopifyImage | null;
  authorV2: { name: string };
  tags: string[];
  seo: {
    title: string | null;
    description: string | null;
  };
};

export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    totalAmount: ShopifyMoney;
    subtotalAmount: ShopifyMoney;
    totalTaxAmount: ShopifyMoney;
  };
  lines: ShopifyConnection<{
    id: string;
    quantity: number;
    cost: {
      totalAmount: ShopifyMoney;
    };
    merchandise: {
      id: string;
      title: string;
      price: ShopifyMoney;
      product: {
        title: string;
        handle: string;
        images: ShopifyConnection<ShopifyImage>;
      };
      selectedOptions: { name: string; value: string }[];
    };
  }>;
};

type ShopifyUserError = {
  field: string[];
  message: string;
};

// ─── Helpers ───────────────────────────────────────────────────────

export function getMetafieldValue(
  metafields: ShopifyMetafield[],
  key: string
): string | null {
  const field = metafields.find((mf) => mf?.key === key);
  return field?.value ?? null;
}

export function formatPrice(money: ShopifyMoney): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: money.currencyCode,
  }).format(parseFloat(money.amount));
}

export function flattenConnection<T>(connection: ShopifyConnection<T>): T[] {
  return connection.edges.map((edge) => edge.node);
}
