import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { IconSelector } from '../components/IconSelector';
import { storageService } from '../../../shared/services/storageService';

export const Register = ({ navigation }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    icon: '👤'
  });

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }

    try {
      await storageService.save('user_session', form);
      Alert.alert("¡Cuenta creada!", "Ya puedes iniciar sesión.", [
        { text: "Ir al Login", onPress: () => navigation.navigate('Login') }
      ]);
    } catch (e) {
      Alert.alert("Error", "No se pudieron guardar los datos.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Crea tu cuenta</Text>

      <IconSelector 
        selectedIcon={form.icon} 
        onSelect={(icon) => setForm({...form, icon})} 
      />

      <TextInput
        style={styles.input}
        placeholder="Nombre completo"
        onChangeText={(val) => setForm({...form, name: val})}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        autoCapitalize="none"
        onChangeText={(val) => setForm({...form, email: val})}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        onChangeText={(val) => setForm({...form, password: val})}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse ahora</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 30, backgroundColor: '#FFF', flexGrow: 1, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#2C3E50', marginBottom: 30 },
  input: { backgroundColor: '#F4F7F6', padding: 15, borderRadius: 12, marginBottom: 15 },
  button: { backgroundColor: '#2C3E50', padding: 18, borderRadius: 12, alignItems: 'center', marginTop: 20 },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 }
});