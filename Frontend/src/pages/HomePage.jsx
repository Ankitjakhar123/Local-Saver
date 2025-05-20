import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart2, ShoppingCart, Bell, TrendingUp, Zap, ChevronRight } from 'lucide-react';
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
    <div className="px-1 sm:px-0">
      {/* Hero Section */}
      <section className="mb-6 sm:mb-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card bg-gradient-to-r from-amoled-gray-900 to-amoled-gray-800 p-4 sm:p-6 md:p-8"
        >
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4">Find the Best Grocery Deals Near You</h1>
          <p className="text-amoled-gray-100 text-sm sm:text-base mb-4 sm:mb-6">Compare prices from Zepto, Blinkit, BigBasket, and local vendors in real-time.</p>
        </motion.div>
      </section>
      
      {/* Popular Categories */}
      <section className="mb-6 sm:mb-10">
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <h2 className="text-lg sm:text-xl font-semibold">Popular Categories</h2>
          <Link to="/categories" className="text-amoled-accent-primary hover:underline text-sm flex items-center">
            View All
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="card hover:bg-amoled-gray-700 transition-colors cursor-pointer flex flex-col items-center justify-center py-3 sm:py-4 touch-manipulation"
          >
            <div className="rounded-full bg-amoled-accent-primary bg-opacity-20 p-3 sm:p-4 mb-2 sm:mb-3">
              <img src="https://images.pexels.com/photos/2733918/pexels-photo-2733918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                   alt="Vegetables" 
                   className="w-8 h-8 sm:w-10 sm:h-10 object-cover rounded-full" />
            </div>
            <span className="text-sm sm:text-base">Vegetables</span>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="card hover:bg-amoled-gray-700 transition-colors cursor-pointer flex flex-col items-center justify-center py-3 sm:py-4 touch-manipulation"
          >
            <div className="rounded-full bg-amoled-accent-secondary bg-opacity-20 p-3 sm:p-4 mb-2 sm:mb-3">
              <img src="https://images.pexels.com/photos/8566459/pexels-photo-8566459.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                   alt="Fruits" 
                   className="w-8 h-8 sm:w-10 sm:h-10 object-cover rounded-full" />
            </div>
            <span className="text-sm sm:text-base">Fruits</span>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="card hover:bg-amoled-gray-700 transition-colors cursor-pointer flex flex-col items-center justify-center py-3 sm:py-4 touch-manipulation"
          >
            <div className="rounded-full bg-amoled-accent-warning bg-opacity-20 p-3 sm:p-4 mb-2 sm:mb-3">
              <img src="https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                   alt="Dairy" 
                   className="w-8 h-8 sm:w-10 sm:h-10 object-cover rounded-full" />
            </div>
            <span className="text-sm sm:text-base">Dairy</span>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="card hover:bg-amoled-gray-700 transition-colors cursor-pointer flex flex-col items-center justify-center py-3 sm:py-4 touch-manipulation"
          >
            <div className="rounded-full bg-amoled-accent-danger bg-opacity-20 p-3 sm:p-4 mb-2 sm:mb-3">
              <img src="https://images.pexels.com/photos/1393382/pexels-photo-1393382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                   alt="Staples" 
                   className="w-8 h-8 sm:w-10 sm:h-10 object-cover rounded-full" />
            </div>
            <span className="text-sm sm:text-base">Staples</span>
          </motion.div>
        </div>
      </section>

      {/* Popular Items with Best Savings */}
      <section className="mb-6 sm:mb-10">
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <h2 className="text-lg sm:text-xl font-semibold">Best Savings Today</h2>
          <Link to="/compare/popular" className="text-amoled-accent-primary hover:underline text-sm flex items-center">
            View All
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {popularItems.map(item => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>

      {/* Recent Searches & Price Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-10">
        {/* Recent Searches */}
        <section>
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Recent Searches</h2>
          <div className="card">
            <ul className="divide-y divide-amoled-gray-700">
              {recentSearches.map((search, index) => (
                <li key={index} className="py-3 flex justify-between items-center">
                  <span className="text-sm sm:text-base">{search}</span>
                  <Link 
                    to={`/compare/${search}`} 
                    className="text-xs sm:text-sm text-amoled-accent-primary px-2 py-1 sm:px-3 sm:py-1.5 border border-amoled-accent-primary rounded-full hover:bg-amoled-accent-primary hover:text-amoled-black transition-colors touch-manipulation"
                  >
                    Compare
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-3 sm:pt-4 border-t border-amoled-gray-700">
              <Link 
                to="/profile/searches" 
                className="text-amoled-accent-primary text-sm hover:underline flex items-center justify-center touch-manipulation"
              >
                View All Searches
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
        </section>

        {/* Price Trends */}
        <section>
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Price Trends</h2>
          <div className="card">
            <ul className="divide-y divide-amoled-gray-700">
              {priceTrends.map((trend, index) => (
                <li key={index} className="py-3 flex items-start">
                  <div className={`rounded-full p-2 mr-2 sm:mr-3 ${
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
                      <span className="font-medium text-sm sm:text-base">{trend.item}</span>
                      <span className={`ml-2 text-xs sm:text-sm ${
                        trend.direction === 'up' 
                          ? 'text-amoled-accent-danger' 
                          : 'text-amoled-accent-primary'
                      }`}>
                        {trend.change}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-amoled-gray-300">{trend.message}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <Link 
                to="/price-alerts" 
                className="btn btn-outline w-full flex items-center justify-center py-2 text-sm touch-manipulation"
              >
                <Bell className="h-4 w-4 mr-2" />
                Set Up Price Alerts
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Features */}
      <section className="mb-6 sm:mb-10">
        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-6">Why Choose LocalSaver.in?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          <motion.div 
            whileHover={{ y: -5 }}
            className="card"
          >
            <div className="rounded-full bg-amoled-gray-700 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mb-3 sm:mb-4">
              <BarChart2 className="h-5 w-5 sm:h-6 sm:w-6 text-amoled-accent-primary" />
            </div>
            <h3 className="text-base sm:text-lg font-medium mb-1 sm:mb-2">Real-time Price Comparison</h3>
            <p className="text-sm text-amoled-gray-200">Compare prices across multiple platforms and local vendors in real-time.</p>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -5 }}
            className="card"
          >
            <div className="rounded-full bg-amoled-gray-700 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mb-3 sm:mb-4">
              <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6 text-amoled-accent-secondary" />
            </div>
            <h3 className="text-base sm:text-lg font-medium mb-1 sm:mb-2">Smart Basket</h3>
            <p className="text-sm text-amoled-gray-200">Our algorithm finds the cheapest combination of items from different sources.</p>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -5 }}
            className="card sm:col-span-2 md:col-span-1"
          >
            <div className="rounded-full bg-amoled-gray-700 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mb-3 sm:mb-4">
              <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-amoled-accent-warning" />
            </div>
            <h3 className="text-base sm:text-lg font-medium mb-1 sm:mb-2">Daily Updates</h3>
            <p className="text-sm text-amoled-gray-200">Fresh price data updated every 3 hours to ensure accuracy.</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;