import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'; // Para recargar al entrar
import { ordersService } from './OrderService';

export const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Esto se ejecuta CADA VEZ que entras a la pestaña/pantalla
  useFocusEffect(
    useCallback(() => {
      const fetchOrders = async () => {
        setLoading(true);
        const data = await ordersService.getOrders();
        setOrders(data);
        setLoading(false);
      };

      fetchOrders();
    }, [])
  );

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.date}>{item.date}</Text>
        <Text style={styles.orderId}>#ID: {item.id.slice(-6)}</Text>
      </View>
      <Text style={styles.address}>📍 {item.address}</Text>
      <Text style={styles.total}>Total: ${item.total.toFixed(2)}</Text>
      <Text style={styles.itemsCount}>{item.items.length} productos comprados</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <Text style={styles.infoText}>Cargando pedidos...</Text>
      ) : (
        <FlatList 
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Aún no has realizado pedidos.</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F7F6' },
  listContent: { padding: 20 },
  card: { 
    backgroundColor: '#FFF', 
    padding: 15, 
    borderRadius: 12, 
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  cardHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    paddingBottom: 5
  },
  date: { fontWeight: 'bold', color: '#2C3E50' },
  orderId: { color: '#95A5A6', fontSize: 12 },
  address: { color: '#7F8C8D', marginBottom: 5 },
  total: { fontSize: 18, fontWeight: 'bold', color: '#27AE60' },
  itemsCount: { fontSize: 12, color: '#95A5A6', marginTop: 5 },
  infoText: { textAlign: 'center', marginTop: 20 },
  emptyContainer: { alignItems: 'center', marginTop: 100 },
  emptyText: { color: '#95A5A6', fontSize: 16 }
});