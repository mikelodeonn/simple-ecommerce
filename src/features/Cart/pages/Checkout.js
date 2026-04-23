import React, { useState } from 'react';
// ... otros imports
import { useCart } from '../../../context/CartContext';
import { ordersService } from '../../orders/pages/OrderService';

export const Checkout = ({ navigation }) => {
  const { cart, getTotal, clearCart } = useCart();
  const [address, setAddress] = useState('');

  const handleFinish = async () => {
    if (!address.trim()) return Alert.alert("Error", "La dirección es obligatoria");

    try {
      const order = {
        id: Date.now().toString(),
        items: cart,
        total: getTotal(),
        address: address,
        date: new Date().toLocaleDateString(),
      };

      await ordersService.saveOrder(order);
      clearCart();
      Alert.alert("¡Éxito!", "Gracias por tu compra", [
        { text: "OK", onPress: () => navigation.popToTop() }
      ]);
    } catch (error) {
      Alert.alert("Error", "No se pudo procesar la compra");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Detalles de Envío</Text>
      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>Total a pagar:</Text>
        <Text style={styles.summaryValue}>${getTotal().toFixed(2)}</Text>
      </View>
      <TextInput 
        style={styles.input} 
        placeholder="Dirección completa de entrega" 
        multiline
        numberOfLines={3}
        onChangeText={setAddress}
      />
      <TouchableOpacity style={styles.confirmBtn} onPress={handleFinish}>
        <Text style={styles.confirmBtnText}>Confirmar y Pagar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 25, flexGrow: 1, backgroundColor: '#FFF' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#2C3E50' },
  summaryCard: { padding: 20, backgroundColor: '#F4F7F6', borderRadius: 15, marginBottom: 20 },
  summaryLabel: { color: '#7F8C8D', fontSize: 14 },
  summaryValue: { fontSize: 26, fontWeight: 'bold', color: '#2C3E50' },
  input: { backgroundColor: '#F4F7F6', padding: 15, borderRadius: 12, fontSize: 16, textAlignVertical: 'top' },
  confirmBtn: { backgroundColor: '#27AE60', padding: 18, borderRadius: 12, marginTop: 30, alignItems: 'center' },
  confirmBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 }
});