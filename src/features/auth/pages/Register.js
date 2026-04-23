import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, SafeAreaView } from 'react-native';
import { useAuth } from '../../../context/AuthContext';
import { userService } from '../services/UserService';

export const Register = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleRegister = async () => {
    if (!email || !password || !name) return Alert.alert("Error", "Completa los campos");
    setLoading(true);
    try {
      const newUser = { email, name, password, emoji: '👤' };
      const success = await userService.registerUser(newUser);
      if (success) {
        await login(newUser);
      } else {
        Alert.alert("Error", "Ese correo ya existe");
      }
    } catch (e) {
      Alert.alert("Error", "Fallo al registrar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Crear cuenta</Text>
      <Text style={styles.label}>Tu nombre</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
      <Text style={styles.label}>Contraseña</Text>
      <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry placeholder="Mínimo 6 caracteres" />
      <TouchableOpacity style={styles.btn} onPress={handleRegister}>
        {loading ? <ActivityIndicator color="#000" /> : <Text style={styles.btnText}>Continuar</Text>}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  label: { fontWeight: 'bold', marginBottom: 5 },
  input: { borderWidth: 1, borderColor: '#DDD', padding: 12, borderRadius: 5, marginBottom: 15 },
  btn: { backgroundColor: '#F0C14B', padding: 15, borderRadius: 5, alignItems: 'center', borderWidth: 1, borderColor: '#A88734' },
  btnText: { fontWeight: 'bold' }
});