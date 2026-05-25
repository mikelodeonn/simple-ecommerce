// src/features/products/components/ProductForm.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';

export default function ProductForm({ initialData, onSubmit, isLoading }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');
  
  // En una app real, aquí cargarías las categorías desde tu BD para un Selector/Picker
  const [category, setCategory] = useState(''); 

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setPrice(initialData.price ? initialData.price.toString() : '');
      setStock(initialData.stock ? initialData.stock.toString() : '');
      setDescription(initialData.description || '');
      setCategory(initialData.category || '');
    }
  }, [initialData]);

  const handlePress = () => {
    if (!name.trim() || !price.trim() || !stock.trim()) {
      alert('Por favor llena los campos obligatorios (Nombre, Precio, Stock)');
      return;
    }

    onSubmit({
      name,
      price: parseFloat(price),
      stock: parseInt(stock, 10),
      description,
      category // ID de MongoDB de la categoría
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre del Producto *</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. iPhone 15 Pro"
        placeholderTextColor="#999"
        value={name}
        onChangeText={setName}
      />

      <View style={styles.row}>
        <View style={styles.flexChild}>
          <Text style={styles.label}>Precio ($) *</Text>
          <TextInput
            style={styles.input}
            placeholder="0.00"
            placeholderTextColor="#999"
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
          />
        </View>
        <View style={[styles.flexChild, { marginLeft: 12 }]}>
          <Text style={styles.label}>Stock *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej. 10"
            placeholderTextColor="#999"
            keyboardType="numeric"
            value={stock}
            onChangeText={setStock}
          />
        </View>
      </View>

      <Text style={styles.label}>ID Categoría (Simulado)</Text>
      <TextInput
        style={styles.input}
        placeholder="ID de MongoDB de la categoría"
        placeholderTextColor="#999"
        value={category}
        onChangeText={setCategory}
      />

      <Text style={styles.label}>Descripción</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Detalles del producto..."
        placeholderTextColor="#999"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity style={styles.button} onPress={handlePress} disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>{initialData ? 'Actualizar Producto' : 'Crear Producto'}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 8, color: '#333' },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, fontSize: 16, marginBottom: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  flexChild: { flex: 1 },
  textArea: { height: 100, textAlignVertical: 'top' },
  button: { backgroundColor: '#00cc66', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});