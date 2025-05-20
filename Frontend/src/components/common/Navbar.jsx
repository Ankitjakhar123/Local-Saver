import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, ShoppingCart, Bell, Menu, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import SearchBar from './SearchBar';

const Navbar = ({ isMenuOpen, setIsMenuOpen }) => {
  const [pincode, setPincode] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { currentUser } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePincodeChange = (e) => {
    const input = e.target.value;
    // Only allow numbers and limit to 6 digits (Indian pincodes)
    if ((/^\d*$/.test(input) && input.length <= 6) || input === '') {
      setPincode(input);
    }
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <header 
      className={`sticky top-0 z-30 transition-all duration-300 ${
        isScrolled 
          ? 'bg-amoled-gray-900 shadow-lg' 
          : 'bg-gradient-to-b from-amoled-black to-transparent'
      }`}
    >
      <div className="container mx-auto px-3 sm:px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <button 
              onClick={() => setIsMenuOpen(true)} 
              className="mr-2 p-2 rounded-full hover:bg-amoled-gray-700 lg:hidden touch-manipulation"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
            <Link to="/" className="flex items-center">
              <span className="text-lg sm:text-xl font-bold text-amoled-accent-primary">LocalSaver.in</span>
            </Link>
          </div>
          
          {/* Desktop Search */}
          <div className="hidden md:flex items-center flex-1 max-w-xl mx-4">
            <SearchBar />
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link to="/" className="hover:text-amoled-accent-primary">Home</Link>
            <Link to="/smart-basket" className="hover:text-amoled-accent-primary">Smart Basket</Link>
            <Link to="/vendor" className="hover:text-amoled-accent-primary">For Vendors</Link>
          </div>
          
          {/* Action Icons */}
          <div className="flex items-center">
            <button 
              onClick={toggleSearch}
              className="md:hidden p-2 rounded-full hover:bg-amoled-gray-700 touch-manipulation"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            
            <div className="relative p-2 rounded-full hover:bg-amoled-gray-700 cursor-pointer touch-manipulation hidden sm:block">
              <MapPin className="h-5 w-5" />
              {pincode && (
                <span className="absolute -top-1 -right-1 bg-amoled-accent-primary text-amoled-black text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                  ✓
                </span>
              )}
            </div>
            
            <Link to="/profile" className="p-2 rounded-full hover:bg-amoled-gray-700 touch-manipulation hidden sm:block">
              <Bell className="h-5 w-5" />
            </Link>
            
            <Link to="/smart-basket" className="relative p-2 rounded-full hover:bg-amoled-gray-700 touch-manipulation">
              <ShoppingCart className="h-5 w-5" />
              {cart.items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-amoled-accent-danger text-amoled-black text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                  {cart.items.length}
                </span>
              )}
            </Link>
            
            {currentUser ? (
              <Link to="/profile" className="p-2 rounded-full hover:bg-amoled-gray-700 touch-manipulation">
                <User className="h-5 w-5" />
              </Link>
            ) : (
              <Link to="/login" className="hidden sm:block btn btn-primary text-sm">
                Login
              </Link>
            )}
          </div>
        </div>
        
        {/* Mobile Search - Conditionally shown */}
        {(showSearch || window.innerWidth >= 768) && (
          <div className="mt-3 md:hidden animate-fadeIn">
            <SearchBar />
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;