import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [pincode, setPincode] = useState('');
  const [recentSearches, setRecentSearches] = useState([
    'Rice', 'Tomatoes', 'Milk', 'Sugar'
  ]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) return;
    
    // Store in recent searches
    if (!recentSearches.includes(searchQuery)) {
      setRecentSearches(prev => [searchQuery, ...prev.slice(0, 4)]);
    }
    
    // Navigate to comparison page
    navigate(`/compare/${searchQuery}${pincode ? `?pincode=${pincode}` : ''}`);
    setSearchQuery('');
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    navigate(`/compare/${suggestion}${pincode ? `?pincode=${pincode}` : ''}`);
    setShowSuggestions(false);
  };

  const handlePincodeChange = (e) => {
    const input = e.target.value;
    // Only allow numbers and limit to 6 digits (Indian pincodes)
    if ((/^\d*$/.test(input) && input.length <= 6) || input === '') {
      setPincode(input);
    }
  };

  return (
    <div className="w-full relative">
      <form onSubmit={handleSearch} className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amoled-gray-300" />
          <input 
            type="text" 
            className="input pl-10 w-full" 
            placeholder="Search for products..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          />
        </div>
        
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amoled-gray-300" />
          <input 
            type="text" 
            className="input pl-10 w-[120px]" 
            placeholder="Pincode" 
            value={pincode}
            onChange={handlePincodeChange}
          />
        </div>
        
        <button 
          type="submit" 
          className="btn btn-primary whitespace-nowrap"
        >
          Compare
        </button>
      </form>

      <AnimatePresence>
        {showSuggestions && recentSearches.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-1 z-50 bg-amoled-gray-800 rounded-lg shadow-xl border border-amoled-gray-700 max-h-60 overflow-y-auto"
          >
            <div className="p-2">
              <div className="text-sm text-amoled-gray-300 p-2">Recent Searches</div>
              <ul>
                {recentSearches.map((item, index) => (
                  <li key={index}>
                    <button 
                      onClick={() => handleSuggestionClick(item)}
                      className="w-full text-left p-3 hover:bg-amoled-gray-700 rounded-lg flex items-center space-x-2"
                    >
                      <Search className="w-4 h-4 text-amoled-gray-300" />
                      <span>{item}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;