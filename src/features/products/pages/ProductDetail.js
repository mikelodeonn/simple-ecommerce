import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useCart } from '../../../context/CartContext';

export const ProductDetail = ({ route, navigation }) => {
  const { product } = route.params || {};
  const { addToCart } = useCart();

  if (!product) return <View><Text>Cargando...</Text></View>;

  return (
    <ScrollView style={styles.container}>
      <Image source={typeof product.image === 'number' ? product.image : { uri: product.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <TouchableOpacity style={styles.button} onPress={() => { addToCart(product); navigation.navigate('CartTab'); }}>
          <Text style={styles.buttonText}>Agregar al carrito</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  image: { width: '100%', height: 300, resizeMode: 'contain' },
  content: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold' },
  price: { fontSize: 20, color: '#27AE60', marginVertical: 10 },
  description: { fontSize: 16, color: '#7F8C8D' },
  button: { backgroundColor: '#2C3E50', padding: 15, borderRadius: 10, marginTop: 20, alignItems: 'center' },
  buttonText: { color: '#FFF', fontWeight: 'bold' }
});