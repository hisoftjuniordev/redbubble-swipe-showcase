
import { Product } from '../types';
import { mockProducts } from '../data/mockProducts';

// URL of your Redbubble store
const REDBUBBLE_STORE_URL = 'https://www.redbubble.com/people/hecomaister/shop?asc=u';

// Function to fetch products from Redbubble
export async function fetchRedbubbleProducts(): Promise<Product[]> {
  try {
    // Check if we have an environment variable pointing to a scraping API
    const SCRAPING_API_URL = import.meta.env.VITE_SCRAPING_API_URL;
    
    if (SCRAPING_API_URL) {
      console.log('Attempting to fetch products from scraping API:', SCRAPING_API_URL);
      
      // Make a request to the scraping API
      const response = await fetch(SCRAPING_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          storeUrl: REDBUBBLE_STORE_URL,
        }),
      });
      
      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Products fetched successfully from scraping API:', data.products?.length || 0);
      
      return data.products || [];
    }
    
    // Fallback to mock data
    console.log('No scraping API configured. Using mock data instead.');
    console.log('Attempted to fetch products from:', REDBUBBLE_STORE_URL);
    
    // Return mock data with your store URL
    return mockProducts.map(product => ({
      ...product,
      productUrl: `${REDBUBBLE_STORE_URL.split('?')[0]}/works/${product.id}`,
    }));
  } catch (error) {
    console.error("Error fetching products from Redbubble:", error);
    console.log("Falling back to mock data");
    
    // Return mock data in case of error
    return mockProducts.map(product => ({
      ...product,
      productUrl: `${REDBUBBLE_STORE_URL.split('?')[0]}/works/${product.id}`,
    }));
  }
}

// Note: For a production app, you would need:
// 1. A backend service that scrapes Redbubble data (Node.js with Puppeteer/Cheerio)
// 2. OR an official partnership with Redbubble to access their API
// 3. OR a third-party scraping service (ScrapingBee, Bright Data, etc.)

// Example shape of the JSON expected from a scraping API:
/*
{
  "products": [
    {
      "id": "1234567",
      "name": "Product Name",
      "price": "$24.99",
      "imageUrl": "https://...",
      "productUrl": "https://...",
      "description": "Product description",
      "category": "T-Shirts",
      "artist": "hecomaister",
      "createdAt": "2023-08-15"
    },
    ...
  ]
}
*/
