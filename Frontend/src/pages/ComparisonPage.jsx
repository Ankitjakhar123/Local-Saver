import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { ShoppingCart, AlertTriangle, Store, Clock, ChevronDown, TrendingDown, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import CompareTable from '../components/comparison/CompareTable';

const ComparisonPage = () => {
  const { productQuery } = useParams();
  const [searchParams] = useSearchParams();
  const pincode = searchParams.get('pincode');
  const { addToCart } = useCart();
  const { currentUser } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [comparisons, setComparisons] = useState([]);
  const [showPriceHistory, setShowPriceHistory] = useState(false);
  const [priceAlertSet, setPriceAlertSet] = useState(false);
  const [sortField, setSortField] = useState('price');
  const [sortDirection, setSortDirection] = useState('asc');
  
  // Sort handler for the dropdown
  const handleSort = (e) => {
    const [field, direction] = e.target.value.split(':');
    setSortField(field);
    setSortDirection(direction);
    
    // Sort the comparisons
    const sortedComps = [...comparisons].sort((a, b) => {
      return direction === 'asc' 
        ? a[field] > b[field] ? 1 : -1
        : a[field] < b[field] ? 1 : -1;
    });
    setComparisons(sortedComps);
  };
  
  // Simulate loading data from API
  useEffect(() => {
    // In a real app, this would fetch data from the backend API
    const fetchData = async () => {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(r => setTimeout(r, 1000));
      
      // Mock product data
      const mockProduct = {
        name: productQuery,
        image: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        category: 'Vegetables',
        unit: 'kg',
        description: 'Farm fresh and locally sourced',
        nutritionalInfo: 'Rich in Vitamin C and antioxidants',
        lastUpdated: new Date().toISOString()
      };
      
      // Mock comparison data
      const mockComparisons = [
        {
          vendor: 'Zepto',
          price: 65,
          inStock: true,
          deliveryFee: 10,
          deliveryTime: '10-15 min',
          packSize: '1 kg',
          logo: 'https://play-lh.googleusercontent.com/pCqeRDHhi0RCB37DI9nmO6pLbPi0LROUyodXE6mx6jHRpMk3GseitnWJLGYc7AfMgdI'
        },
        {
          vendor: 'Blinkit',
          price: 70,
          inStock: true,
          deliveryFee: 0,
          deliveryTime: '10 min',
          packSize: '1 kg',
          logo: 'https://play-lh.googleusercontent.com/QLzWO4Ooi6NSLlDdLqgofM9cW-xF_LLB9IvD6s_SXzpnWqiTwxxP_H1UtMUpFQ9N2PSBQ'
        },
        {
          vendor: 'BigBasket',
          price: 80,
          inStock: true,
          deliveryFee: 15,
          deliveryTime: '60-90 min',
          packSize: '1 kg',
          logo: 'https://play-lh.googleusercontent.com/O9VrQz6-P4U9y3rnUvA5g0cOweXgJYoGnYWlLUJdAUkgzABEgYkb9pxFm4m52oVrOw'
        },
        {
          vendor: 'Local Vendor',
          price: 60,
          inStock: true,
          deliveryFee: 0,
          deliveryTime: 'Pickup only',
          packSize: '1 kg',
          logo: 'https://images.pexels.com/photos/2574171/pexels-photo-2574171.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        }
      ];
      
      setProduct(mockProduct);
      setComparisons(mockComparisons);
      setLoading(false);
    };
    
    fetchData();
  }, [productQuery, pincode]);
  
  const handlePriceAlert = () => {
    if (!currentUser) {
      // Prompt to login (in a real app, this would show a login modal)
      alert('Please login to set price alerts');
      return;
    }
    
    // Toggle price alert
    setPriceAlertSet(!priceAlertSet);
  };
  
  const handleAddAllToCart = (vendorName) => {
    const vendorData = comparisons.find(c => c.vendor === vendorName);
    if (vendorData) {
      const item = {
        id: `${productQuery}-${vendorName}`.replace(/\s+/g, '-').toLowerCase(),
        name: productQuery,
        price: vendorData.price,
        vendor: vendorName,
        packSize: vendorData.packSize,
        image: product.image
      };
      
      addToCart(item);
    }
  };
  
  // Find the cheapest vendor
  const cheapestVendor = comparisons.length > 0 
    ? comparisons.reduce((prev, current) => (prev.price < current.price) ? prev : current) 
    : null;
  
  // Calculate potential savings
  const calculateSavings = () => {
    if (comparisons.length < 2) return 0;
    
    const highestPrice = Math.max(...comparisons.map(c => c.price));
    const lowestPrice = Math.min(...comparisons.map(c => c.price));
    
    return highestPrice - lowestPrice;
  };
  
  const savings = calculateSavings();
  const savingsPercentage = cheapestVendor 
    ? Math.round(((Math.max(...comparisons.map(c => c.price)) - cheapestVendor.price) / Math.max(...comparisons.map(c => c.price))) * 100) 
    : 0;
  
  return (
    <div>
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-amoled-accent-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p>Finding the best prices...</p>
        </div>
      ) : (
        <>
          {/* Product Info Section */}
          <section className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
              <div className="w-full md:w-1/3 mb-4 md:mb-0">
                <div className="rounded-xl overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-48 sm:h-64 object-cover" 
                  />
                </div>
              </div>
              
              <div className="w-full md:w-2/3">
                <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">{product.name}</h1>
                  
                  <div className="flex items-center">
                    <button 
                      onClick={handlePriceAlert}
                      className={`p-2 rounded-full mr-2 touch-manipulation ${
                        priceAlertSet 
                          ? 'bg-amoled-accent-primary text-amoled-black' 
                          : 'bg-amoled-gray-700 hover:bg-amoled-gray-600'
                      }`}
                      aria-label="Set price alert"
                    >
                      <AlertTriangle className="h-5 w-5" />
                    </button>
                    
                    <button 
                      onClick={() => setShowPriceHistory(!showPriceHistory)}
                      className={`p-2 rounded-full touch-manipulation ${
                        showPriceHistory 
                          ? 'bg-amoled-accent-secondary text-amoled-black' 
                          : 'bg-amoled-gray-700 hover:bg-amoled-gray-600'
                      }`}
                      aria-label="View price history"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                
                <div className="mb-4">
                  <span className="text-amoled-gray-300">Category: </span>
                  <span className="bg-amoled-gray-700 px-2 py-1 rounded-md text-sm">{product.category}</span>
                  
                  <div className="mt-2 flex items-center text-sm text-amoled-gray-300">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Last updated: {new Date(product.lastUpdated).toLocaleTimeString()} today</span>
                  </div>
                </div>
                
                {cheapestVendor && (
                  <div className="card bg-amoled-gray-700 mb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="text-sm text-amoled-gray-300 mb-1">Best Price</div>
                        <div className="text-2xl font-bold text-amoled-accent-primary">₹{cheapestVendor.price}</div>
                        <div className="text-sm">at {cheapestVendor.vendor}</div>
                      </div>
                      
                      {savings > 0 && (
                        <div className="bg-amoled-gray-800 p-3 rounded-lg text-center">
                          <div className="flex items-center text-amoled-accent-primary font-bold">
                            <TrendingDown className="h-4 w-4 mr-1" />
                            Save ₹{savings}
                          </div>
                          <div className="text-sm text-amoled-gray-300">{savingsPercentage}% cheaper</div>
                        </div>
                      )}
                      
                      <button 
                        onClick={() => handleAddAllToCart(cheapestVendor.vendor)}
                        className="btn btn-primary flex items-center justify-center w-full sm:w-auto touch-manipulation"
                      >
                        <ShoppingCart className="h-5 w-5 mr-2" />
                        Add to Basket
                      </button>
                    </div>
                  </div>
                )}
                
                <div className="text-amoled-gray-200 text-sm sm:text-base">
                  <p className="mb-3">{product.description}</p>
                  <p>{product.nutritionalInfo}</p>
                </div>
              </div>
            </div>
          </section>
          
          {/* Price History Section (Collapsible) */}
          <AnimatePresence>
            {showPriceHistory && (
              <motion.section 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-8 overflow-hidden"
              >
                <div className="card">
                  <h2 className="text-xl font-semibold mb-4">Price History</h2>
                  <div className="h-48 md:h-64 bg-amoled-gray-700 rounded-lg flex items-center justify-center">
                    <p className="text-amoled-gray-300">Price history graph would appear here</p>
                  </div>
                </div>
              </motion.section>
            )}
          </AnimatePresence>
          
          {/* Comparison Table */}
          <section className="mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
              <h2 className="text-xl font-semibold">Price Comparison</h2>
              
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative w-full sm:w-auto">
                  <select 
                    className="w-full sm:w-auto bg-amoled-gray-700 border border-amoled-gray-600 rounded-lg px-3 py-2 pr-8 appearance-none text-sm touch-manipulation"
                    onChange={handleSort}
                    value={`${sortField}:${sortDirection}`}
                    aria-label="Sort by"
                  >
                    <option value="price:asc">Price: Low to High</option>
                    <option value="price:desc">Price: High to Low</option>
                    <option value="deliveryTime:asc">Fastest Delivery</option>
                    <option value="deliveryFee:asc">Lowest Delivery Fee</option>
                    <option value="vendor:asc">Vendor Name</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none h-4 w-4 text-amoled-gray-300" />
                </div>
              </div>
            </div>
            <CompareTable comparisons={comparisons} product={product} onAddToCart={handleAddAllToCart} />
          </section>
          
          {/* Additional Information */}
          <section className="mb-8">
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Need to know</h2>
              
              <div className="text-amoled-gray-200">
                <p className="mb-2">• Prices are inclusive of all taxes</p>
                <p className="mb-2">• Delivery fees may apply and vary by vendor</p>
                <p className="mb-2">• Product availability is subject to change</p>
                <p>• Local vendor prices may require verification at the store</p>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default ComparisonPage;