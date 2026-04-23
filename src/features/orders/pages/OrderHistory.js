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
  container: { flex: 1, backgroundColor: '#EAEDED' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { backgroundColor: '#FFF', padding: 15, borderRadius: 5, marginBottom: 15, borderLeftWidth: 4, borderLeftColor: '#FF9900' },
  orderLabel: { fontWeight: 'bold', fontSize: 16 },
  date: { color: 'gray' },
  total: { fontWeight: 'bold', color: '#B12704', fontSize: 18 },
  delete: { color: '#007185', marginTop: 10 },
  empty: { textAlign: 'center', marginTop: 50, color: 'gray' }
});