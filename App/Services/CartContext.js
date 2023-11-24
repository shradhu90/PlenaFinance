// CartContext.js
import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { getItem, setItem } from './AsyncStorage';
const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItemIndex = state.findIndex(item => item.id === action.payload.id);

      if (existingItemIndex !== -1) {
        // If the item already exists in the cart, update the quantity
        const updatedCart = [...state];
        updatedCart[existingItemIndex].quantity += 1;
        return updatedCart;
      } else {
        // If the item is not in the cart, add it with a quantity of 1
        return [...state, { ...action.payload, quantity: 1 }];
      }
    case 'REMOVE_FROM_CART':
      return state.filter(item => item.id !== action.payload.id);
    case 'SET_CART':
      return action.payload;
    case 'UPDATE_QUANTITY':
      return state.map(item => {
        if (item.id === action.payload.id) {
          return { ...item, quantity: action.payload.quantity };
        }
        return item;
      });
    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Load cart data from AsyncStorage when the component mounts
    const loadCartData = async () => {
      try {
        const cartData = await getItem('cart');
        if (cartData) {
          dispatch({ type: 'SET_CART', payload: JSON.parse(cartData) });
        }
      } catch (error) {
        console.error('Error loading cart data:', error);
      }
    };

    loadCartData();
  }, []);

  useEffect(() => {
    // Save cart data to AsyncStorage whenever the cart state changes
    const saveCartData = async () => {
      try {
        await setItem('cart', JSON.stringify(cart));
      } catch (error) {
        console.error('Error saving cart data:', error);
      }
    };

    saveCartData();
    calculateTotalPrice();
  }, [cart]);

  const calculateTotalPrice = () => {
    const total = cart.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
    setTotalPrice(total);
  };

  const addToCart = (item) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  const removeFromCart = (item) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: item });
  };
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: item.quantity - 1 } });
    }
  };
  const handleIncrement = (item) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: item.quantity + 1 } });
  };
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, handleDecrement, handleIncrement, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export { CartProvider, useCart };
