import React, { useReducer } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';

export const ProductDetail = () => {

    const route = useRoute();

    const product = route.params?.product;

    console.log('PRODUCT DETAIL:', product); // 👈 AQUÍ

    
    const handleAddToCart = () => {

        Alert.alert("Carrito", "Producto añadido al carrito (Lógica pendiente)");
    };

    const handleBuyNow = () => {
        Alert.alert("Pago", "Redirigiendo a pasarela de pago (Próximamente)");
    };

    const imageSource = typeof product.image === 'string'
        ? { uri: product.image}
        : product.image;

    return (
        <View style={styles.mainContainer}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

                <Image source={imageSource} style={styles.image} resizeMode="cover" />


                <View style={styles.infoCard}>
                    <Text style={styles.category}>{product.category.toUpperCase()}</Text>
                    <Text style={styles.title}>{product.title}</Text>

                    <View style={styles.priceRatingRow}>
                        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
                        <View style={styles.ratingBadge}>
                            <Text style={styles.ratingText}>⭐ {product.rating.rate}</Text>
                        </View>
                    </View>
                </View>


                <View style={styles.detailsSection}>
                    <Text style={styles.sectionTitle}>Descripción</Text>
                    <Text style={styles.description}>{product.description}</Text>

                    <View style={styles.stockContainer}>
                        <Text style={styles.stockLabel}>Disponibilidad:</Text>
                        <Text style={[styles.stockValue, product.stock < 5 ? styles.lowStock : null]}>
                            {product.stock} unidades
                        </Text>
                    </View>

                    <Text style={styles.sellerText}>Vendido por: {product.seller}</Text>
                </View>
            </ScrollView>


            <View style={styles.footer}>
                <TouchableOpacity style={styles.cartButton} onPress={handleAddToCart}>
                    <Text style={styles.cartButtonText}>Agregar al Carrito</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buyButton} onPress={handleBuyNow}>
                    <Text style={styles.buyButtonText}>Comprar Ahora</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: { flex: 1, backgroundColor: '#FFFFFF' },
    container: { flex: 1 },
    image: { width: '100%', height: 350 },

    infoCard: {
        padding: 20,
        backgroundColor: '#FFF',
        marginTop: -30, // Efecto de solapado
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    category: { color: '#95A5A6', fontSize: 12, fontWeight: 'bold', marginBottom: 5 },
    title: { fontSize: 22, fontWeight: 'bold', color: '#2C3E50', marginBottom: 10 },
    priceRatingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    price: { fontSize: 24, fontWeight: '800', color: '#27AE60' },
    ratingBadge: { backgroundColor: '#F1C40F', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
    ratingText: { color: '#FFF', fontWeight: 'bold' },

    detailsSection: { padding: 20 },
    sectionTitle: { fontSize: 18, fontWeight: '700', color: '#2C3E50', marginBottom: 10 },
    description: { fontSize: 15, color: '#7F8C8D', lineHeight: 22, marginBottom: 20 },

    stockContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
    stockLabel: { fontSize: 14, color: '#34495E', marginRight: 5 },
    stockValue: { fontSize: 14, fontWeight: 'bold', color: '#27AE60' },
    lowStock: { color: '#E74C3C' },
    sellerText: { fontSize: 12, color: '#BDC3C7', fontStyle: 'italic' },

    footer: {
        flexDirection: 'row',
        padding: 20,
        borderTopWidth: 1,
        borderColor: '#ECF0F1',
        backgroundColor: '#FFF',
    },
    cartButton: {
        flex: 1,
        backgroundColor: '#ECF0F1',
        paddingVertical: 15,
        borderRadius: 12,
        marginRight: 10,
        alignItems: 'center',
    },
    cartButtonText: { color: '#2C3E50', fontWeight: 'bold' },
    buyButton: {
        flex: 1,
        backgroundColor: '#2C3E50',
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: 'center',
    },
    buyButtonText: { color: '#FFF', fontWeight: 'bold' },
});