import puppeteer from 'puppeteer';
import Product from '../models/Product.js';

// This is a simplified scraper for demonstration purposes
// In a real application, this would be more robust with error handling and retry logic
export async function scrapeProducts() {
  console.log('Starting Zepto scraper...');
  
  let browser;
  try {
    // Launch puppeteer
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Mock categories and products to scrape
    const categories = [
      { name: 'Vegetables', url: 'https://www.zeptonow.com/vegetables' },
      { name: 'Fruits', url: 'https://www.zeptonow.com/fruits' },
      { name: 'Dairy', url: 'https://www.zeptonow.com/dairy-eggs' }
    ];
    
    for (const category of categories) {
      console.log(`Scraping ${category.name}...`);
      
      // Set pincode (this would typically be done by selecting a location on Zepto)
      // This is a simplified version and would be more complex in a real scraper
      await page.goto('https://www.zeptonow.com/', { waitUntil: 'networkidle2' });
      
      // In a real scraper, we would:
      // 1. Navigate to Zepto
      // 2. Set location and pincode
      // 3. Navigate to category pages
      // 4. Extract product information
      
      // For demonstration, we'll generate mock data
      const mockProducts = generateMockProducts(category.name);
      
      // Save products to database
      for (const productData of mockProducts) {
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
        }
        
        // Update or add Zepto price
        const zeptoPriceIndex = product.currentPrices.findIndex(
          p => p.vendor === 'Zepto'
        );
        
        const priceData = {
          vendor: 'Zepto',
          price: productData.price,
          inStock: productData.inStock,
          deliveryFee: 10, // Zepto typically charges delivery fee
          deliveryTime: '10-15 min',
          url: `https://www.zeptonow.com/p/${productData.name.toLowerCase().replace(/\s+/g, '-')}`,
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
          deliveryFee: 10,
          deliveryTime: '10-15 min'
        });
        
        await product.save();
      }
    }
    
    console.log('Zepto scraping completed successfully');
  } catch (error) {
    console.error('Error during Zepto scraping:', error);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Helper function to generate mock product data
function generateMockProducts(category) {
  const mockProducts = [];
  const count = Math.floor(Math.random() * 10) + 5; // 5-15 products per category
  
  const vegetables = [
    { name: 'Tomato', unit: 'kg', min: 40, max: 80 },
    { name: 'Potato', unit: 'kg', min: 30, max: 50 },
    { name: 'Onion', unit: 'kg', min: 25, max: 60 },
    { name: 'Carrot', unit: 'kg', min: 50, max: 80 },
    { name: 'Cucumber', unit: 'kg', min: 40, max: 70 },
    { name: 'Capsicum', unit: 'kg', min: 60, max: 100 },
    { name: 'Cauliflower', unit: 'piece', min: 40, max: 70 },
    { name: 'Cabbage', unit: 'piece', min: 35, max: 60 }
  ];
  
  const fruits = [
    { name: 'Apple', unit: 'kg', min: 100, max: 180 },
    { name: 'Banana', unit: 'dozen', min: 50, max: 80 },
    { name: 'Orange', unit: 'kg', min: 80, max: 120 },
    { name: 'Watermelon', unit: 'piece', min: 50, max: 100 },
    { name: 'Mango', unit: 'kg', min: 150, max: 300 },
    { name: 'Papaya', unit: 'piece', min: 60, max: 120 },
    { name: 'Pineapple', unit: 'piece', min: 50, max: 100 }
  ];
  
  const dairy = [
    { name: 'Milk', unit: 'liter', min: 50, max: 80 },
    { name: 'Curd', unit: 'kg', min: 60, max: 90 },
    { name: 'Paneer', unit: '200g', min: 80, max: 120 },
    { name: 'Cheese', unit: '200g', min: 120, max: 180 },
    { name: 'Butter', unit: '500g', min: 220, max: 300 },
    { name: 'Ghee', unit: 'liter', min: 500, max: 700 }
  ];
  
  let productList;
  switch (category) {
    case 'Vegetables':
      productList = vegetables;
      break;
    case 'Fruits':
      productList = fruits;
      break;
    case 'Dairy':
      productList = dairy;
      break;
    default:
      productList = [...vegetables, ...fruits, ...dairy];
  }
  
  for (let i = 0; i < count && i < productList.length; i++) {
    const product = productList[i];
    const price = Math.floor(Math.random() * (product.max - product.min + 1)) + product.min;
    
    mockProducts.push({
      name: product.name,
      category,
      description: `Fresh ${product.name.toLowerCase()} available daily`,
      image: `https://source.unsplash.com/random/400x400/?${product.name.toLowerCase()}`,
      unit: product.unit,
      price,
      inStock: Math.random() > 0.1 // 90% chance it's in stock
    });
  }
  
  return mockProducts;
}

// Run the scraper once on import (for testing)
// In a real app, this would be scheduled via cron
// scrapeProducts().catch(console.error);