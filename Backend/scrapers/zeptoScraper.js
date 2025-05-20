import puppeteer from 'puppeteer';
import Product from '../models/Product.js';

export async function scrapeProducts() {
  console.log('Starting Zepto scraper...');
  
  let browser;
  try {
    // Launch puppeteer with stealth mode to avoid detection
    browser = await puppeteer.launch({
      headless: "new",
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-web-security',
        '--disable-features=IsolateOrigins,site-per-process',
        '--window-size=1920,1080',
      ],
      defaultViewport: { width: 1920, height: 1080 }
    });
    
    const page = await browser.newPage();
    
    // Set user agent to appear as a regular browser
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36');
    
    // Configure request interception to bypass certain restrictions
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      if (req.resourceType() === 'image' || req.resourceType() === 'stylesheet' || req.resourceType() === 'font') {
        req.abort();
      } else {
        req.continue();
      }
    });
    
    // Add extra headers to appear as a regular browser
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Accept-Encoding': 'gzip, deflate, br',
      'Connection': 'keep-alive',
      'Upgrade-Insecure-Requests': '1'
    });
    
    // Categories we'll scrape
    const categories = [
      { name: 'Vegetables', url: '/cn/vegetables-fruits/fresh-vegetables?pid=homepage-icon-panel-fresh-vegetables' },
      { name: 'Fruits', url: '/cn/vegetables-fruits/fresh-fruits?pid=homepage-icon-panel-fresh-fruits' },
      { name: 'Dairy', url: '/cn/dairy-breakfast/dairy?pid=homepage-icon-panel-dairy' }
    ];
    
    // Navigate to Zepto homepage
    await page.goto('https://www.zeptonow.com/', { 
      waitUntil: 'networkidle2',
      timeout: 60000 
    });
    
    console.log('Landed on Zepto homepage');
    
    // Wait for location popup and set location (Bangalore - Indiranagar)
    try {
      const locationInputVisible = await page.waitForSelector('input[placeholder="e.g. Koramangala, Indiranagar"]', { timeout: 5000 });
      if (locationInputVisible) {
        // Enter location
        await page.type('input[placeholder="e.g. Koramangala, Indiranagar"]', 'Indiranagar');
        console.log('Entered location');
        
        await page.waitForTimeout(2000);
        
        // Select the first location from dropdown
        const locationDropdown = await page.waitForSelector('.css-17w6ivi', { timeout: 5000 });
        if (locationDropdown) {
          await locationDropdown.click();
          console.log('Selected location from dropdown');
          
          // Wait for location to be set and page to load
          await page.waitForNavigation({ waitUntil: 'networkidle2' });
          console.log('Location set successfully');
        }
      }
    } catch (error) {
      console.log('Location popup not found or already set');
    }
    
    // Process each category
    for (const category of categories) {
      console.log(`Scraping ${category.name}...`);
      
      // Navigate to category page
      await page.goto(`https://www.zeptonow.com${category.url}`, { 
        waitUntil: 'networkidle2',
        timeout: 60000 
      });
      
      console.log(`Navigated to ${category.name} page`);
      
      // Wait for products to load
      await page.waitForSelector('.css-1gia3lz', { timeout: 10000 });
      
      // Extract product data
      const products = await page.evaluate((categoryName) => {
        const productCards = Array.from(document.querySelectorAll('.css-1gia3lz'));
        return productCards.slice(0, 20).map(card => {
          // Extract price
          const priceElement = card.querySelector('.css-1os9jgn');
          let price = 0;
          if (priceElement) {
            const priceText = priceElement.textContent.trim();
            // Extract number from string like "₹45" or "₹45.50"
            const priceMatch = priceText.match(/₹(\d+(\.\d+)?)/);
            price = priceMatch ? parseFloat(priceMatch[1]) : 0;
          }
          
          // Extract name
          const nameElement = card.querySelector('.css-17uxs1p');
          const name = nameElement ? nameElement.textContent.trim() : 'Unknown Product';
          
          // Extract image URL
          const imageElement = card.querySelector('img');
          const image = imageElement ? imageElement.src : '';
          
          // Extract quantity/unit
          const weightElement = card.querySelector('.css-1m5lvlt');
          let unit = weightElement ? weightElement.textContent.trim() : '';
          
          // Check if the product is in stock
          const outOfStockElement = card.querySelector('.css-1hbmoh1'); // Adjust selector based on Zepto's UI
          const inStock = !outOfStockElement;
          
          // Extract product URL
          const linkElement = card.querySelector('a');
          const productUrl = linkElement ? linkElement.href : '';
          
          return {
            name,
            category: categoryName,
            description: `Fresh ${name.toLowerCase()} available at Zepto`,
            image,
            unit,
            price,
            inStock,
            url: productUrl
          };
        });
      }, category.name);
      
      console.log(`Extracted ${products.length} products from ${category.name}`);
      
      // Save products to database
      for (const productData of products) {
        // Skip products with invalid data
        if (!productData.name || productData.name === 'Unknown Product' || productData.price === 0) {
          console.log('Skipping product with invalid data');
          continue;
        }
        
        // Check if product already exists
        let product = await Product.findOne({ 
          name: productData.name,
          category: productData.category
        });
        
        if (!product) {
          // Create new product
          product = new Product({
            name: productData.name,
            category: productData.category,
            description: productData.description,
            image: productData.image,
            unit: productData.unit,
            currentPrices: [],
            priceHistory: []
          });
          console.log(`Created new product: ${productData.name}`);
        }
        
        // Update or add Zepto price
        const zeptoPriceIndex = product.currentPrices.findIndex(
          p => p.vendor === 'Zepto'
        );
        
        const priceData = {
          vendor: 'Zepto',
          price: productData.price,
          inStock: productData.inStock,
          deliveryFee: 15, // Zepto's standard delivery fee
          deliveryTime: '10-20 min',
          url: productData.url,
          updatedAt: new Date()
        };
        
        if (zeptoPriceIndex >= 0) {
          product.currentPrices[zeptoPriceIndex] = priceData;
        } else {
          product.currentPrices.push(priceData);
        }
        
        // Add to price history
        product.priceHistory.push({
          date: new Date(),
          vendor: 'Zepto',
          price: productData.price,
          inStock: productData.inStock,
          deliveryFee: 15,
          deliveryTime: '10-20 min'
        });
        
        await product.save();
        console.log(`Saved ${productData.name} to database`);
      }
      
      // Wait a bit between categories to avoid rate limiting
      await page.waitForTimeout(3000);
    }
    
    console.log('Zepto scraping completed successfully');
  } catch (error) {
    console.error('Error during Zepto scraping:', error);
  } finally {
    if (browser) {
      await browser.close();
      console.log('Browser closed');
    }
  }
}

// Run the scraper via cron scheduling in index.js
// For testing, you can uncomment the line below
// scrapeProducts().catch(console.error);