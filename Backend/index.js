import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cron from 'node-cron';
import Clerk from '@clerk/clerk-sdk-node';
import { scrapeProducts } from './scrapers/zeptoScraper.js';
import priceRoutes from './routes/prices.js';
import vendorRoutes from './routes/vendors.js';
import subscriptionRoutes from './routes/subscriptions.js';

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Clerk 
const clerkMiddleware = Clerk.expressRequireAuth({
  // Optional: Customize the error response
  onError: (err, req, res) => {
    console.error('Clerk authentication error:', err);
    res.status(401).json({ error: 'Unauthorized access' });
  }
});

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/localsaver', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Public routes
app.get('/', (req, res) => {
  res.send('LocalSaver API is running!');
});

// Public API routes - these don't require authentication
app.use('/api/prices', priceRoutes);

// Protected routes - these require authentication
app.use('/api/vendor', clerkMiddleware, vendorRoutes);
app.use('/api/subscribe', clerkMiddleware, subscriptionRoutes);

// User-specific route to demonstrate Clerk authentication
app.get('/api/me', clerkMiddleware, (req, res) => {
  // auth.userId is now available in the request
  res.json({
    id: req.auth.userId,
    message: 'You are authenticated!',
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Clerk authentication enabled`);
});

// Schedule scraping job - every 3 hours
cron.schedule('0 */3 * * *', async () => {
  console.log('Running scheduled scraping job...');
  try {
    // This would scrape multiple platforms in a real app
    await scrapeProducts();
    console.log('Scraping completed successfully');
  } catch (error) {
    console.error('Error during scheduled scraping:', error);
  }
});

export default app;