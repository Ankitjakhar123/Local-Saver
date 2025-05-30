import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../../contexts/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="card overflow-hidden group relative"
    >
      <Link 
        to={`/compare/${product.name}`}
        className="block touch-manipulation"
      >
        <div className="relative">
          <div className="aspect-square rounded-lg overflow-hidden mb-2 sm:mb-3">
            <img 
              src={product.image} 
              alt={product.name} 
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
            />
          </div>
          
          {product.savings && (
            <div className="absolute top-2 right-2 bg-amoled-accent-primary text-amoled-black text-xs font-bold px-2 py-1 rounded-full flex items-center">
              <TrendingDown className="h-3 w-3 mr-1" />
              Save {product.savings}
            </div>
          )}
        </div>
        
        <h3 className="font-medium text-base sm:text-lg line-clamp-2 min-h-[2.5rem] sm:min-h-[3.5rem]">{product.name}</h3>
        
        <div className="flex justify-between items-end mt-2">
          <div>
            <div className="text-amoled-accent-primary font-bold text-sm sm:text-base">{product.priceRange}</div>
            <div className="text-xs text-amoled-gray-300">{product.unit}</div>
          </div>
          
          <button 
            onClick={handleAddToCart}
            className="p-2 sm:p-3 rounded-full bg-amoled-gray-700 hover:bg-amoled-accent-primary hover:text-amoled-black transition-colors touch-manipulation"
            aria-label="Add to cart"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;