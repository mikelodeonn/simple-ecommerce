import React, { createContext, useState, useContext, useEffect } from 'react';
import { storageService } from '../shared/services/storageService';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { user } = useAuth();
  const CART_KEY = user ? `@cart_${user.email}` : null;

  useEffect(() => {
    const loadCart = async () => {
      if (CART_KEY) {
        const saved = await storageService.get(CART_KEY);
        setCart(saved || []);
      }
    };
    loadCart();
  }, [CART_KEY]);

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id);
      let newCart;
      if (exists) {
        newCart = prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        newCart = [...prev, { ...product, quantity: 1 }];
      }
      if (CART_KEY) storageService.save(CART_KEY, newCart);
      return newCart;
    });
  };

  const updateQuantity = (id, amount) => {
    setCart(prev => {
      const newCart = prev.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + amount;
          return { ...item, quantity: newQty > 0 ? newQty : 1 };
        }
        return item;
      });
      if (CART_KEY) storageService.save(CART_KEY, newCart);
      return newCart;
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => {
      const newCart = prev.filter(item => item.id !== id);
      if (CART_KEY) storageService.save(CART_KEY, newCart);
      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    if (CART_KEY) storageService.remove(CART_KEY);
  };

  const getTotal = () => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart, getTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);