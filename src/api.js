// src/api.js

const SHOPIFY_DOMAIN = "training-sunil.myshopify.com"; // your shopify store
const STOREFRONT_ACCESS_TOKEN = "3ca86d7614286477200da647c6ef6cf1"; // your Storefront API token

const endpoint = `https://${SHOPIFY_DOMAIN}/api/2023-04/graphql.json`;

// Reusable function to call Shopify Storefront API
async function shopifyFetch(query, variables = {}) {
  const result = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  const res = await result.json();

  if (res.errors) {
    console.error("Shopify Storefront Error:", res.errors);
    throw new Error("Storefront API Error");
  }

  return res.data;
}

// Fetch collections
export async function getCollections() {
  const query = `
    {
      collections(first: 10) {
        edges {
          node {
            id
            title
            handle
            image {
              url
            }
          }
        }
      }
    }
  `;
  const data = await shopifyFetch(query);
  return data.collections.edges;
}

// Fetch products inside a collection (with first variant ID)
export async function getProductsByCollection(handle) {
  const query = `
    query collectionByHandle($handle: String!) {
      collectionByHandle(handle: $handle) {
        id
        title
        products(first: 10) {
          edges {
            node {
              id
              title
              handle
              variants(first: 1) {
                edges {
                  node {
                    id
                  }
                }
              }
              images(first: 1) {
                edges {
                  node {
                    url
                  }
                }
              }
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  `;
  const data = await shopifyFetch(query, { handle });
  return data.collectionByHandle.products.edges;
}

// Create a new cart with 1 product
export async function createCart(variantId) {
  const query = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    input: {
      lines: [
        {
          merchandiseId: variantId,
          quantity: 1,
        },
      ],
    },
  };

  const data = await shopifyFetch(query, variables);

  console.log("cartCreate response:", data); // Debug

  if (data.cartCreate?.userErrors?.length > 0) {
    console.error("Cart Create Error:", data.cartCreate.userErrors);
    return null;
  }

  return data.cartCreate?.cart;
}

// Add product to an existing cart
export async function addToCart(cartId, variantId) {
  const query = `
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    cartId: cartId,
    lines: [
      {
        merchandiseId: variantId,
        quantity: 1,
      },
    ],
  };

  const data = await shopifyFetch(query, variables);

  console.log("cartLinesAdd response:", data); // Debug

  if (data.cartLinesAdd?.userErrors?.length > 0) {
    console.error("Cart Lines Add Error:", data.cartLinesAdd.userErrors);
    return null;
  }

  return data.cartLinesAdd?.cart;
}

// Fetch full cart details
export async function getCartDetails(cartId) {
    const query = `
      query cartQuery($cartId: ID!) {
        cart(id: $cartId) {
          id
          checkoutUrl
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    image {
                      url
                    }
                    product {
                      title
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;
    const data = await shopifyFetch(query, { cartId });
    return data.cart;
  }
  export async function getProductByHandle(handle) {
    const query = `
      query getProduct($handle: String!) {
        productByHandle(handle: $handle) {
          id
          title
          description
          handle
          images(first: 5) {
            edges {
              node {
                url
              }
            }
          }
          priceRange {
            minVariantPrice {
              amount
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
              }
            }
          }
        }
      }
    `;
    const data = await shopifyFetch(query, { handle });
    return data.productByHandle;
  }
  
  // Remove item from cart
  export async function removeFromCart(cartId, lineId) {
    const query = `
      mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
          cart {
            id
            checkoutUrl
            lines(first: 10) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      image {
                        url
                      }
                      product {
                        title
                      }
                    }
                  }
                }
              }
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `;
    const variables = {
      cartId,
      lineIds: [lineId],
    };
    const data = await shopifyFetch(query, variables);
  
    if (data.cartLinesRemove?.userErrors?.length > 0) {
      console.error("Cart Lines Remove Error:", data.cartLinesRemove.userErrors);
      return null;
    }
  
    return data.cartLinesRemove?.cart;
  }
  