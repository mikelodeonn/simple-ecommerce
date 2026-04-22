import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const ICONS = ['👤', '🚀', '🐱', '🎮', '🍕', '🌈', '🔥', '💻'];

export const IconSelector = ({ selectedIcon, onSelect }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Elige tu avatar:</Text>
      <FlatList
        data={ICONS}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[
              styles.iconItem, 
              selectedIcon === item && styles.iconSelected
            ]}
            onPress={() => onSelect(item)}
          >
            <Text style={styles.emoji}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  label: { fontSize: 14, color: '#7F8C8D', marginBottom: 10, fontWeight: '600' },
  iconItem: { 
    padding: 10, 
    marginRight: 10, 
    borderRadius: 15, 
    borderWidth: 2, 
    borderColor: 'transparent',
    backgroundColor: '#F8F9F9'
  },
  iconSelected: { 
    borderColor: '#2C3E50', 
    backgroundColor: '#EAECEE' 
  },
  emoji: { fontSize: 28 }
});