import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { ordersService } from './OrderService'; 

export const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      const data = await ordersService.getOrders();
      setOrders(data || []);
    };
    fetchOrders();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList 
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={{fontWeight: 'bold'}}>Pedido: {item.id}</Text>
            <Text>Total: ${item.total}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f4f4f4' },
  card: { backgroundColor: '#fff', padding: 15, marginBottom: 10, borderRadius: 8 }
});