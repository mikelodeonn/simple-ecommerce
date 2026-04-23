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
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        margin: 8,
        flex: 1,
        width: cardWidth,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#F1F3F5' 
    },
    image: { 
        width: '100%', 
        height: 160, 
        backgroundColor: '#F8F9FA', 
        resizeMode: 'contain'
    },
    info: { 
        padding: 14 
    },
    title: { 
        fontSize: 15, 
        fontWeight: '600', 
        color: '#1A1A1A', 
        height: 42, 
        lineHeight: 20
    },
    seller: { 
        fontSize: 12, 
        color: '#A0AEC0', 
        marginBottom: 6,
        fontWeight: '500'
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        backgroundColor: '#FFFBEB', 
        alignSelf: 'flex-start',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6
    },
    ratingText: {
        fontSize: 13,
        fontWeight: '800',
        color: '#F39C12', 
        marginRight: 4,
    },
    countText: {
        fontSize: 11,
        color: '#94A3B8', 
    },
    price: {
        fontSize: 18,
        fontWeight: '900',
        color: '#1A1A1A', 
        marginTop: 4,
    },
});