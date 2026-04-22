import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '../../../context/AuthContext';

export const Profile = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      "Cerrar Sesión",
      "¿Estás seguro de que quieres salir?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Salir", 
          onPress: logout, 
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.avatar}>{user?.icon || '👤'}</Text>
        <Text style={styles.name}>{user?.name || 'Usuario'}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Mis Pedidos (Próximamente)</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.menuItem, styles.logoutBtn]} onPress={handleLogout}>
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F7F6', padding: 20 },
  header: { alignItems: 'center', marginVertical: 40, backgroundColor: '#FFF', padding: 30, borderRadius: 20 },
  avatar: { fontSize: 80, marginBottom: 10 },
  name: { fontSize: 22, fontWeight: 'bold', color: '#2C3E50' },
  email: { fontSize: 14, color: '#7F8C8D' },
  menu: { marginTop: 10 },
  menuItem: { backgroundColor: '#FFF', padding: 18, borderRadius: 12, marginBottom: 10 },
  menuText: { fontSize: 16, color: '#2C3E50' },
  logoutBtn: { border谨Width: 1, borderColor: '#E74C3C', marginTop: 20 },
  logoutText: { color: '#E74C3C', fontWeight: 'bold', textAlign: 'center' }
});