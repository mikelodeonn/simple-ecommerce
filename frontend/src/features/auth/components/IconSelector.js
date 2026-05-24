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
  container: { 
    marginBottom: 30,
    paddingVertical: 5 
  },
  label: { 
    fontSize: 13, 
    color: '#636E72', 
    marginBottom: 15, 
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1 
  },
  iconItem: { 
    width: 65,
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15, 
    borderRadius: 20, 
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5, 
    borderColor: '#F1F3F5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2
  },
  iconSelected: { 
    borderColor: '#1A1A1A',
    backgroundColor: '#FFFFFF', 
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    transform: [{ scale: 1.05 }] 
  },
  emoji: { 
    fontSize: 32 
  }
});