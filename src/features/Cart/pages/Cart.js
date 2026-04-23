import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useCart } from '../../../context/CartContext';

export const Cart = ({ navigation }) => {
  const { cart, updateQuantity, removeFromCart, getTotal } = useCart();

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={typeof item.image === 'number' ? item.image : { uri: item.image }} style={styles.img} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.price}>${(item.price * item.quantity).toFixed(2)}</Text>
        <View style={styles.controls}>
          <TouchableOpacity onPress={() => updateQuantity(item.id, -1)} style={styles.qtyBtn}><Text>-</Text></TouchableOpacity>
          <Text style={styles.qtyText}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => updateQuantity(item.id, 1)} style={styles.qtyBtn}><Text>+</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.delete}><Text style={{color: '#E74C3C'}}>Quitar</Text></TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList 
        data={cart} 
        renderItem={renderItem} 
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={<Text style={styles.empty}>Carrito vacío</Text>}
      />
      <View style={styles.footer}>
        <Text style={styles.total}>Total: ${getTotal().toFixed(2)}</Text>
        <TouchableOpacity 
          style={styles.mainBtn} 
          onPress={() => cart.length > 0 ? navigation.navigate('Checkout') : Alert.alert("Aviso", "Agrega algo al carrito")}
        >
          <Text style={styles.btnText}>Continuar compra</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F7F6' },
  card: { flexDirection: 'row', padding: 15, backgroundColor: '#FFF', margin: 10, borderRadius: 12, elevation: 2 },
  img: { width: 70, height: 70, borderRadius: 8 },
  info: { flex: 1, marginLeft: 15 },
  title: { fontSize: 16, fontWeight: 'bold', color: '#2C3E50' },
  price: { color: '#27AE60', fontWeight: 'bold', marginVertical: 4 },
  controls: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  qtyBtn: { backgroundColor: '#EEE', padding: 8, borderRadius: 5, width: 35, alignItems: 'center' },
  qtyText: { marginHorizontal: 15, fontWeight: 'bold' },
  delete: { marginLeft: 'auto' },
  footer: { padding: 20, backgroundColor: '#FFF', borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  total: { fontSize: 22, fontWeight: 'bold', textAlign: 'right', marginBottom: 15 },
  mainBtn: { backgroundColor: '#2C3E50', padding: 18, borderRadius: 12, alignItems: 'center' },
  btnText: { color: '#FFF', fontWeight: 'bold' },
  empty: { textAlign: 'center', marginTop: 50, color: '#95A5A6' }
});