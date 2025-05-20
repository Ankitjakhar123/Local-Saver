 # LocalSaver

A real-time grocery price comparison platform that helps users find the best deals across multiple online delivery services and local vendors.

## 🚀 Features

- **Price Comparison**: Compare grocery prices from Zepto, Blinkit, BigBasket, and local vendors in real-time
- **Smart Basket**: Optimize your shopping by finding the cheapest combination of items from different sources
- **Price Trends**: Track price changes over time for your frequently purchased items
- **Price Alerts**: Get notified when prices drop for items on your watchlist
- **User Accounts**: Save your preferences, search history, and create shopping lists
- **Regular Updates**: Price data refreshed every 3 hours via automated web scraping

## 🔧 Tech Stack

### Frontend
- React.js with React Router for navigation
- Tailwind CSS for styling
- Framer Motion for animations
- Context API for state management

### Backend
- Express.js REST API
- MongoDB database with Mongoose
- Firebase for authentication
- Puppeteer for web scraping
- Node-cron for scheduled tasks

## 📋 Prerequisites

- Node.js (v16+)
- MongoDB
- npm or yarn

## ⚙️ Installation

### Clone the repository
```bash
git clone https://github.com/yourusername/localsaver.git
cd localsaver
```

### Setup Backend
```bash
cd Backend
npm install
# Create a .env file with your MongoDB connection string and other environment variables
npm start
```

### Setup Frontend
```bash
cd Frontend
npm install
npm run dev
```

## 🌐 Environment Variables

Create a `.env` file in the Backend directory with the following variables:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FIREBASE_API_KEY=your_firebase_api_key
```

## 🚦 Usage

1. Register for an account or log in
2. Search for grocery items
3. Compare prices across different vendors
4. Add items to your Smart Basket for optimized shopping
5. Set up price alerts for items you regularly purchase

## 📚 Learning Outcomes

Building this project provides experience with:
- Full-stack JavaScript development
- Web scraping and data processing
- MongoDB database design
- User authentication flows
- Price comparison algorithms
- Scheduled tasks and automation
- Responsive UI design

## 📝 Notes

This project is for educational purposes and demonstrates web scraping techniques, data processing, and full-stack development.

## 📄 License

MIT