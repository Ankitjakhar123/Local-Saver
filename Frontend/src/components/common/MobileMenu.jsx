import React from 'react';
import { Link } from 'react-router-dom';
import { X, Home, ShoppingCart, BarChart2, Bell, User, Settings, LogOut, Store, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

const MobileMenu = ({ isOpen, setIsOpen }) => {
  const { currentUser, logout } = useAuth();

  const menuVariants = {
    closed: {
      x: '-100%',
      transition: {
        type: 'tween',
        duration: 0.3
      }
    },
    open: {
      x: 0,
      transition: {
        type: 'tween',
        duration: 0.3,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { 
      opacity: 1, 
      x: 0,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          />
          
          <motion.div 
            className="fixed inset-y-0 left-0 max-w-[280px] w-full bg-amoled-gray-900 shadow-lg z-50 lg:hidden overflow-y-auto"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="flex flex-col h-full p-4">
              <div className="flex justify-between items-center mb-8">
                <Link to="/" className="text-2xl font-bold text-amoled-accent-primary">
                  LocalSaver.in
                </Link>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="p-2 rounded-full hover:bg-amoled-gray-700"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <nav className="flex-1">
                <ul className="space-y-2">
                  <motion.li variants={itemVariants}>
                    <Link 
                      to="/" 
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-amoled-gray-700 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <Home className="h-5 w-5 text-amoled-accent-primary" />
                      <span>Home</span>
                    </Link>
                  </motion.li>
                  
                  <motion.li variants={itemVariants}>
                    <Link 
                      to="/smart-basket" 
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-amoled-gray-700 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <ShoppingCart className="h-5 w-5 text-amoled-accent-primary" />
                      <span>Smart Basket</span>
                    </Link>
                  </motion.li>
                  
                  <motion.li variants={itemVariants}>
                    <Link 
                      to="/compare/popular" 
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-amoled-gray-700 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <BarChart2 className="h-5 w-5 text-amoled-accent-primary" />
                      <span>Price Trends</span>
                    </Link>
                  </motion.li>
                  
                  <motion.li variants={itemVariants}>
                    <Link 
                      to="/vendor" 
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-amoled-gray-700 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <Store className="h-5 w-5 text-amoled-accent-primary" />
                      <span>For Vendors</span>
                    </Link>
                  </motion.li>
                  
                  {currentUser && (
                    <>
                      <motion.li variants={itemVariants}>
                        <Link 
                          to="/profile" 
                          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-amoled-gray-700 transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          <Bell className="h-5 w-5 text-amoled-accent-primary" />
                          <span>Notifications</span>
                        </Link>
                      </motion.li>
                      
                      <motion.li variants={itemVariants}>
                        <Link 
                          to="/profile" 
                          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-amoled-gray-700 transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          <User className="h-5 w-5 text-amoled-accent-primary" />
                          <span>Profile</span>
                        </Link>
                      </motion.li>
                      
                      <motion.li variants={itemVariants}>
                        <Link 
                          to="/profile/settings" 
                          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-amoled-gray-700 transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          <Settings className="h-5 w-5 text-amoled-accent-primary" />
                          <span>Settings</span>
                        </Link>
                      </motion.li>
                      
                      {currentUser.isAdmin && (
                        <motion.li variants={itemVariants}>
                          <Link 
                            to="/admin" 
                            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-amoled-gray-700 transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            <Shield className="h-5 w-5 text-amoled-accent-warning" />
                            <span>Admin Panel</span>
                          </Link>
                        </motion.li>
                      )}
                    </>
                  )}
                </ul>
              </nav>
              
              <div className="mt-auto pt-4 border-t border-amoled-gray-700">
                {currentUser ? (
                  <motion.button 
                    variants={itemVariants}
                    onClick={handleLogout}
                    className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-amoled-gray-700 text-amoled-accent-danger transition-colors"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </motion.button>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <motion.div variants={itemVariants}>
                      <Link 
                        to="/login" 
                        className="flex justify-center w-full p-3 rounded-lg bg-amoled-accent-primary text-amoled-black font-medium"
                        onClick={() => setIsOpen(false)}
                      >
                        Login
                      </Link>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <Link 
                        to="/register" 
                        className="flex justify-center w-full p-3 rounded-lg border border-amoled-gray-600 hover:bg-amoled-gray-700 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        Sign Up - It's Free
                      </Link>
                    </motion.div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;