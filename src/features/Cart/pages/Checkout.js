import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { useCart } from '../../../context/CartContext';
import { useAuth } from '../../../context/AuthContext';
import { ordersService } from '../../orders/pages/OrderService';

export const Checkout = ({ navigation }) => {
  const { cart, getTotal, clearCart } = useCart();
  const { user } = useAuth();
  const [address, setAddress] = useState('');

  const handleFinish = async () => {
    if (!address.trim()) return Alert.alert("Error", "Ingresa una dirección");

    try {
      const order = {
        id: Date.now().toString(),
        items: cart,
        total: getTotal(),
        address: address,
        date: new Date().toLocaleDateString(),
      };

      await ordersService.saveOrder(order, user.email);
      clearCart();
      
      Alert.alert("Éxito", "Pedido realizado", [
        { text: "OK", onPress: () => navigation.navigate('Main', { screen: 'CatalogTab' }) }
      ]);
    } catch (e) {
      Alert.alert("Error", "No se pudo procesar");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.totalLabel}>Total del pedido:</Text>
        <Text style={styles.totalValue}>${getTotal().toFixed(2)}</Text>
      </View>

      <Text style={styles.label}>Dirección de envío:</Text>
      <TextInput 
        style={styles.input} 
        value={address} 
        onChangeText={setAddress} 
        placeholder="Calle, número, colonia..."
        multiline
      />

      <TouchableOpacity style={styles.btn} onPress={handleFinish}>
        <Text style={styles.btnText}>Confirmar y pagar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EAEDED', padding: 15 },
  card: { backgroundColor: '#FFF', padding: 20, borderRadius: 5, marginBottom: 20 },
  totalLabel: { fontSize: 16 },
  totalValue: { fontSize: 24, fontWeight: 'bold', color: '#B12704' },
  label: { fontWeight: 'bold', marginBottom: 5 },
  input: { backgroundColor: '#FFF', padding: 15, borderRadius: 5, borderWidth: 1, borderColor: '#BBB', minHeight: 80, textAlignVertical: 'top' },
  btn: { backgroundColor: '#FF9900', padding: 15, borderRadius: 5, marginTop: 30, alignItems: 'center' },
  btnText: { fontWeight: 'bold', color: '#FFF' }
});