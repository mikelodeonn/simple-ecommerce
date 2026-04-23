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
  container: { 
    flex: 1, 
    backgroundColor: '#F1F3F5' 
  },
  card: { 
    flexDirection: 'row', 
    padding: 16, 
    backgroundColor: '#FFFFFF', 
    marginHorizontal: 16, 
    marginVertical: 8, 
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3 
  },
  img: { 
    width: 85, 
    height: 85, 
    borderRadius: 15,
    backgroundColor: '#F8F9FA' 
  },
  info: { 
    flex: 1, 
    marginLeft: 18,
    justifyContent: 'space-between' 
  },
  title: { 
    fontSize: 17, 
    fontWeight: '700', 
    color: '#1A1A1A',
    lineHeight: 22 
  },
  price: { 
    color: '#00B894', 
    fontWeight: '800', 
    fontSize: 18,
    marginVertical: 2 
  },
  controls: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 8 
  },
  qtyBtn: { 
    backgroundColor: '#F1F3F5', 
    paddingVertical: 6, 
    borderRadius: 10, 
    width: 38, 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E9ECEF'
  },
  qtyText: { 
    marginHorizontal: 14, 
    fontWeight: '700',
    fontSize: 16,
    color: '#2D3436' 
  },
  delete: { 
    marginLeft: 'auto',
    padding: 5
  },
  footer: { 
    paddingHorizontal: 25, 
    paddingTop: 25,
    paddingBottom: 40, 
    backgroundColor: '#FFFFFF', 
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 10
  },
  totalContainer: { 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  totalLabel: {
    fontSize: 16,
    color: '#636E72',
    fontWeight: '600'
  },
  total: { 
    fontSize: 26, 
    fontWeight: '900', 
    color: '#1A1A1A'
  },
  mainBtn: { 
    backgroundColor: '#1A1A1A',
    padding: 18, 
    borderRadius: 16, 
    alignItems: 'center',
    shadowColor: '#1A1A1A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6
  },
  btnText: { 
    color: '#FFF', 
    fontWeight: '700',
    fontSize: 18,
    letterSpacing: 0.5 
  },
  empty: { 
    textAlign: 'center', 
    marginTop: 100, 
    color: '#B2BEC3',
    fontSize: 16,
    fontWeight: '500' 
  }
});