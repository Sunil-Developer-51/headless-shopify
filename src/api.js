// src/api.js

const SHOPIFY_DOMAIN = "training-sunil.myshopify.com"; // your shopify store
const STOREFRONT_ACCESS_TOKEN = "3ca86d7614286477200da647c6ef6cf1"; // your Storefront API token

const endpoint = `https://${SHOPIFY_DOMAIN}/api/2023-04/graphql.json`;

// Reusable function to call Shopify Storefront API
export async function shopifyFetch(query, variables = {}) {
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
// src/api.js

export async function createCart(variantId, quantity = 1) {
  const query = `
    mutation CartCreate($input: CartInput!) {
      cartCreate(input: $input) {
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
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const variables = {
    input: {
      lines: [
        {
          quantity: quantity,
          merchandiseId: variantId,
        },
      ],
    },
  };

  const data = await shopifyFetch(query, variables);
  return data.cartCreate.cart;
}

export async function addToCart(cartId, variantId, quantity = 1) {
  const query = `
    mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
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
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const variables = {
    cartId,
    lines: [
      {
        quantity: quantity,
        merchandiseId: variantId,
      },
    ],
  };

  const data = await shopifyFetch(query, variables);
  return data.cartLinesAdd.cart;
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
  
// Customer Login
export async function loginCustomer(email, password) {
  const query = `
    mutation customerAccessTokenCreate($email: String!, $password: String!) {
      customerAccessTokenCreate(input: {email: $email, password: $password}) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        userErrors {
          field
          message
        }
      }
    }
  `;
  const data = await shopifyFetch(query, { email, password });
  return data.customerAccessTokenCreate;
}

// Customer Register
export async function registerCustomer(firstName, lastName, email, password) {
  const query = `
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer {
          id
          email
          firstName
          lastName
        }
        userErrors {
          field
          message
        }
      }
    }
  `;
  const data = await shopifyFetch(query, { input: { firstName, lastName, email, password } });
  return data.customerCreate;
}

// Fetch Customer Info
export async function getCustomerInfo(accessToken) {
  const query = `
    query {
      customer(customerAccessToken:"${accessToken}") {
        id
        firstName
        lastName
        email
        orders(first: 5) {
          edges {
            node {
              id
              orderNumber
              totalPriceV2 {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;
  const data = await shopifyFetch(query, {
    accessToken,
  });
  console.log(data,'data')
  return data.customer;
}