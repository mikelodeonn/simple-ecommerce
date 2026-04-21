import React, { useState, useMemo } from 'react';
import { TouchableOpacity, View, FlatList, ActivityIndicator, StyleSheet, Text, SafeAreaView } from 'react-native';
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from '../components/ProductCard';

export const ProductCatalog = () => {

  const CATEGORIES = ['all', "electronics", "jewelery", "men's clothing", "women's clothing"];

  const { products, isLoading, refresh } = useProducts();

  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') return products;
    return products.filter(p => p.category === selectedCategory);
  }, [selectedCategory, products]);

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.chip, selectedCategory === item && styles.chipSelected]}
      onPress={() => setSelectedCategory(item)}
    >
      <Text style={selectedCategory === item ? styles.textSelected : styles.textChip}>
        {item.charAt(0).toUpperCase() + item.slice(1)}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>

      <View>
        <FlatList
          data={CATEGORIES}
          renderItem={renderCategoryItem}
          keyExtractor={item => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterList}
        />
      </View>

      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => <ProductCard product={item} />}
        keyExtractor={item => item.id}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F7F6' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    padding: 20,
    color: '#2C3E50'
  },
  listContent: { paddingHorizontal: 8, paddingBottom: 30 },
  filterList: {
    paddingVertical: 15,
    maxHeight: 70, // Importante para que no ocupe toda la pantalla
    backgroundColor: '#FFFFFF',
  },
  chip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 8,
    borderRadius: 25,
    backgroundColor: '#E0E0E0',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipSelected: {
    backgroundColor: '#2C3E50', // Color oscuro para destacar
  },
  textChip: {
    color: '#7F8C8D',
    fontWeight: '600',
  },
  textSelected: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  // --- ESTILOS PARA LA LISTA DE PRODUCTOS ---
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  listContent: {
    paddingHorizontal: 8,
    paddingBottom: 30
  }
});