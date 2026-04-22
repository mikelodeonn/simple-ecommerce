import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { storageService } from '../../../shared/services/storageService';
import { useAuth } from '../../../context/AuthContext';

export const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login} = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Campos incompletos", "Por favor ingresa tus credenciales.");
      return;
    }

    const savedUser = await storageService.get('user_session');

    if (savedUser && savedUser.email === email && savedUser.password === password) {
      await login (savedUser);
      navigation.replace('ProductCatalog');
    } else {
      Alert.alert("Error", "Correo o contraseña incorrectos.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>MyStore</Text>
      <Text style={styles.subtitle}>Bienvenido de nuevo</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.linkText}>¿No tienes cuenta? <Text style={styles.bold}>Regístrate aquí</Text></Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.aboutLink} 
        onPress={() => navigation.navigate('About')}
      >
        <Text style={styles.aboutText}>Acerca de esta aplicación</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 30, backgroundColor: '#FFF' },
  logo: { fontSize: 40, fontWeight: 'bold', color: '#2C3E50', textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#95A5A6', textAlign: 'center', marginBottom: 40 },
  input: { backgroundColor: '#F4F7F6', padding: 15, borderRadius: 12, marginBottom: 15, fontSize: 16 },
  button: { backgroundColor: '#2C3E50', padding: 18, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  linkText: { textAlign: 'center', marginTop: 25, color: '#7F8C8D' },
  bold: { color: '#2C3E50', fontWeight: 'bold' },
  aboutLink: { marginTop: 60, alignItems: 'center' },
  aboutText: { color: '#BDC3C7', fontSize: 14, textDecorationLine: 'underline' }
});