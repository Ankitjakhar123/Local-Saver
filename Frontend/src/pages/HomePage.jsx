import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart2, ShoppingCart, Bell, TrendingUp, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import ProductCard from '../components/products/ProductCard';

const HomePage = () => {
  // Mock data for demonstration
  const popularItems = [
    { 
      id: 1, 
      name: 'Tomatoes',
      image: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      priceRange: '₹40 - ₹80',
      unit: 'per kg',
      savings: '50%'
    },
    { 
      id: 2, 
      name: 'Onions',
      image: 'https://images.pexels.com/photos/4197447/pexels-photo-4197447.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      priceRange: '₹25 - ₹40',
      unit: 'per kg',
      savings: '37%'
    },
    { 
      id: 3, 
      name: 'Potatoes',
      image: 'https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      priceRange: '₹30 - ₹50',
      unit: 'per kg',
      savings: '40%'
    },
    { 
      id: 4, 
      name: 'Milk',
      image: 'https://images.pexels.com/photos/2064129/pexels-photo-2064129.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      priceRange: '₹55 - ₹70',
      unit: 'per liter',
      savings: '21%'
    },
  ];

  const recentSearches = ['Rice', 'Wheat Flour', 'Sugar', 'Cooking Oil'];
  
  const priceTrends = [
    { item: 'Onions', change: '+15%', direction: 'up', message: 'Prices rising due to seasonal changes' },
    { item: 'Bananas', change: '-20%', direction: 'down', message: 'Good deals available on Zepto' },
    { item: 'Sugar', change: '-5%', direction: 'down', message: 'Slight decrease across vendors' },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="mb-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card bg-gradient-to-r from-amoled-gray-900 to-amoled-gray-800 p-6 md:p-8"
        >
          <h1 className="text-2xl md:text-3xl font-bold mb-4">Find the Best Grocery Deals Near You</h1>
          <p className="text-amoled-gray-100 mb-6">Compare prices from Zepto, Blinkit, BigBasket, and local vendors in real-time.</p>
        </motion.div>
      </section>
      
      {/* Popular Categories */}
      <section className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Popular Categories</h2>
          <Link to="/categories" className="text-amoled-accent-primary hover:underline">View All</Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="card hover:bg-amoled-gray-700 transition-colors cursor-pointer flex flex-col items-center justify-center py-4"
          >
            <div className="rounded-full bg-amoled-accent-primary bg-opacity-20 p-4 mb-3">
              <img src="https://images.pexels.com/photos/2733918/pexels-photo-2733918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                   alt="Vegetables" 
                   className="w-10 h-10 object-cover rounded-full" />
            </div>
            <span>Vegetables</span>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="card hover:bg-amoled-gray-700 transition-colors cursor-pointer flex flex-col items-center justify-center py-4"
          >
            <div className="rounded-full bg-amoled-accent-secondary bg-opacity-20 p-4 mb-3">
              <img src="https://images.pexels.com/photos/8566459/pexels-photo-8566459.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                   alt="Fruits" 
                   className="w-10 h-10 object-cover rounded-full" />
            </div>
            <span>Fruits</span>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="card hover:bg-amoled-gray-700 transition-colors cursor-pointer flex flex-col items-center justify-center py-4"
          >
            <div className="rounded-full bg-amoled-accent-warning bg-opacity-20 p-4 mb-3">
              <img src="https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                   alt="Dairy" 
                   className="w-10 h-10 object-cover rounded-full" />
            </div>
            <span>Dairy</span>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="card hover:bg-amoled-gray-700 transition-colors cursor-pointer flex flex-col items-center justify-center py-4"
          >
            <div className="rounded-full bg-amoled-accent-danger bg-opacity-20 p-4 mb-3">
              <img src="https://images.pexels.com/photos/1393382/pexels-photo-1393382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                   alt="Staples" 
                   className="w-10 h-10 object-cover rounded-full" />
            </div>
            <span>Staples</span>
          </motion.div>
        </div>
      </section>

      {/* Popular Items with Best Savings */}
      <section className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Best Savings Today</h2>
          <Link to="/compare/popular" className="text-amoled-accent-primary hover:underline">View All</Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {popularItems.map(item => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>

      {/* Recent Searches & Price Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Recent Searches */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Recent Searches</h2>
          <div className="card">
            <ul className="divide-y divide-amoled-gray-700">
              {recentSearches.map((search, index) => (
                <li key={index} className="py-3 flex justify-between items-center">
                  <span>{search}</span>
                  <Link to={`/compare/${search}`} className="text-sm text-amoled-accent-primary">
                    Compare Again
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-amoled-gray-700">
              <Link 
                to="/profile/searches" 
                className="text-amoled-accent-primary text-sm hover:underline flex items-center justify-center"
              >
                View All Searches
              </Link>
            </div>
          </div>
        </section>

        {/* Price Trends */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Price Trends</h2>
          <div className="card">
            <ul className="divide-y divide-amoled-gray-700">
              {priceTrends.map((trend, index) => (
                <li key={index} className="py-3 flex items-start">
                  <div className={`rounded-full p-2 mr-3 ${
                    trend.direction === 'up' 
                      ? 'bg-amoled-accent-danger bg-opacity-20' 
                      : 'bg-amoled-accent-primary bg-opacity-20'
                  }`}>
                    {trend.direction === 'up' 
                      ? <TrendingUp className="h-4 w-4 text-amoled-accent-danger" /> 
                      : <TrendingUp className="h-4 w-4 text-amoled-accent-primary" />
                    }
                  </div>
                  <div>
                    <div className="flex items-center">
                      <span className="font-medium">{trend.item}</span>
                      <span className={`ml-2 text-sm ${
                        trend.direction === 'up' 
                          ? 'text-amoled-accent-danger' 
                          : 'text-amoled-accent-primary'
                      }`}>
                        {trend.change}
                      </span>
                    </div>
                    <p className="text-sm text-amoled-gray-300">{trend.message}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <Link 
                to="/price-alerts" 
                className="btn btn-outline w-full flex items-center justify-center"
              >
                <Bell className="h-4 w-4 mr-2" />
                Set Up Price Alerts
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Features */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-6">Why Choose LocalSaver.in?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            whileHover={{ y: -5 }}
            className="card"
          >
            <div className="rounded-full bg-amoled-gray-700 w-12 h-12 flex items-center justify-center mb-4">
              <BarChart2 className="h-6 w-6 text-amoled-accent-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">Real-time Price Comparison</h3>
            <p className="text-amoled-gray-200">Compare prices across multiple platforms and local vendors in real-time.</p>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -5 }}
            className="card"
          >
            <div className="rounded-full bg-amoled-gray-700 w-12 h-12 flex items-center justify-center mb-4">
              <ShoppingCart className="h-6 w-6 text-amoled-accent-secondary" />
            </div>
            <h3 className="text-lg font-medium mb-2">Smart Basket</h3>
            <p className="text-amoled-gray-200">Our algorithm finds the cheapest combination of items from different sources.</p>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -5 }}
            className="card"
          >
            <div className="rounded-full bg-amoled-gray-700 w-12 h-12 flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-amoled-accent-warning" />
            </div>
            <h3 className="text-lg font-medium mb-2">Daily Updates</h3>
            <p className="text-amoled-gray-200">Fresh price data updated every 3 hours to ensure accuracy.</p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="card bg-gradient-to-r from-amoled-gray-800 to-amoled-gray-900 p-6 md:p-8 text-center"
        >
          <h2 className="text-xl md:text-2xl font-bold mb-3">Ready to start saving?</h2>
          <p className="text-amoled-gray-200 mb-6 max-w-2xl mx-auto">Create an account to save your favorite items, set up price alerts, and access the Smart Basket feature.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="btn btn-primary">Sign Up - It's Free</Link>
            <Link to="/how-it-works" className="btn btn-outline">Learn More</Link>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default HomePage;