import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import { Login } from '../features/auth/pages/Login';
import { Register } from '../features/auth/pages/Register';
import { About } from '../features/auth/pages/About';

import { ProductCatalog } from '../features/products/pages/ProductCatalog';
import { ProductDetail } from '../features/products/pages/ProductDetail';
import { useAuth } from '../context/AuthContext';
import { Profile } from '../features/auth/pages/Profile';
import { StackScreen } from 'react-native-screens';
import { EditProfile } from '../features/auth/pages/EditProfile';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#2C3E50',
        tabBarStyle: { height: 60, paddingBottom: 10 },
        headerShown: true,
      }}
    >
      <Tab.Screen
        name="CatalogTab"
        component={ProductCatalog}
        options={{ title: 'Tienda', tabBarLabel: 'Catálogo' }}
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
      <Stack.Navigator screenOptions={{
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
      }}>
        {user ? (
          <>
            <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
            <Stack.Screen name="EditProfile" component={EditProfile} options={{title: 'Edit Profile'}} />
            <Stack.Screen name="ProductDetail" component={ProductDetail} />
          </>
        ) : (

          <>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="About" component={About} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};