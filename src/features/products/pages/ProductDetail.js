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
           <Text style={styles.description}> Seller: {product.seller}</Text>
          
          <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
            <Text style={styles.buttonText}>Agregar al carrito</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FFFFFF',
    marginTop: 30
    
  },
  image: { 
    width: '100%', 
    height: 400, 
    resizeMode: 'cover', 
    backgroundColor: '#F8F9FA' 
  },
  content: { 
    paddingHorizontal: 25, 
    paddingTop: 30,
    paddingBottom: 40,
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30,
    marginTop: -30, 
    backgroundColor: '#FFFFFF'
  },
  title: { 
    fontSize: 28, 
    fontWeight: '800', 
    color: '#1A1A1A', 
    marginBottom: 8,
    letterSpacing: -0.5
  },
  price: { 
    fontSize: 26, 
    color: '#00B894', 
    fontWeight: '900', 
    marginBottom: 20 
  },
  description: { 
    fontSize: 16, 
    color: '#636E72', 
    lineHeight: 26, 
    marginBottom: 30,
    fontWeight: '400'
  },
  button: { 
    backgroundColor: '#1A1A1A', 
    paddingVertical: 20, 
    borderRadius: 18, 
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    marginTop: 'auto' 
  },
  buttonText: { 
    color: '#FFF', 
    fontWeight: '700', 
    fontSize: 18,
    letterSpacing: 0.5 
  }
});