import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { Login } from '../features/auth/pages/Login';
import { Register } from '../features/auth/pages/Register';
import { About } from '../features/auth/pages/About';

import { ProductCatalog } from '../features/products/pages/ProductCatalog';
import { ProductDetail } from '../features/products/pages/ProductDetail';


const Stack = createStackNavigator();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#F4F7F6',
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#2C3E50',
          },
          headerTintColor: '#2C3E50',
        }}
      >
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ title: 'Registro' }}
        />
        <Stack.Screen
          name="About"
          component={About}
          options={{ title: 'Sobre Nosotros' }}
        />
        <Stack.Screen
          name="ProductCatalog"
          component={ProductCatalog}
          options={{ 
            title: 'Catálogo de Productos',
            headerLeft: () => null,
            gestureEnabled: false,

           }}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetail}
          options={{ title: 'Detalle del Producto' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};