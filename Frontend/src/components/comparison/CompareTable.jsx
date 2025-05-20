import React, { useState } from 'react';
import { ShoppingCart, ExternalLink, Check, X } from 'lucide-react';
import { motion } from 'framer-motion';

const CompareTable = ({ comparisons, product, onAddToCart }) => {
  const [sortBy, setSortBy] = useState('price');
  const [sortDirection, setSortDirection] = useState('asc');
  
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('asc');
    }
  };
  
  // Sort comparisons
  const sortedComparisons = [...comparisons].sort((a, b) => {
    if (sortDirection === 'asc') {
      return a[sortBy] > b[sortBy] ? 1 : -1;
    } else {
      return a[sortBy] < b[sortBy] ? 1 : -1;
    }
  });
  
  // Calculate lowest price
  const lowestPrice = Math.min(...comparisons.map(c => c.price));
  
  // Table header for sorting
  const SortHeader = ({ field, label }) => (
    <th 
      className="cursor-pointer hover:bg-amoled-gray-700 transition-colors"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center space-x-1">
        <span>{label}</span>
        {sortBy === field && (
          <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
        )}
      </div>
    </th>
  );
  
  // Render mobile cards view
  const renderMobileView = () => (
    <div className="space-y-4 md:hidden">
      {sortedComparisons.map((comparison, index) => (
        <motion.div
          key={comparison.vendor}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className={`card p-4 ${comparison.price === lowestPrice ? 'border-l-4 border-amoled-accent-primary' : ''}`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-white flex items-center justify-center">
                <img 
                  src={comparison.logo} 
                  alt={comparison.vendor} 
                  className="w-8 h-8 object-contain"
                />
              </div>
              <span className="font-medium">{comparison.vendor}</span>
            </div>
            
            <div className={`text-xl ${comparison.price === lowestPrice ? 'text-amoled-accent-primary font-bold' : ''}`}>
              ₹{comparison.price}
              {comparison.price === lowestPrice && (
                <div className="text-xs bg-amoled-accent-primary text-amoled-black px-2 py-0.5 rounded-full inline-block ml-2">
                  Best Price
                </div>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-sm mb-3">
            <div>
              <span className="text-amoled-gray-300">Pack Size:</span>
              <div>{comparison.packSize}</div>
            </div>
            
            <div>
              <span className="text-amoled-gray-300">Delivery:</span>
              <div>{comparison.deliveryTime}</div>
            </div>
            
            <div>
              <span className="text-amoled-gray-300">Delivery Fee:</span>
              <div>
                {comparison.deliveryFee === 0 ? (
                  <span className="text-amoled-accent-primary">Free</span>
                ) : (
                  `₹${comparison.deliveryFee}`
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 mt-2">
            <button 
              onClick={() => onAddToCart(comparison.vendor)}
              className="btn btn-primary py-2 px-4 flex-1 flex items-center justify-center touch-manipulation"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </button>
            
            <a 
              href="#" 
              className="btn btn-outline py-2 px-4 flex-1 flex items-center justify-center touch-manipulation"
              onClick={(e) => e.preventDefault()} // Would link to the vendor's site in a real app
            >
              <ExternalLink className="h-5 w-5 mr-2" />
              Visit
            </a>
          </div>
        </motion.div>
      ))}
    </div>
  );
  
  // Render desktop table view
  const renderDesktopView = () => (
    <div className="hidden md:block overflow-x-auto">
      <table className="w-full">
        <thead className="bg-amoled-gray-800 text-left">
          <tr>
            <th className="p-3 rounded-tl-lg">Vendor</th>
            <SortHeader field="price" label="Price" />
            <th>Pack Size</th>
            <SortHeader field="deliveryTime" label="Delivery" />
            <SortHeader field="deliveryFee" label="Delivery Fee" />
            <th className="rounded-tr-lg">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-amoled-gray-700">
          {sortedComparisons.map((comparison, index) => (
            <motion.tr 
              key={comparison.vendor}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`bg-amoled-gray-800 ${comparison.price === lowestPrice ? 'border-l-4 border-amoled-accent-primary' : ''}`}
            >
              <td className="p-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-white flex items-center justify-center">
                    <img 
                      src={comparison.logo} 
                      alt={comparison.vendor} 
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <span className="font-medium">{comparison.vendor}</span>
                </div>
              </td>
              <td className={`p-3 ${comparison.price === lowestPrice ? 'text-amoled-accent-primary font-bold' : ''}`}>
                ₹{comparison.price}
                {comparison.price === lowestPrice && (
                  <span className="ml-2 text-xs bg-amoled-accent-primary text-amoled-black px-2 py-0.5 rounded-full">
                    Best Price
                  </span>
                )}
              </td>
              <td className="p-3">{comparison.packSize}</td>
              <td className="p-3">{comparison.deliveryTime}</td>
              <td className="p-3">
                {comparison.deliveryFee === 0 ? (
                  <span className="text-amoled-accent-primary">Free</span>
                ) : (
                  `₹${comparison.deliveryFee}`
                )}
              </td>
              <td className="p-3 flex items-center space-x-2">
                <button 
                  onClick={() => onAddToCart(comparison.vendor)}
                  className="btn btn-primary text-sm py-1 px-3 flex items-center"
                >
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  Add
                </button>
                
                <a 
                  href="#" 
                  className="btn btn-outline text-sm py-1 px-3 flex items-center"
                  onClick={(e) => e.preventDefault()} // Would link to the vendor's site in a real app
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Visit
                </a>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
  return (
    <>
      {renderMobileView()}
      {renderDesktopView()}
    </>
  );
};

export default CompareTable;