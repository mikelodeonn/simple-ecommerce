import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Modal, TextInput } from 'react-native';
import { useAuth } from '../../../context/AuthContext';

export const Profile = ({ navigation }) => {
  const { user, logout, deleteAccount } = useAuth();
  const [isModalVisible, setModalVisible] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');

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

  const confirmDelete = () => {
    if (confirmPassword === user?.password) {
      setModalVisible(false);
      deleteAccount(); // El Navigator nos sacará automáticamente
    } else {
      Alert.alert("Error", "La contraseña es incorrecta");
    }
  };
  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.avatar}>{user?.icon || '👤'}</Text>
        <Text style={styles.name}>{user?.name || 'Usuario'}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      <View style={styles.menu}>
        {/* Botón Editar */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('EditProfile')}
        >
          <Text style={styles.menuText}>📝 Editar Información</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}
        onPress={() => navigation.navigate('OrderHistory')}>
          
          <Text style={styles.menuText}>📦 Mis Pedidos</Text>
        </TouchableOpacity>

  
        <TouchableOpacity style={[styles.menuItem, styles.logoutBtn]} onPress={handleLogout}>
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>

     
        <TouchableOpacity
          style={styles.deleteAccountBtn}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.deleteAccountText}>Eliminar Cuenta</Text>
        </TouchableOpacity>
      </View>


      <Modal visible={isModalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirmar Eliminación</Text>
            <Text style={styles.modalSub}>Ingresa tu contraseña para borrar permanentemente tu cuenta:</Text>

            <TextInput
              style={styles.modalInput}
              placeholder="Contraseña"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => { setModalVisible(false); setConfirmPassword(''); }}
              >
                <Text>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.confirmBtn} onPress={confirmDelete}>
                <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F7F6', padding: 20 },
  header: { alignItems: 'center', marginVertical: 30, backgroundColor: '#FFF', padding: 25, borderRadius: 20 },
  avatar: { fontSize: 70, marginBottom: 10 },
  name: { fontSize: 22, fontWeight: 'bold', color: '#2C3E50' },
  email: { fontSize: 14, color: '#7F8C8D' },
  menu: { marginTop: 10 },
  menuItem: { backgroundColor: '#FFF', padding: 18, borderRadius: 12, marginBottom: 10 },
  menuText: { fontSize: 16, color: '#2C3E50' },
  logoutBtn: { marginTop: 10 },
  logoutText: { color: '#E74C3C', fontWeight: 'bold', textAlign: 'center' },
  deleteAccountBtn: { marginTop: 40 },
  deleteAccountText: { color: '#BDC3C7', fontSize: 12, textAlign: 'center', textDecorationLine: 'underline' },
  
  modalContainer: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '85%', backgroundColor: '#FFF', padding: 25, borderRadius: 20 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#2C3E50' },
  modalSub: { fontSize: 14, color: '#7F8C8D', marginBottom: 20 },
  modalInput: { backgroundColor: '#F4F7F6', padding: 15, borderRadius: 10, marginBottom: 20 },
  modalButtons: { flexDirection: 'row', justifyContent: 'flex-end' },
  cancelBtn: { padding: 15, marginRight: 10 },
  confirmBtn: { backgroundColor: '#E74C3C', padding: 15, borderRadius: 10 }
});