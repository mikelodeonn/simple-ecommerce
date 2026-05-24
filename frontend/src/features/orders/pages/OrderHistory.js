import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
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
    Alert.alert("Delete Order", "Do you want to remove this record?", [
      { text: "Cancel", style: "cancel" },
      { text: "Remove", style: "destructive", onPress: async () => {
          const updated = await ordersService.deleteOrder(id, user.email);
          setOrders(updated);
      }}
    ]);
  };

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" color="#FF9900" /></View>;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList 
        data={orders}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <View style={styles.header}>
              <Text style={styles.orderNumber}>Order #{orders.length - index}</Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>

            <View style={styles.itemsSection}>
              <Text style={styles.sectionTitle}>Items Details:</Text>
              {item.items && item.items.map((prod, idx) => (
                <View key={idx} style={styles.productRow}>
                  <Text style={styles.productName}>• {prod.name || prod.title}</Text>
                  <Text style={styles.productQty}>Qty: {prod.quantity || 1}</Text>
                </View>
              ))}
            </View>

            <View style={styles.footer}>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
              <Text style={styles.totalText}>Total: ${parseFloat(item.total).toFixed(2)}</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.center}>
            <Text style={styles.emptyText}>No orders found.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F3F3' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  listContent: { paddingVertical: 10 },
  card: { 
    backgroundColor: '#FFF', 
    marginHorizontal: 15, 
    marginVertical: 8, 
    padding: 15, 
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    elevation: 2
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    borderBottomWidth: 1, 
    borderBottomColor: '#EEE', 
    paddingBottom: 10,
    marginBottom: 10
  },
  orderNumber: { fontWeight: 'bold', fontSize: 16, color: '#232F3E' },
  date: { color: '#565959', fontSize: 13 },
  itemsSection: { marginBottom: 15 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: '#565959', marginBottom: 5 },
  productRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingVertical: 3 
  },
  productName: { fontSize: 14, color: '#0F1111', flex: 2 },
  productQty: { fontSize: 14, color: '#565959', flex: 1, textAlign: 'right' },
  footer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    paddingTop: 10
  },
  removeText: { color: '#007185', fontWeight: '500' },
  totalText: { fontSize: 18, fontWeight: 'bold', color: '#B12704' },
  emptyText: { color: '#565959', fontSize: 16 }
});