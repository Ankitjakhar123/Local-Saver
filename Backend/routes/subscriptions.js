import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Subscribe to price alerts
router.post('/', async (req, res) => {
  try {
    const { userId, productId, targetPrice, notificationType } = req.body;
    
    if (!userId || !productId) {
      return res.status(400).json({ message: 'User ID and product ID are required' });
    }
    
    const user = await User.findOne({ uid: userId });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check if alert already exists
    const existingAlertIndex = user.priceAlerts.findIndex(
      alert => alert.productId.toString() === productId
    );
    
    if (existingAlertIndex >= 0) {
      // Update existing alert
      user.priceAlerts[existingAlertIndex] = {
        ...user.priceAlerts[existingAlertIndex],
        targetPrice: targetPrice || user.priceAlerts[existingAlertIndex].targetPrice,
        notified: false,
        createdAt: new Date()
      };
    } else {
      // Add new alert
      user.priceAlerts.push({
        productId,
        targetPrice,
        notified: false,
        createdAt: new Date()
      });
    }
    
    // Update notification preferences if specified
    if (notificationType) {
      switch (notificationType) {
        case 'email':
          user.preferences.emailNotifications = true;
          break;
        case 'push':
          user.preferences.pushNotifications = true;
          break;
        case 'sms':
          user.preferences.smsNotifications = true;
          break;
        case 'whatsapp':
          user.preferences.whatsappNotifications = true;
          break;
      }
    }
    
    await user.save();
    
    res.json({ message: 'Price alert subscription updated successfully' });
  } catch (error) {
    console.error('Error subscribing to price alert:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's price alert subscriptions
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const user = await User.findOne({ uid: userId })
      .populate('priceAlerts.productId');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user.priceAlerts);
  } catch (error) {
    console.error('Error fetching price alert subscriptions:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a price alert subscription
router.delete('/:userId/:alertId', async (req, res) => {
  try {
    const { userId, alertId } = req.params;
    
    const user = await User.findOne({ uid: userId });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Remove the alert
    user.priceAlerts = user.priceAlerts.filter(
      alert => alert._id.toString() !== alertId
    );
    
    await user.save();
    
    res.json({ message: 'Price alert deleted successfully' });
  } catch (error) {
    console.error('Error deleting price alert:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;