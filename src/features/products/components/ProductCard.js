import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

export const ProductCard = ({ product }) => {

    const navigation = useNavigation();

    const imageSource = typeof product.image === 'string'
        ? { uri: product.image }
        : product.image;



    return (
        <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { product })}>
            <View style={styles.card}>
                <Image
                    source={imageSource}
                    style={styles.image}
                    resizeMode="contain"
                />
                <View style={styles.info}>
                    <Text style={styles.title} numberOfLines={2}>{product.title}</Text>
                    <Text style={styles.seller}>Seller: {product.seller}</Text>
                    <View style={styles.ratingContainer}>
                        <Text style={styles.ratingText}>⭐ {product.rating.rate}</Text>
                        <Text style={styles.countText}>({product.rating.count})</Text>
                    </View>
                    <Text style={styles.price}>${product.price.toFixed(2)}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const { width } = Dimensions.get('window');
const cardWidth = (width / 2) - 15;

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        margin: 7,
        flex: 1,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        overflow: 'hidden',
        width: cardWidth
    },
    image: { width: '100%', height: 140, backgroundColor: '#fff', marginTop: 10 },
    info: { padding: 12 },
    title: { fontSize: 14, fontWeight: '600', color: '#333', height: 40 },
    seller: { fontSize: 11, color: '#777', marginBottom: 4 },
    price: { fontSize: 16, fontWeight: 'bold', color: '#1a1a1a' },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
        marginBottom: 4,
    },
    ratingText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#F1C40F', // Color dorado/amarillo para la estrella
        marginRight: 4,
    },
    countText: {
        fontSize: 12,
        color: '#7F8C8D', // Gris suave para el número de reseñas
    },
    price: {
        fontSize: 16,
        fontWeight: '700',
        color: '#2C3E50',
        marginTop: 2,
    },
});