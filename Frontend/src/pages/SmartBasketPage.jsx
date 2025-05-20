import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Calculator, ShoppingCart, Plus, X, MinusCircle, PlusCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../contexts/CartContext';

const SmartBasketPage = () => {
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart, toggleVendor } = useCart();
  const [isCalculating, setIsCalculating] = useState(false);
  const [optimizedBasket, setOptimizedBasket] = useState(null);

  // Group cart items by vendor
  const itemsByVendor = cart.items.reduce((groups, item) => {
    const vendor = item.vendor || 'Unknown';
    if (!groups[vendor]) {
      groups[vendor] = [];
    }
    groups[vendor].push(item);
    return groups;
  }, {});

  // Calculate total price per vendor
  const vendorTotals = Object.keys(itemsByVendor).reduce((totals, vendor) => {
    totals[vendor] = itemsByVendor[vendor].reduce((sum, item) => 
      sum + (item.price * (item.quantity || 1)), 0
    );
    return totals;
  }, {});

  // Calculate overall total
  const cartTotal = Object.values(vendorTotals).reduce((sum, total) => sum + total, 0);

  const calculateSmartBasket = () => {
    setIsCalculating(true);
    
    // Simulate API call to backend for optimized basket calculation
    setTimeout(() => {
      // This is a simplified mock implementation
      // In a real app, this would be a complex algorithm that considers:
      // - item prices across vendors
      // - delivery fees
      // - minimum order values
      // - delivery times
      // - etc.
      
      // Mock optimized basket data
      const mockOptimizedBasket = {
        savings: 125,
        vendors: [
          {
            name: 'Zepto',
            items: cart.items.filter(item => item.id % 2 === 0).map(item => ({
              ...item,
              originalPrice: item.price + 5,
              optimizedPrice: item.price
            })),
            deliveryFee: 10,
            totalPrice: 240
          },
          {
            name: 'Blinkit',
            items: cart.items.filter(item => item.id % 2 === 1).map(item => ({
              ...item,
              originalPrice: item.price + 10,
              optimizedPrice: item.price
            })),
            deliveryFee: 0,
            totalPrice: 290
          }
        ],
        totalOriginal: 655,
        totalOptimized: 530
      };
      
      setOptimizedBasket(mockOptimizedBasket);
      setIsCalculating(false);
    }, 2000);
  };

  const handleClearOptimization = () => {
    setOptimizedBasket(null);
  };

  // If cart is empty, show empty state
  if (cart.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <div className="rounded-full bg-amoled-gray-800 p-5 mb-4">
          <ShoppingCart className="h-10 w-10 text-amoled-gray-400" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Your Smart Basket is Empty</h1>
        <p className="text-amoled-gray-300 mb-6 text-center max-w-md">
          Add items to your basket to see price comparisons and find the best deals across all platforms.
        </p>
        <Link to="/" className="btn btn-primary">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Smart Basket</h1>
          <p className="text-amoled-gray-300">
            Compare prices and find the best combination of vendors to save money.
          </p>
        </div>
        
        <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
          <button 
            onClick={clearCart}
            className="btn btn-outline flex items-center"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Basket
          </button>
          
          {!optimizedBasket && (
            <button 
              onClick={calculateSmartBasket}
              className="btn btn-primary flex items-center"
              disabled={isCalculating}
            >
              {isCalculating ? (
                <>
                  <div className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin mr-2"></div>
                  Calculating...
                </>
              ) : (
                <>
                  <Calculator className="h-4 w-4 mr-2" />
                  Optimize Basket
                </>
              )}
            </button>
          )}
          
          {optimizedBasket && (
            <button 
              onClick={handleClearOptimization}
              className="btn btn-outline flex items-center"
            >
              <X className="h-4 w-4 mr-2" />
              Clear Optimization
            </button>
          )}
        </div>
      </div>

      {/* Vendor Filter Options */}
      <div className="mb-6">
        <div className="card p-4">
          <h2 className="font-medium mb-3">Include Vendors:</h2>
          <div className="flex flex-wrap gap-3">
            {Object.keys(cart.vendors).map(vendor => (
              <button
                key={vendor}
                onClick={() => toggleVendor(vendor)}
                className={`px-3 py-1 rounded-full text-sm ${
                  cart.vendors[vendor]
                    ? 'bg-amoled-accent-primary text-amoled-black'
                    : 'bg-amoled-gray-700 text-amoled-gray-300'
                }`}
              >
                {vendor.charAt(0).toUpperCase() + vendor.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Regular Basket View */}
      {!optimizedBasket && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Your Items</h2>
          
          <div className="grid gap-4">
            {cart.items.map(item => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="card"
              >
                <div className="flex items-center">
                  <div className="w-16 h-16 rounded-lg overflow-hidden mr-4">
                    <img 
                      src={item.image || 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} 
                      alt={item.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{item.name}</h3>
                      <div className="text-amoled-accent-primary font-bold">₹{item.price}</div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-sm text-amoled-gray-300">
                        {item.vendor || 'Unknown'} • {item.packSize || '1 unit'}
                      </div>
                      
                      <div className="flex items-center">
                        <button 
                          onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                          className="p-1 text-amoled-gray-300 hover:text-white"
                          disabled={(item.quantity || 1) <= 1}
                        >
                          <MinusCircle className="h-5 w-5" />
                        </button>
                        
                        <span className="mx-2 w-8 text-center">{item.quantity || 1}</span>
                        
                        <button 
                          onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                          className="p-1 text-amoled-gray-300 hover:text-white"
                        >
                          <PlusCircle className="h-5 w-5" />
                        </button>
                        
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 ml-2 text-amoled-accent-danger hover:bg-amoled-gray-700 rounded-full"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            
            <div className="card bg-amoled-gray-700">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">Current Total:</h3>
                <div className="text-xl font-bold">₹{cartTotal}</div>
              </div>
              
              {Object.keys(vendorTotals).length > 0 && (
                <div className="mt-3 pt-3 border-t border-amoled-gray-600">
                  <h4 className="text-sm text-amoled-gray-300 mb-2">Breakdown by Vendor:</h4>
                  <ul className="space-y-1">
                    {Object.entries(vendorTotals).map(([vendor, total]) => (
                      <li key={vendor} className="flex justify-between text-sm">
                        <span>{vendor}</span>
                        <span>₹{total}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Optimized Basket View */}
      {optimizedBasket && (
        <div className="mb-6">
          <div className="card bg-amoled-gray-700 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-center p-4">
              <div>
                <h2 className="text-xl font-bold">Smart Basket Results</h2>
                <p className="text-amoled-gray-300">
                  The most cost-effective way to purchase your items
                </p>
              </div>
              
              <div className="mt-4 md:mt-0 text-center">
                <div className="text-amoled-accent-primary text-2xl font-bold">
                  Save ₹{optimizedBasket.savings}
                </div>
                <div className="text-sm text-amoled-gray-300">
                  {((optimizedBasket.savings / optimizedBasket.totalOriginal) * 100).toFixed(0)}% cheaper than buying everything from one vendor
                </div>
              </div>
            </div>
          </div>
          
          {optimizedBasket.vendors.map((vendor, index) => (
            <div key={vendor.name} className="mb-6">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-2">
                  <img 
                    src={`https://via.placeholder.com/40?text=${vendor.name[0]}`} 
                    alt={vendor.name} 
                    className="w-6 h-6 object-contain rounded-full" 
                  />
                </div>
                <h3 className="text-lg font-semibold">{vendor.name}</h3>
              </div>
              
              <div className="card mb-2">
                {vendor.items.map(item => (
                  <div key={item.id} className="py-3 flex items-center border-b border-amoled-gray-700 last:border-0">
                    <div className="w-12 h-12 rounded-lg overflow-hidden mr-3">
                      <img 
                        src={item.image || 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} 
                        alt={item.name} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h4 className="font-medium">{item.name}</h4>
                          <div className="text-sm text-amoled-gray-300">{item.packSize || '1 unit'} × {item.quantity || 1}</div>
                        </div>
                        
                        <div className="text-right">
                          <div className="font-bold text-amoled-accent-primary">₹{item.optimizedPrice}</div>
                          <div className="text-sm text-amoled-gray-300 line-through">₹{item.originalPrice}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="pt-3 border-t border-amoled-gray-700">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Subtotal</div>
                      <div className="text-sm text-amoled-gray-300">Delivery fee</div>
                    </div>
                    
                    <div className="text-right">
                      <div>₹{vendor.totalPrice - vendor.deliveryFee}</div>
                      <div className="text-sm text-amoled-gray-300">
                        {vendor.deliveryFee === 0 ? 'Free' : `₹${vendor.deliveryFee}`}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mb-6">
                <button className="btn btn-primary">
                  Order from {vendor.name}
                </button>
              </div>
            </div>
          ))}
          
          <div className="card bg-amoled-gray-700">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold">Original Total:</h3>
              <div className="text-lg line-through text-amoled-gray-300">₹{optimizedBasket.totalOriginal}</div>
            </div>
            
            <div className="flex justify-between items-center text-amoled-accent-primary">
              <h3 className="font-bold">Smart Basket Total:</h3>
              <div className="text-xl font-bold">₹{optimizedBasket.totalOptimized}</div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-amoled-gray-600 text-sm text-amoled-gray-300">
              <p>Note: Actual prices may vary at the time of purchase. Delivery times and availability are subject to change.</p>
            </div>
          </div>
        </div>
      )}

      {/* Add More Items Section */}
      <div className="mb-6">
        <div className="card p-4 bg-amoled-gray-700 hover:bg-amoled-gray-600 transition-colors cursor-pointer">
          <Link to="/" className="flex items-center justify-center">
            <Plus className="h-5 w-5 mr-2" />
            <span>Add More Items</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SmartBasketPage;