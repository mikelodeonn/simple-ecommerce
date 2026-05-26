// src/features/categories/pages/EditCategoryScreen.jsx
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import CategoryForm from '../components/CategoryForm';

export default function EditCategoryScreen({ route, navigation }) {
  // Asumiendo que pasas el objeto de la categoría por los params de la ruta de navegación
  const { category } = route.params || {}; 
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (formData) => {
    setLoading(true);
    try {
      // Aquí conectarías con tu backend MERN
      // await api.put(`/categories/${category._id}`, formData);
      console.log(`Actualizando ${category._id} en MERN con:`, formData);
      
      alert('Categoría actualizada con éxito');
      navigation.goBack();
    } catch (error) {
      console.error(error);
      alert('Error al actualizar la categoría');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Editar Categoría</Text>
      <CategoryForm initialData={category} onSubmit={handleUpdate} isLoading={loading} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  title: { fontSize: 24, fontWeight: 'bold', marginHorizontal: 20, marginTop: 20, color: '#111' }
});