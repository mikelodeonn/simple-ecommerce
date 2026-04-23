import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  ScrollView, 
  SafeAreaView 
} from 'react-native';
import { useAuth } from '../../../context/AuthContext';

export const EditProfile = ({ navigation }) => {
  const { user, updateUser, deleteAccount } = useAuth();
  
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [emoji, setEmoji] = useState(user?.emoji || '👤');
  const [password, setPassword] = useState(user?.password || '');

  const handleUpdate = async () => {
    if (!name || !email || !password) {
      return Alert.alert("Error", "Todos los campos son obligatorios");
    }
    try {
      await updateUser({ ...user, name, email, emoji, password });
      Alert.alert("Éxito", "Información actualizada");
      navigation.goBack();
    } catch (e) {
      Alert.alert("Error", "No se pudo actualizar la información");
    }
  };

  const confirmDelete = () => {
    Alert.alert(
      "Eliminar Cuenta",
      "¿Estás seguro de eliminar tu cuenta? Se borrarán tus pedidos y carrito de este dispositivo.",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Eliminar definitivamente", 
          style: "destructive", 
          onPress: async () => {
            await deleteAccount();
          } 
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.form}>
          <Text style={styles.label}>Avatar (Emoji)</Text>
          <TextInput 
            style={styles.input} 
            value={emoji} 
            onChangeText={setEmoji} 
            placeholder="Ej: 🦁" 
          />

          <Text style={styles.label}>Nombre completo</Text>
          <TextInput 
            style={styles.input} 
            value={name} 
            onChangeText={setName} 
          />

          <Text style={styles.label}>Correo electrónico</Text>
          <TextInput 
            style={styles.input} 
            value={email} 
            onChangeText={setEmail} 
            keyboardType="email-address" 
            autoCapitalize="none" 
          />

          <Text style={styles.label}>Contraseña</Text>
          <TextInput 
            style={styles.input} 
            value={password} 
            onChangeText={setPassword} 
            secureTextEntry 
          />

          <TouchableOpacity style={styles.saveBtn} onPress={handleUpdate}>
            <Text style={styles.saveText}>Guardar Cambios</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.deleteBtn} onPress={confirmDelete}>
            <Text style={styles.deleteText}>Eliminar mi cuenta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  scroll: { padding: 20 },
  form: { marginTop: 10 },
  label: { fontWeight: 'bold', color: '#232F3E', marginBottom: 5, fontSize: 14 },
  input: { 
    backgroundColor: '#F4F7F6', 
    padding: 12, 
    borderRadius: 5, 
    marginBottom: 20, 
    borderWidth: 1, 
    borderColor: '#DDD' 
  },
  saveBtn: { 
    backgroundColor: '#F0C14B', 
    padding: 15, 
    borderRadius: 5, 
    alignItems: 'center', 
    borderColor: '#A88734', 
    borderWidth: 1 
  },
  saveText: { fontWeight: 'bold', color: '#111' },
  divider: { height: 1, backgroundColor: '#DDD', marginVertical: 30 },
  deleteBtn: { 
    padding: 15, 
    borderRadius: 5, 
    borderWidth: 1, 
    borderColor: '#E74C3C', 
    alignItems: 'center' 
  },
  deleteText: { color: '#E74C3C', fontWeight: 'bold' }
});