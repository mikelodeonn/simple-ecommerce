// src/features/products/pages/CreateProductScreen.jsx
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import ProductForm from '../components/ProductForm';

export default function CreateProductScreen({ navigation }) {
  const [loading, setLoading] = useState(false);

  const handleCreate = async (formData) => {
    setLoading(true);
    try {
      // Conexión a tu API Express de MERN
      // await api.post('/products', formData);
      console.log('Enviando nuevo producto a MERN:', formData);
      
      alert('Producto creado con éxito');
      navigation.goBack();
    } catch (error) {
      console.error(error);
      alert('Error al crear el producto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Nuevo Producto</Text>
      <ProductForm onSubmit={handleCreate} isLoading={loading} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  title: { fontSize: 24, fontWeight: 'bold', marginHorizontal: 20, marginTop: 20, color: '#111' }
});