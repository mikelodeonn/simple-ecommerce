import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export const ProductCard = ({ product }) => {

    const imageSource = typeof product.image === 'string'
        ? { uri: product.image }
        : product.image;

    return (
        <View style={styles.card}>
            <Image
                source={imageSource}
                style={styles.image}
                resizeMode="contain"
            />
            <View style={styles.info}>
                <Text style={styles.title} numberOfLines={2}>{product.title}</Text>
                <Text style={styles.seller}>Seller: {product.seller}</Text>
                <Text style={styles.price}>${product.price.toFixed(2)}</Text>
                <Text style={[styles.stock, { color: product.stock > 0 ? '#4CAF50' : '#F44336' }]}>
                    Stock: {product.stock}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        margin: 8,
        flex: 1,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        overflow: 'hidden'
    },
    image: { width: '100%', height: 140, backgroundColor: '#fff', marginTop: 10 },
    info: { padding: 12 },
    title: { fontSize: 14, fontWeight: '600', color: '#333', height: 40 },
    seller: { fontSize: 11, color: '#777', marginBottom: 4 },
    price: { fontSize: 16, fontWeight: 'bold', color: '#1a1a1a' },
    stock: { fontSize: 12, marginTop: 6, fontWeight: '500' }
});