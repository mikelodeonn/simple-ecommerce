import React, { createContext, useState, useContext, useEffect } from 'react';
import {storageService} from '../shared/services/storageService';
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const loadCart = async () => {
      const savedCart = await storageService.get('@cart');
      if (savedCart) setCart(savedCart);
    };
    loadCart();
  }, []);

  useEffect(() => {
    storageService.save('@cart', cart);
  }, [cart]);

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, amount) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + amount;
        return { ...item, quantity: newQty > 0 ? newQty : 1 };
      }
      return item;
    }));
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const getTotal = () => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart, getTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);