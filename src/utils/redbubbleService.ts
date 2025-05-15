
import { Product } from '../types';
import { mockProducts } from '../data/mockProducts';

// URL of your Redbubble store
const REDBUBBLE_STORE_URL = 'https://www.redbubble.com/people/hecomaister/shop?asc=u';

// Function to fetch products from Redbubble
export async function fetchRedbubbleProducts(): Promise<Product[]> {
  try {
    // In a real-world scenario, we would fetch data from Redbubble here
    // Unfortunately, Redbubble doesn't provide a public API for accessing product data
    // You would need server-side scraping or a backend proxy to get actual products
    
    console.log('Attempted to fetch products from:', REDBUBBLE_STORE_URL);
    console.log('Using mock data as Redbubble has no public API');
    
    // For now, we'll return mock data with your store URL
    return mockProducts.map(product => ({
      ...product,
      productUrl: `${REDBUBBLE_STORE_URL.split('?')[0]}/works/${product.id}`,
    }));
  } catch (error) {
    console.error("Error fetching products from Redbubble:", error);
    throw error;
  }
}

// Note: For a production app, you would need:
// 1. A backend service that scrapes Redbubble data
// 2. OR an official partnership with Redbubble to access their API
// 3. OR a periodic manual process to update your product data
