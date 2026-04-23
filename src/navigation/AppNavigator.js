import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { Login } from '../features/auth/pages/Login';
import { Register } from '../features/auth/pages/Register';
import { Profile } from '../features/auth/pages/Profile';
import { EditProfile } from '../features/auth/pages/EditProfile';
import { ProductCatalog } from '../features/products/pages/ProductCatalog';
import { ProductDetail } from '../features/products/pages/ProductDetail';
import { Cart } from '../features/Cart/pages/Cart';
import { Checkout } from '../features/Cart/pages/Checkout';
import { OrderHistory } from '../features/orders/pages/OrderHistory';
import { useAuth } from '../context/AuthContext';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainTabs = () => (
  <Tab.Navigator 
    screenOptions={({ route }) => ({
      headerStyle: { backgroundColor: '#232F3E' },
      headerTintColor: '#FFFFFF',
      tabBarActiveTintColor: '#FF9900',
      tabBarInactiveTintColor: 'gray',
      tabBarIcon: ({ color, size }) => {
        let iconName = route.name === 'CatalogTab' ? 'home' : route.name === 'CartTab' ? 'cart' : 'person';
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="CatalogTab" component={ProductCatalog} options={{ title: 'Amazon' }} />
    <Tab.Screen name="CartTab" component={Cart} options={{ title: 'Carrito' }} />
    <Tab.Screen name="ProfileTab" component={Profile} options={{ title: 'Mi Cuenta' }} />
  </Tab.Navigator>
);

export const AppNavigator = () => {
  const { user, isLoading } = useAuth();
  if (isLoading) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ 
        headerStyle: { backgroundColor: '#232F3E' },
        headerTintColor: '#FFFFFF' 
      }}>
        {!user ? (
          <>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={Register} options={{ title: 'Crear Cuenta' }} />
          </>
        ) : (
          <>
            <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
            <Stack.Screen name="ProductDetail" component={ProductDetail} options={{ title: 'Detalles' }} />
            <Stack.Screen name="Checkout" component={Checkout} options={{ title: 'Caja' }} />
            <Stack.Screen name="OrderHistory" component={OrderHistory} options={{ title: 'Mis Pedidos' }} />
            <Stack.Screen name="EditProfile" component={EditProfile} options={{ title: 'Configuración' }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};