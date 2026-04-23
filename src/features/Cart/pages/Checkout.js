import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  ScrollView, 
  SafeAreaView 
} from 'react-native';
import { useCart } from '../../../context/CartContext';
import { useAuth } from '../../../context/AuthContext'; 
import { ordersService } from '../../orders/pages/OrderService';

export const Checkout = ({ navigation }) => {
  const { cart, getTotal, clearCart } = useCart();
  const { user } = useAuth(); 
  const [address, setAddress] = useState('');

  const handleFinish = async () => {
    if (!address.trim()) {
      return Alert.alert("Error", "La dirección de entrega es obligatoria.");
    }

    try {
      const order = {
        id: Date.now().toString(),
        items: cart,
        total: getTotal(),
        address: address,
        date: new Date().toLocaleDateString(),
        userEmail: user?.email 
      };

      await ordersService.saveOrder(order, user.email);
      
      clearCart();
      
      Alert.alert("¡Éxito!", "Gracias por tu compra", [
        { 
          text: "OK", 
          onPress: () => navigation.navigate('Main', { screen: 'CartTab' }) 
        }
      ]);
    } catch (error) {
      Alert.alert("Error", "No se pudo procesar la compra");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Finalizar Compra</Text>
        
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Total a pagar:</Text>
          <Text style={styles.summaryValue}>${getTotal().toFixed(2)}</Text>
        </View>

        <TextInput 
          style={styles.input} 
          placeholder="Dirección completa de entrega" 
          multiline
          numberOfLines={3}
          value={address}
          onChangeText={setAddress}
        />

        <TouchableOpacity style={styles.confirmBtn} onPress={handleFinish}>
          <Text style={styles.confirmBtnText}>Confirmar y Pagar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 25, flexGrow: 1, backgroundColor: '#FFF' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#2C3E50' },
  summaryCard: { padding: 20, backgroundColor: '#F4F7F6', borderRadius: 15, marginBottom: 20 },
  summaryLabel: { color: '#7F8C8D', fontSize: 14 },
  summaryValue: { fontSize: 26, fontWeight: 'bold', color: '#2C3E50' },
  input: { 
    backgroundColor: '#F4F7F6', 
    padding: 15, 
    borderRadius: 12, 
    fontSize: 16, 
    textAlignVertical: 'top',
    minHeight: 80,
    marginBottom: 20
  },
  confirmBtn: { backgroundColor: '#27AE60', padding: 18, borderRadius: 12, alignItems: 'center' },
  confirmBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 }
});