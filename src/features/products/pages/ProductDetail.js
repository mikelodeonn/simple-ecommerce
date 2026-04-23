import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView 
} from 'react-native';
import { useCart } from '../../../context/CartContext';

export const ProductDetail = ({ route, navigation }) => {
  const { product } = route.params || {};
  const { addToCart } = useCart();

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Producto no encontrado</Text>
      </View>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
  
    navigation.navigate('Main', { screen: 'CartTab' });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView style={styles.container}>
        <Image 
          source={typeof product.image === 'number' ? product.image : { uri: product.image }} 
          style={styles.image} 
        />
        <View style={styles.content}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          <Text style={styles.description}>{product.description}</Text>
          
          <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
            <Text style={styles.buttonText}>Agregar al carrito</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  image: { width: '100%', height: 350, resizeMode: 'contain', backgroundColor: '#f9f9f9' },
  content: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#2C3E50', marginBottom: 10 },
  price: { fontSize: 22, color: '#27AE60', fontWeight: 'bold', marginBottom: 15 },
  description: { fontSize: 16, color: '#7F8C8D', lineHeight: 24, marginBottom: 20 },
  button: { 
    backgroundColor: '#2C3E50', 
    padding: 18, 
    borderRadius: 12, 
    alignItems: 'center',
    marginTop: 10
  },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 }
});