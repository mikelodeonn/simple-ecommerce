import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { useCart } from '../../../context/CartContext';
import { useAuth } from '../../../context/AuthContext';
import { ordersService } from '../../orders/pages/OrderService';

export const Checkout = ({ navigation }) => {
  const { cart, getTotal, clearCart } = useCart();
  const { user } = useAuth();
  const [address, setAddress] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFinish = async () => {
    if (cart.length === 0) return Alert.alert("Error", "Your cart is empty");
    if (!address.trim()) return Alert.alert("Error", "Please enter a mailing address");

    setIsProcessing(true); 

    try {
      const orderTotal = getTotal();
      
      const order = {
        id: Date.now().toString(),
        items: cart, 
        total: orderTotal,
        address: address.trim(),
        date: new Date().toLocaleDateString(),
      };

      await ordersService.saveOrder(order, user.email);
      
      await clearCart();
      
      Alert.alert(
        "Order Placed", 
        "Your purchase was successful!", 
        [
          { 
            text: "OK", 
            onPress: () => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'Main' }],
              });
            } 
          }
        ]
      );
    } catch (e) {
      console.error(e);
      Alert.alert("Error", "Could not complete the order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.card}>
        <Text style={styles.totalLabel}>Order total:</Text>
        <Text style={styles.totalValue}>${getTotal().toFixed(2)}</Text>
      </View>

      <Text style={styles.label}>Mailing address:</Text>
      <TextInput 
        style={styles.input} 
        value={address} 
        onChangeText={setAddress} 
        placeholder="Street, number, colony..."
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity 
        style={[styles.btn, isProcessing && { backgroundColor: '#bdc3c7' }]} 
        onPress={handleFinish}
        disabled={isProcessing}
      >
        <Text style={styles.btnText}>
          {isProcessing ? "Processing..." : "Confirm and pay"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F8F9FA', 
    padding: 20 
  },
  card: { 
    backgroundColor: '#FFFFFF', 
    padding: 25, 
    borderRadius: 20, 
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3 
  },
  totalContainer: { 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 10
  },
  totalLabel: { 
    fontSize: 16, 
    color: '#636E72',
    fontWeight: '600'
  },
  totalValue: { 
    fontSize: 28, 
    fontWeight: '900', 
    color: '#1A1A1A', 
    letterSpacing: -0.5
  },
  label: { 
    fontWeight: '700', 
    marginBottom: 10, 
    color: '#2D3436',
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  input: { 
    backgroundColor: '#F1F3F5', 
    padding: 18, 
    borderRadius: 15, 
    borderWidth: 1, 
    borderColor: '#E9ECEF', 
    minHeight: 100, 
    textAlignVertical: 'top',
    fontSize: 16,
    color: '#2D3436'
  },
  btn: { 
    backgroundColor: '#007AFF',
    padding: 18, 
    borderRadius: 16, 
    marginTop: 20, 
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6
  },
  btnText: { 
    fontWeight: '700', 
    color: '#FFFFFF',
    fontSize: 18,
    letterSpacing: 0.5
  }
});