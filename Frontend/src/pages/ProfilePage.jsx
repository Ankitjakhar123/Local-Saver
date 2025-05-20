import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Clock, Package, Bell, Bookmark, LogOut } from 'lucide-react';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  
  // Mock user data
  const user = {
    name: 'Alex Johnson',
    email: 'alex@example.com',
    joinDate: 'January 2023',
    phoneNumber: '+91 98765 43210'
  };
  
  // Mock order history
  const orders = [
    { 
      id: 'ORD123456',
      date: '12 May 2023',
      items: ['Rice', 'Wheat Flour', 'Sugar'],
      totalSavings: '₹150',
      status: 'Completed'
    },
    { 
      id: 'ORD123457',
      date: '5 May 2023',
      items: ['Onions', 'Potatoes', 'Milk'],
      totalSavings: '₹120',
      status: 'Completed'
    }
  ];
  
  // Mock price alerts
  const priceAlerts = [
    {
      item: 'Tomatoes',
      targetPrice: '₹40/kg',
      currentPrice: '₹60/kg',
      status: 'Waiting for price drop'
    },
    {
      item: 'Apples',
      targetPrice: '₹100/kg',
      currentPrice: '₹95/kg',
      status: 'Price alert triggered!'
    }
  ];
  
  // Mock saved searches
  const savedSearches = [
    { query: 'Rice', date: '10 May 2023' },
    { query: 'Wheat Flour', date: '8 May 2023' },
    { query: 'Cooking Oil', date: '5 May 2023' }
  ];
  
  return (
    <div className="mb-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="card bg-amoled-gray-800 mb-6">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="rounded-full bg-amoled-gray-700 p-4 w-24 h-24 flex items-center justify-center text-3xl">
              {user.name.charAt(0)}
            </div>
            
            <div className="text-center md:text-left">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-amoled-gray-300">{user.email}</p>
              <p className="text-sm text-amoled-gray-400">Member since {user.joinDate}</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <button
            onClick={() => setActiveTab('profile')}
            className={`card p-4 flex flex-col items-center transition-colors ${
              activeTab === 'profile' ? 'bg-amoled-accent-primary bg-opacity-20' : ''
            }`}
          >
            <User className="mb-2" />
            <span>Profile</span>
          </button>
          
          <button
            onClick={() => setActiveTab('orders')}
            className={`card p-4 flex flex-col items-center transition-colors ${
              activeTab === 'orders' ? 'bg-amoled-accent-primary bg-opacity-20' : ''
            }`}
          >
            <Package className="mb-2" />
            <span>Order History</span>
          </button>
          
          <button
            onClick={() => setActiveTab('alerts')}
            className={`card p-4 flex flex-col items-center transition-colors ${
              activeTab === 'alerts' ? 'bg-amoled-accent-primary bg-opacity-20' : ''
            }`}
          >
            <Bell className="mb-2" />
            <span>Price Alerts</span>
          </button>
          
          <button
            onClick={() => setActiveTab('searches')}
            className={`card p-4 flex flex-col items-center transition-colors ${
              activeTab === 'searches' ? 'bg-amoled-accent-primary bg-opacity-20' : ''
            }`}
          >
            <Bookmark className="mb-2" />
            <span>Saved Searches</span>
          </button>
        </div>
        
        {activeTab === 'profile' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card"
          >
            <h2 className="text-xl font-bold mb-4">Profile Details</h2>
            <div className="space-y-4">
              <div className="flex flex-wrap justify-between border-b border-amoled-gray-700 pb-3">
                <span className="text-amoled-gray-300">Full Name</span>
                <span className="font-medium">{user.name}</span>
              </div>
              <div className="flex flex-wrap justify-between border-b border-amoled-gray-700 pb-3">
                <span className="text-amoled-gray-300">Email Address</span>
                <span className="font-medium">{user.email}</span>
              </div>
              <div className="flex flex-wrap justify-between border-b border-amoled-gray-700 pb-3">
                <span className="text-amoled-gray-300">Phone Number</span>
                <span className="font-medium">{user.phoneNumber}</span>
              </div>
              <div className="flex flex-wrap justify-between pb-3">
                <span className="text-amoled-gray-300">Member Since</span>
                <span className="font-medium">{user.joinDate}</span>
              </div>
            </div>
            
            <div className="mt-6">
              <button className="btn btn-primary w-full">Edit Profile</button>
              
              <button className="btn btn-outline w-full mt-3 flex items-center justify-center">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </motion.div>
        )}
        
        {activeTab === 'orders' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card"
          >
            <h2 className="text-xl font-bold mb-4">Order History</h2>
            
            {orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map(order => (
                  <div key={order.id} className="border-b border-amoled-gray-700 pb-4 mb-4 last:border-0">
                    <div className="flex justify-between mb-2">
                      <div>
                        <h3 className="font-medium">{order.id}</h3>
                        <div className="flex items-center text-sm text-amoled-gray-300">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{order.date}</span>
                        </div>
                      </div>
                      <span className="bg-amoled-accent-primary bg-opacity-20 text-amoled-accent-primary text-sm py-1 px-3 rounded-full">
                        {order.status}
                      </span>
                    </div>
                    
                    <div className="mt-2">
                      <div className="text-sm text-amoled-gray-300 mb-1">Items:</div>
                      <div className="flex flex-wrap gap-2">
                        {order.items.map((item, i) => (
                          <span key={i} className="bg-amoled-gray-700 text-sm px-2 py-1 rounded">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-3 text-amoled-accent-primary font-medium">
                      Total Savings: {order.totalSavings}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-amoled-gray-300">You haven't placed any orders yet.</p>
                <button className="btn btn-primary mt-3">Start Shopping</button>
              </div>
            )}
          </motion.div>
        )}
        
        {activeTab === 'alerts' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card"
          >
            <h2 className="text-xl font-bold mb-4">Price Alerts</h2>
            
            {priceAlerts.length > 0 ? (
              <div className="space-y-4">
                {priceAlerts.map((alert, index) => (
                  <div key={index} className="border-b border-amoled-gray-700 pb-4 mb-4 last:border-0">
                    <div className="flex justify-between mb-2">
                      <h3 className="font-medium">{alert.item}</h3>
                      <span className={`text-sm py-1 px-3 rounded-full ${
                        alert.status.includes('triggered') 
                          ? 'bg-amoled-accent-primary bg-opacity-20 text-amoled-accent-primary'
                          : 'bg-amoled-gray-700 text-amoled-gray-300'
                      }`}>
                        {alert.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div>
                        <div className="text-sm text-amoled-gray-300 mb-1">Target Price:</div>
                        <div className="font-medium">{alert.targetPrice}</div>
                      </div>
                      <div>
                        <div className="text-sm text-amoled-gray-300 mb-1">Current Price:</div>
                        <div className="font-medium">{alert.currentPrice}</div>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex justify-end">
                      <button className="text-sm text-amoled-accent-primary hover:underline">
                        Edit Alert
                      </button>
                      <button className="text-sm text-amoled-accent-danger hover:underline ml-4">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-amoled-gray-300">You don't have any price alerts set up.</p>
                <button className="btn btn-primary mt-3">Create Price Alert</button>
              </div>
            )}
          </motion.div>
        )}
        
        {activeTab === 'searches' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card"
          >
            <h2 className="text-xl font-bold mb-4">Saved Searches</h2>
            
            {savedSearches.length > 0 ? (
              <div className="space-y-2">
                {savedSearches.map((search, index) => (
                  <div key={index} className="flex justify-between items-center border-b border-amoled-gray-700 py-3 last:border-0">
                    <div>
                      <div className="font-medium">{search.query}</div>
                      <div className="text-sm text-amoled-gray-300 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{search.date}</span>
                      </div>
                    </div>
                    <div>
                      <button className="text-amoled-accent-primary hover:underline text-sm">
                        Search Again
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-amoled-gray-300">You don't have any saved searches.</p>
                <button className="btn btn-primary mt-3">Start Searching</button>
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ProfilePage; 