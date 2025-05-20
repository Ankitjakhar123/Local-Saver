import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// Get prices for a product by name and optional pincode
router.get('/', async (req, res) => {
  try {
    const { query, pincode, category } = req.query;
    
    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }
    
    // Build the search query
    const searchQuery = {
      $and: [
        {
          $or: [
            { name: { $regex: query, $options: 'i' } },
            { description: { $regex: query, $options: 'i' } }
          ]
        }
      ]
    };
    
    // Add category filter if provided
    if (category) {
      searchQuery.$and.push({ category });
    }
    
    // Find products matching the search query
    const products = await Product.find(searchQuery);
    
    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found matching your search' });
    }
    
    // If pincode is provided, filter vendors by serviceable pincodes
    let filteredProducts = products;
    if (pincode) {
      // This would be a more complex query in a real app that checks vendor serviceability
      // For now, we'll just pass through the products
      filteredProducts = products;
    }
    
    // Update search count for analytics
    for (const product of products) {
      product.searchCount += 1;
      await product.save();
    }
    
    res.json(filteredProducts);
  } catch (error) {
    console.error('Error fetching prices:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get trending products (most searched)
router.get('/trending', async (req, res) => {
  try {
    const trendingProducts = await Product.find()
      .sort({ searchCount: -1 })
      .limit(10);
    
    res.json(trendingProducts);
  } catch (error) {
    console.error('Error fetching trending products:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get price history for a specific product
router.get('/:productId/history', async (req, res) => {
  try {
    const { productId } = req.params;
    const { days } = req.query;
    
    const product = await Product.findById(productId);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Filter price history by number of days if specified
    let priceHistory = product.priceHistory;
    if (days) {
      const daysAgo = new Date();
      daysAgo.setDate(daysAgo.getDate() - parseInt(days));
      
      priceHistory = priceHistory.filter(record => record.date >= daysAgo);
    }
    
    res.json(priceHistory);
  } catch (error) {
    console.error('Error fetching price history:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;