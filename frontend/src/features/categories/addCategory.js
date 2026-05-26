// src/features/categories/pages/CreateCategoryScreen.jsx
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import CategoryForm from '../components/CategoryForm';

export default function CreateCategoryScreen({ navigation }) {
  const [loading, setLoading] = useState(false);

  const handleCreate = async (formData) => {
    setLoading(true);
    try {
      // Aquí conectarías con tu backend MERN usando axios o fetch
      // const response = await api.post('/categories', formData);
      console.log('Enviando a MERN:', formData);
      
      alert('Categoría creada con éxito');
      navigation.goBack(); // Regresa a la lista
    } catch (error) {
      console.error(error);
      alert('Error al crear la categoría');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Nueva Categoría</Text>
      <CategoryForm onSubmit={handleCreate} isLoading={loading} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  title: { fontSize: 24, fontWeight: 'bold', marginHorizontal: 20, marginTop: 20, color: '#111' }
});