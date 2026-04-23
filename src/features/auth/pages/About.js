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
  container: { 
    flex: 1, 
    paddingHorizontal: 32, 
    backgroundColor: '#FFFFFF', 
    justifyContent: 'center' 
  },
  title: { 
    fontSize: 28, 
    fontWeight: '800', 
    color: '#1A1A1A', 
    marginBottom: 12,
    letterSpacing: -0.5 
  },
  text: { 
    fontSize: 16, 
    color: '#636E72', 
    lineHeight: 26, 
    marginBottom: 35,
    fontWeight: '400'
  },
  card: { 
    backgroundColor: '#F8F9FA', 
    padding: 24, 
    borderRadius: 20, 
    borderWidth: 1,
    borderColor: '#F1F3F5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.03,
    shadowRadius: 20,
    elevation: 2 
  },
  cardTitle: { 
    fontWeight: '700', 
    fontSize: 18, 
    marginBottom: 15, 
    color: '#2D3436',
    letterSpacing: 0.2
  },
  item: { 
    fontSize: 15, 
    color: '#495057', 
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },
  footer: { 
    textAlign: 'center', 
    marginTop: 60, 
    color: '#B2BEC3', 
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 0.5,
    textTransform: 'uppercase' 
  }
});