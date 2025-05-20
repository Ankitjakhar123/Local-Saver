import express from 'express';
import Vendor from '../models/Vendor.js';
import Product from '../models/Product.js';

const router = express.Router();

// Vendor registration
router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, storeName, address, serviceablePincodes } = req.body;
    
    // Check if vendor already exists
    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) {
      return res.status(400).json({ message: 'Vendor with this email already exists' });
    }
    
    // Create new vendor
    const newVendor = new Vendor({
      name,
      email,
      phone,
      storeName,
      address,
      serviceablePincodes: serviceablePincodes || []
    });
    
    await newVendor.save();
    
    res.status(201).json({ 
      message: 'Vendor registered successfully',
      vendorId: newVendor._id
    });
  } catch (error) {
    console.error('Error registering vendor:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Submit vendor prices
router.post('/submit', async (req, res) => {
  try {
    const { vendorId, products } = req.body;
    
    // Validate input
    if (!vendorId || !products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: 'Invalid input' });
    }
    
    // Find vendor
    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }
    
    // Update vendor's product listings
    vendor.products = products.map(product => ({
      ...product,
      updatedAt: new Date()
    }));
    
    await vendor.save();
    
    // Update prices in the main products collection
    for (const product of products) {
      // Try to find existing product
      let existingProduct = await Product.findOne({ 
        name: { $regex: new RegExp('^' + product.name + '$', 'i') },
        category: product.category
      });
      
      if (!existingProduct) {
        // Create new product if it doesn't exist
        existingProduct = new Product({
          name: product.name,
          category: product.category,
          unit: product.unit,
          currentPrices: []
        });
      }
      
      // Update or add vendor price
      const vendorPriceIndex = existingProduct.currentPrices.findIndex(
        p => p.vendor === vendor.storeName
      );
      
      const priceData = {
        vendor: vendor.storeName,
        price: product.price,
        inStock: product.inStock !== false,
        packSize: product.packSize,
        updatedAt: new Date()
      };
      
      if (vendorPriceIndex >= 0) {
        existingProduct.currentPrices[vendorPriceIndex] = priceData;
      } else {
        existingProduct.currentPrices.push(priceData);
      }
      
      // Add to price history
      existingProduct.priceHistory.push({
        date: new Date(),
        vendor: vendor.storeName,
        price: product.price,
        inStock: product.inStock !== false
      });
      
      await existingProduct.save();
    }
    
    res.json({ message: 'Prices submitted successfully' });
  } catch (error) {
    console.error('Error submitting vendor prices:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get vendor products
router.get('/:vendorId/products', async (req, res) => {
  try {
    const { vendorId } = req.params;
    
    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }
    
    res.json(vendor.products);
  } catch (error) {
    console.error('Error fetching vendor products:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;