import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useAuth } from '../../../context/AuthContext';

export const Profile = ({ navigation }) => {
  const { user, logout } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.emoji}>{user?.emoji || '👤'}</Text>
          <Text style={styles.name}>{user?.name || 'Usuario'}</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>

        <View style={styles.menu}>
          <TouchableOpacity 
            style={styles.amazonBtn} 
            onPress={() => navigation.navigate('EditProfile')}
          >
            <Text style={styles.btnText}>Editar Información / Eliminar Cuenta</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.amazonBtn} 
            onPress={() => navigation.navigate('OrderHistory')}
          >
            <Text style={styles.btnText}>Mis Pedidos</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
            <Text style={styles.logoutText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EAEDED' },
  scroll: { padding: 15 },
  header: { 
    backgroundColor: '#FFF', 
    padding: 30, 
    borderRadius: 8, 
    alignItems: 'center', 
    marginBottom: 20,
    elevation: 2 
  },
  emoji: { fontSize: 60, marginBottom: 10 },
  name: { fontSize: 22, fontWeight: 'bold', color: '#232F3E' },
  email: { color: 'gray', fontSize: 14 },
  menu: { gap: 10 },
  amazonBtn: { 
    backgroundColor: '#F0C14B', 
    padding: 15, 
    borderRadius: 5, 
    borderColor: '#A88734', 
    borderWidth: 1, 
    alignItems: 'center' 
  },
  btnText: { color: '#111', fontSize: 16, fontWeight: '500' },
  logoutBtn: { 
    marginTop: 30, 
    padding: 15, 
    alignItems: 'center' 
  },
  logoutText: { color: '#007185', fontWeight: 'bold', fontSize: 16 }
});