import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

// Initial state
const initialState = {
  items: [],
  vendors: {
    zepto: true,
    blinkit: true,
    bigbasket: true,
    local: true
  },
  totalSavings: 0
};

// Load cart from localStorage
const loadCart = () => {
  try {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      return JSON.parse(savedCart);
    }
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
  }
  return initialState;
};

// Cart reducer
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      // Check if item already exists in cart
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        // Update quantity if item exists
        return {
          ...state,
          items: state.items.map(item => 
            item.id === action.payload.id 
              ? { ...item, quantity: (item.quantity || 1) + 1 }
              : item
          )
        };
      } else {
        // Add new item
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }]
        };
      }
      
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
      
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item => 
          item.id === action.payload.id 
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
      
    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      };
      
    case 'TOGGLE_VENDOR':
      return {
        ...state,
        vendors: {
          ...state.vendors,
          [action.payload]: !state.vendors[action.payload]
        }
      };
      
    case 'UPDATE_SAVINGS':
      return {
        ...state,
        totalSavings: action.payload
      };
      
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, loadCart());
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  
  // Actions
  const addToCart = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };
  
  const removeFromCart = (itemId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: itemId });
  };
  
  const updateQuantity = (itemId, quantity) => {
    dispatch({ 
      type: 'UPDATE_QUANTITY', 
      payload: { id: itemId, quantity: Math.max(1, quantity) }
    });
  };
  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };
  
  const toggleVendor = (vendorName) => {
    dispatch({ type: 'TOGGLE_VENDOR', payload: vendorName });
  };
  
  const updateSavings = (amount) => {
    dispatch({ type: 'UPDATE_SAVINGS', payload: amount });
  };
  
  // Calculate potential savings whenever cart or vendor selections change
  useEffect(() => {
    // This would typically be a more complex calculation based on product prices from different vendors
    // For now, we'll use a simplified calculation
    const calculateSavings = () => {
      // In a real app, this would fetch prices from the API and calculate actual savings
      const potentialSavings = cart.items.reduce((total, item) => {
        // Simplified calculation - in a real app this would compare actual prices
        const baseSaving = parseFloat(item.savings || "0%") / 100;
        return total + (50 * baseSaving * (item.quantity || 1));
      }, 0);
      
      updateSavings(potentialSavings);
    };
    
    calculateSavings();
  }, [cart.items, cart.vendors]);
  
  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleVendor
  };
  
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}