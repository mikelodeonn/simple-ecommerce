// src/features/products/pages/EditProductScreen.jsx
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import ProductForm from '../components/ProductForm';

export default function EditProductScreen({ route, navigation }) {
  const { product } = route.params || {};
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (formData) => {
    setLoading(true);
    try {
      // Conexión a tu API Express de MERN
      // await api.put(`/products/${product._id}`, formData);
      console.log(`Actualizando producto ${product._id}:`, formData);
      
      alert('Producto actualizado con éxito');
      navigation.goBack();
    } catch (error) {
      console.error(error);
      alert('Error al actualizar el producto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Editar Producto</Text>
      <ProductForm initialData={product} onSubmit={handleUpdate} isLoading={loading} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  title: { fontSize: 24, fontWeight: 'bold', marginHorizontal: 20, marginTop: 20, color: '#111' }
});