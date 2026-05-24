import React from 'react';
import { StyleSheet, View } from 'react-native'; 
import { AuthProvider } from './frontend/src/context/AuthContext';
import { CartProvider } from './frontend/src/context/CartContext';
import { AppNavigator } from './frontend/src/navigation/AppNavigator';

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppNavigator />
      </CartProvider>
    </AuthProvider>
  );
}
