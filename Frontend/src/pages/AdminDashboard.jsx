import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Users, ShoppingBag, Store, AlertTriangle, RefreshCcw } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock statistics data
  const stats = {
    totalUsers: 1256,
    activeUsers: 843,
    totalProductsTracked: 487,
    totalVendors: 12,
    priceAlerts: 76,
    avgSavings: '15%'
  };
  
  // Mock recent user sign ups
  const recentUsers = [
    { id: 1, name: 'Priya Sharma', email: 'priya@example.com', date: '2 hours ago' },
    { id: 2, name: 'Rahul Patel', email: 'rahul@example.com', date: '5 hours ago' },
    { id: 3, name: 'Anjali Singh', email: 'anjali@example.com', date: '1 day ago' },
    { id: 4, name: 'Vikram Mehta', email: 'vikram@example.com', date: '2 days ago' },
  ];
  
  // Mock popular products
  const popularProducts = [
    { id: 1, name: 'Tomatoes', searchCount: 245, priceFluctuation: '+12%' },
    { id: 2, name: 'Onions', searchCount: 198, priceFluctuation: '-8%' },
    { id: 3, name: 'Rice', searchCount: 176, priceFluctuation: '+2%' },
    { id: 4, name: 'Cooking Oil', searchCount: 154, priceFluctuation: '+5%' },
    { id: 5, name: 'Milk', searchCount: 132, priceFluctuation: '0%' },
  ];
  
  // Mock recent vendor registrations
  const recentVendors = [
    { id: 1, name: 'Krishna Vegetables', location: 'HSR Layout, Bangalore', date: '3 days ago', status: 'Pending' },
    { id: 2, name: 'Fresh Farm Produce', location: 'Indiranagar, Bangalore', date: '5 days ago', status: 'Approved' },
    { id: 3, name: 'Metro Supermarket', location: 'Koramangala, Bangalore', date: '1 week ago', status: 'Approved' },
  ];
  
  // Mock system issues
  const systemIssues = [
    { id: 1, type: 'Scraper Error', description: 'Zepto scraper failed to complete', time: '2 hours ago', status: 'Critical' },
    { id: 2, type: 'High Server Load', description: 'CPU usage above 80%', time: '12 hours ago', status: 'Warning' },
    { id: 3, type: 'Database Connection', description: 'Intermittent connection issues', time: '1 day ago', status: 'Resolved' },
  ];

  return (
    <div className="mb-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="card bg-gradient-to-r from-amoled-gray-900 to-amoled-gray-800 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-amoled-gray-300">Manage users, vendors, and monitor system health</p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <div className="card">
            <div className="text-amoled-accent-primary mb-1">
              <Users size={20} />
            </div>
            <p className="text-sm text-amoled-gray-300">Total Users</p>
            <h3 className="text-xl font-bold">{stats.totalUsers}</h3>
          </div>
          
          <div className="card">
            <div className="text-amoled-accent-primary mb-1">
              <Users size={20} />
            </div>
            <p className="text-sm text-amoled-gray-300">Active Users</p>
            <h3 className="text-xl font-bold">{stats.activeUsers}</h3>
          </div>
          
          <div className="card">
            <div className="text-amoled-accent-secondary mb-1">
              <ShoppingBag size={20} />
            </div>
            <p className="text-sm text-amoled-gray-300">Products Tracked</p>
            <h3 className="text-xl font-bold">{stats.totalProductsTracked}</h3>
          </div>
          
          <div className="card">
            <div className="text-amoled-accent-secondary mb-1">
              <Store size={20} />
            </div>
            <p className="text-sm text-amoled-gray-300">Vendors</p>
            <h3 className="text-xl font-bold">{stats.totalVendors}</h3>
          </div>
          
          <div className="card">
            <div className="text-amoled-accent-warning mb-1">
              <AlertTriangle size={20} />
            </div>
            <p className="text-sm text-amoled-gray-300">Price Alerts</p>
            <h3 className="text-xl font-bold">{stats.priceAlerts}</h3>
          </div>
          
          <div className="card">
            <div className="text-amoled-accent-primary mb-1">
              <BarChart3 size={20} />
            </div>
            <p className="text-sm text-amoled-gray-300">Avg. Savings</p>
            <h3 className="text-xl font-bold">{stats.avgSavings}</h3>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto gap-4 mb-6 pb-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-md whitespace-nowrap ${
              activeTab === 'overview' 
                ? 'bg-amoled-accent-primary bg-opacity-20 text-amoled-accent-primary' 
                : 'text-amoled-gray-300 hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-md whitespace-nowrap ${
              activeTab === 'users' 
                ? 'bg-amoled-accent-primary bg-opacity-20 text-amoled-accent-primary' 
                : 'text-amoled-gray-300 hover:text-white'
            }`}
          >
            Users
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-md whitespace-nowrap ${
              activeTab === 'products' 
                ? 'bg-amoled-accent-primary bg-opacity-20 text-amoled-accent-primary' 
                : 'text-amoled-gray-300 hover:text-white'
            }`}
          >
            Products
          </button>
          <button
            onClick={() => setActiveTab('vendors')}
            className={`px-4 py-2 rounded-md whitespace-nowrap ${
              activeTab === 'vendors' 
                ? 'bg-amoled-accent-primary bg-opacity-20 text-amoled-accent-primary' 
                : 'text-amoled-gray-300 hover:text-white'
            }`}
          >
            Vendors
          </button>
          <button
            onClick={() => setActiveTab('system')}
            className={`px-4 py-2 rounded-md whitespace-nowrap ${
              activeTab === 'system' 
                ? 'bg-amoled-accent-primary bg-opacity-20 text-amoled-accent-primary' 
                : 'text-amoled-gray-300 hover:text-white'
            }`}
          >
            System Health
          </button>
        </div>
        
        {/* Content for each tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="card"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Recent User Sign Ups</h2>
                <button className="text-sm text-amoled-accent-primary hover:underline">View All</button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-amoled-gray-300 border-b border-amoled-gray-700">
                      <th className="pb-2">Name</th>
                      <th className="pb-2">Email</th>
                      <th className="pb-2">Joined</th>
                      <th className="pb-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers.map(user => (
                      <tr key={user.id} className="border-b border-amoled-gray-800">
                        <td className="py-3">{user.name}</td>
                        <td className="py-3 text-amoled-gray-300">{user.email}</td>
                        <td className="py-3 text-sm text-amoled-gray-300">{user.date}</td>
                        <td className="py-3 text-right">
                          <button className="text-xs text-amoled-accent-primary">Details</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="card"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Popular Products</h2>
                <button className="text-sm text-amoled-accent-primary hover:underline">View All</button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-amoled-gray-300 border-b border-amoled-gray-700">
                      <th className="pb-2">Product</th>
                      <th className="pb-2">Searches</th>
                      <th className="pb-2">Price Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {popularProducts.map(product => (
                      <tr key={product.id} className="border-b border-amoled-gray-800">
                        <td className="py-3">{product.name}</td>
                        <td className="py-3">{product.searchCount}</td>
                        <td className={`py-3 ${
                          product.priceFluctuation.startsWith('+') 
                            ? 'text-amoled-accent-danger' 
                            : product.priceFluctuation.startsWith('-')
                              ? 'text-amoled-accent-primary'
                              : 'text-amoled-gray-300'
                        }`}>
                          {product.priceFluctuation}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="card"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Vendor Applications</h2>
                <button className="text-sm text-amoled-accent-primary hover:underline">View All</button>
              </div>
              
              <div className="space-y-4">
                {recentVendors.map(vendor => (
                  <div key={vendor.id} className="border-b border-amoled-gray-800 pb-4 last:border-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{vendor.name}</h3>
                        <p className="text-sm text-amoled-gray-300">{vendor.location}</p>
                        <p className="text-xs text-amoled-gray-400">Applied {vendor.date}</p>
                      </div>
                      <span className={`text-xs py-1 px-2 rounded-full ${
                        vendor.status === 'Approved' 
                          ? 'bg-amoled-accent-primary bg-opacity-20 text-amoled-accent-primary' 
                          : 'bg-amoled-accent-warning bg-opacity-20 text-amoled-accent-warning'
                      }`}>
                        {vendor.status}
                      </span>
                    </div>
                    
                    {vendor.status === 'Pending' && (
                      <div className="mt-3 flex space-x-2">
                        <button className="btn btn-xs btn-primary">Approve</button>
                        <button className="btn btn-xs btn-outline text-amoled-accent-danger border-amoled-accent-danger">Reject</button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="card"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">System Issues</h2>
                <button className="text-sm flex items-center gap-1 text-amoled-accent-primary hover:underline">
                  <RefreshCcw size={14} />
                  <span>Refresh</span>
                </button>
              </div>
              
              <div className="space-y-4">
                {systemIssues.map(issue => (
                  <div key={issue.id} className="border-b border-amoled-gray-800 pb-4 last:border-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{issue.type}</h3>
                        <p className="text-sm text-amoled-gray-300">{issue.description}</p>
                        <p className="text-xs text-amoled-gray-400">{issue.time}</p>
                      </div>
                      <span className={`text-xs py-1 px-2 rounded-full ${
                        issue.status === 'Critical' 
                          ? 'bg-amoled-accent-danger bg-opacity-20 text-amoled-accent-danger' 
                          : issue.status === 'Warning'
                            ? 'bg-amoled-accent-warning bg-opacity-20 text-amoled-accent-warning'
                            : 'bg-amoled-accent-primary bg-opacity-20 text-amoled-accent-primary'
                      }`}>
                        {issue.status}
                      </span>
                    </div>
                    
                    {(issue.status === 'Critical' || issue.status === 'Warning') && (
                      <div className="mt-3">
                        <button className="btn btn-xs btn-outline">Investigate</button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-amoled-gray-700 text-center">
                <button className="btn btn-primary btn-sm">
                  View All System Logs
                </button>
              </div>
            </motion.div>
          </div>
        )}
        
        {activeTab !== 'overview' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card"
          >
            <div className="text-center py-10">
              <h3 className="text-lg font-medium mb-2">
                {activeTab === 'users' && 'User Management'}
                {activeTab === 'products' && 'Product Management'}  
                {activeTab === 'vendors' && 'Vendor Management'}
                {activeTab === 'system' && 'System Health Dashboard'}
              </h3>
              <p className="text-amoled-gray-300 mb-4">This section is under development</p>
              <button className="btn btn-primary">
                {activeTab === 'users' && 'View User Data'}
                {activeTab === 'products' && 'View Product Data'}  
                {activeTab === 'vendors' && 'Manage Vendors'}
                {activeTab === 'system' && 'View System Logs'}
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default AdminDashboard; 