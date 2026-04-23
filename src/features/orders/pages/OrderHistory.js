import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { ordersService } from './OrderService';
import { useAuth } from '../../../context/AuthContext';

export const OrderHistory = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchOrders = async () => {
    try {
      setError(false);
      setLoading(true);
      const data = await ordersService.getOrders(user.email);
      setOrders(data);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(useCallback(() => { fetchOrders(); }, []));

  const handleDelete = (id) => {
    Alert.alert("Eliminar", "¿Borrar este registro?", [
      { text: "No" },
      { text: "Sí", onPress: async () => {
          const updated = await ordersService.deleteOrder(id, user.email);
          setOrders(updated);
      }}
    ]);
  };

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" color="#FF9900" /></View>;

  if (error) return (
    <View style={styles.center}>
      <Text>Error de conexión</Text>
      <TouchableOpacity onPress={fetchOrders}><Text style={{color: '#007185'}}>Reintentar</Text></TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList 
        data={orders}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 15 }}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <Text style={styles.orderLabel}>Compra #{orders.length - index}</Text>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.total}>${item.total.toFixed(2)}</Text>
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <Text style={styles.delete}>Borrar registro</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>Historial vacío</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F8F9FA' 
  },
  center: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 20
  },
  card: { 
    backgroundColor: '#FFFFFF', 
    padding: 20, 
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    borderLeftWidth: 5, 
    borderLeftColor: '#007AFF' 
  },
  orderLabel: { 
    fontWeight: '700', 
    fontSize: 17,
    color: '#1A1A1A',
    marginBottom: 4
  },
  date: { 
    color: '#95A5A6', 
    fontSize: 14,
    fontWeight: '500'
  },
  total: { 
    fontWeight: '800', 
    color: '#2D3436', 
    fontSize: 20,
    marginTop: 10,
    textAlign: 'right'
  },
  delete: { 
    color: '#FF4757', 
    marginTop: 12,
    fontWeight: '600',
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  empty: { 
    textAlign: 'center', 
    marginTop: 100, 
    color: '#B2BEC3',
    fontSize: 16,
    fontWeight: '500'
  }
});