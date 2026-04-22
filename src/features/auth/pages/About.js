import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const About = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Acerca de la App</Text>
      <Text style={styles.text}>
        Esta aplicación es un desarrollo enfocado en la arquitectura modular 
        y persistencia de datos local mediante AsyncStorage.
      </Text>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Tecnologías utilizadas:</Text>
        <Text style={styles.item}>• React Native (Core)</Text>
        <Text style={styles.item}>• React Navigation (Stack)</Text>
        <Text style={styles.item}>• JavaScript ES6+</Text>
      </View>

      <Text style={styles.footer}>Proyecto de Ingeniería Informática © 2026</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 30, backgroundColor: '#FFF', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#2C3E50', marginBottom: 15 },
  text: { fontSize: 16, color: '#7F8C8D', lineHeight: 24, marginBottom: 30 },
  card: { backgroundColor: '#F4F7F6', padding: 20, borderRadius: 15 },
  cardTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 10, color: '#34495E' },
  item: { fontSize: 14, color: '#2C3E50', marginBottom: 5 },
  footer: { textAlign: 'center', marginTop: 50, color: '#BDC3C7', fontSize: 12 }
});