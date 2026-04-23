import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, SafeAreaView } from 'react-native';
import { useAuth } from '../../../context/AuthContext';
import { userService } from '../services/UserService';

export const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) return Alert.alert("Error", "Ingresa tus datos");
    setLoading(true);
    try {
      const foundUser = await userService.validateLogin(email, password);
      if (foundUser) {
        await login(foundUser);
      } else {
        Alert.alert("Amazon", "No encontramos esa cuenta o fue eliminada");
      }
    } catch (e) {
      Alert.alert("Error", "Fallo al conectar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Iniciar sesión</Text>
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
        <Text style={styles.label}>Contraseña</Text>
        <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
        <TouchableOpacity style={styles.btn} onPress={handleLogin}>
          {loading ? <ActivityIndicator color="#000" /> : <Text style={styles.btnText}>Continuar</Text>}
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <View style={styles.line} /><Text style={styles.newText}>¿Eres nuevo en Amazon?</Text><View style={styles.line} />
      </View>
      <TouchableOpacity style={styles.regBtn} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.regBtnText}>Crea tu cuenta de Amazon</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  label: { fontWeight: 'bold', marginBottom: 5 },
  card: { padding: 10 },
  input: { borderWidth: 1, borderColor: '#DDD', padding: 12, borderRadius: 5, marginBottom: 15 },
  btn: { backgroundColor: '#FF9900', padding: 15, borderRadius: 5, alignItems: 'center' },
  btnText: { fontWeight: 'bold' },
  footer: { flexDirection: 'row', alignItems: 'center', marginVertical: 30 },
  line: { flex: 1, height: 1, backgroundColor: '#DDD' },
  newText: { marginHorizontal: 10, color: 'gray', fontSize: 12 },
  regBtn: { backgroundColor: '#EAEDED', padding: 12, borderRadius: 5, alignItems: 'center', borderWidth: 1, borderColor: '#BBB' },
  regBtnText: { color: '#111' }
});