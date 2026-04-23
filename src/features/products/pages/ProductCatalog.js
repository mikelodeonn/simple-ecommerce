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
  container: { 
    flex: 1, 
    backgroundColor: '#F8F9FA' 
  },
  center: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 20
  },
  headerTitle: {
    fontSize: 28, 
    fontWeight: '800',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    color: '#1A1A1A', 
    letterSpacing: -0.8
  },
  filterList: {
    paddingVertical: 12,
    maxHeight: 80, 
    backgroundColor: '#F8F9FA', 
  },
  chip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginHorizontal: 6,
    borderRadius: 14, 
    backgroundColor: '#FFFFFF',
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E9ECEF'
  },
  chipSelected: {
    backgroundColor: '#1A1A1A', 
    borderColor: '#1A1A1A',
    shadowColor: '#1A1A1A',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5
  },
  textChip: {
    color: '#636E72', 
    fontWeight: '600',
    fontSize: 14,
  },
  textSelected: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  listContent: {
    paddingHorizontal: 12,
    paddingBottom: 40 
  }
});