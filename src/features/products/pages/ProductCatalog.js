import React from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, Text, SafeAreaView } from 'react-native';
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from '../components/ProductCard';

export const ProductCatalog = () => {
 
  const { products, isLoading, refresh } = useProducts();

  if (isLoading && products.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Global Catalog</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard product={item} />}
        numColumns={2}

        refreshing={isLoading} 
        onRefresh={refresh}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
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
  listContent: { paddingHorizontal: 8, paddingBottom: 30 }
});