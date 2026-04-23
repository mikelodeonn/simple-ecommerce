import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import { Login } from '../features/auth/pages/Login';
import { Register } from '../features/auth/pages/Register';
import { Profile } from '../features/auth/pages/Profile';
import { ProductCatalog } from '../features/products/pages/ProductCatalog';
import { ProductDetail } from '../features/products/pages/ProductDetail';
import { Cart } from '../features/Cart/pages/Cart';
import { Checkout } from '../features/Cart/pages/Checkout';
import { OrderHistory } from '../features/orders/pages/OrderHistory';

import { useAuth } from '../context/AuthContext';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


const MainTabs = () => {
  return (
    <Tab.Navigator 
      screenOptions={{ 
        headerShown: true,
        tabBarActiveTintColor: '#2C3E50',
        tabBarInactiveTintColor: '#95A5A6',
        tabBarStyle: { height: 60, paddingBottom: 10 }
      }}
    >
      <Tab.Screen 
        name="CatalogTab" 
        component={ProductCatalog} 
        options={{ title: 'Tienda', tabBarLabel: 'Catálogo' }} 
      />
      <Tab.Screen 
        name="CartTab" 
        component={Cart} 
        options={{ title: 'Mi Carrito', tabBarLabel: 'Carrito' }} 
      />
      <Tab.Screen 
        name="ProfileTab" 
        component={Profile} 
        options={{ title: 'Mi Perfil', tabBarLabel: 'Perfil' }} 
      />
    </Tab.Navigator>
  );
};


export const AppNavigator = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#F4F7F6' },
          headerTitleStyle: { fontWeight: 'bold', color: '#2C3E50' },
          headerTintColor: '#2C3E50',
        }}
      >
        {user ? (
          <>
            <Stack.Screen 
              name="Main" 
              component={MainTabs} 
              options={{ headerShown: false }} 
            />
            
            <Stack.Screen 
              name="ProductDetail" 
              component={ProductDetail} 
              options={{ title: 'Detalle del Producto' }} 
            />
            
            <Stack.Screen 
              name="Checkout" 
              component={Checkout} 
              options={{ title: 'Finalizar Compra' }} 
            />
            
            <Stack.Screen 
              name="OrderHistory" 
              component={OrderHistory} 
              options={{ title: 'Mis Pedidos' }} 
            />
          </>
        ) : (
          <>
            <Stack.Screen 
              name="Login" 
              component={Login} 
              options={{ headerShown: false }} 
            />
            <Stack.Screen 
              name="Register" 
              component={Register} 
              options={{ title: 'Crear Cuenta' }} 
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};