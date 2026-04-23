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
  container: { 
    flex: 1, 
    backgroundColor: '#F8F9FA' 
  },
  scroll: { 
    padding: 20 
  },
  header: { 
    backgroundColor: '#FFF', 
    paddingVertical: 40, 
    paddingHorizontal: 20,
    borderRadius: 24,
    alignItems: 'center', 
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 3 
  },
  emojiContainer: {
    backgroundColor: '#F1F3F5',
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15
  },
  emoji: { 
    fontSize: 50 
  },
  name: { 
    fontSize: 24, 
    fontWeight: '800', 
    color: '#1A1A1A',
    letterSpacing: -0.5
  },
  email: { 
    color: '#6C757D', 
    fontSize: 15,
    marginTop: 4,
    fontWeight: '400'
  },
  menu: { 
    gap: 12 
  },
  amazonBtn: { 
    backgroundColor: '#FFFFFF', 
    paddingVertical: 18, 
    paddingHorizontal: 20,
    borderRadius: 16, 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1, 
    borderColor: '#E9ECEF',
    // Sombra sutil para cada item
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    elevation: 1
  },
  btnText: { 
    color: '#2D3436', 
    fontSize: 16, 
    fontWeight: '600' 
  },
  logoutBtn: { 
    marginTop: 40, 
    padding: 20, 
    borderRadius: 16,
    alignItems: 'center',
    backgroundColor: '#FFF1F2'
  },
  logoutText: { 
    color: '#FF4757', 
    fontWeight: '700', 
    fontSize: 16 
  }
});