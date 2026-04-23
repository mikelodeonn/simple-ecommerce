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
    if (!email || !password) return Alert.alert("Error", "Please fill in all fields");
    setLoading(true);
    try {
      const foundUser = await userService.validateLogin(email, password);
      if (foundUser) {
        await login(foundUser);
      } else {
        Alert.alert("Amazon", "Account not found or incorrect credentials");
      }
    } catch (e) {
      Alert.alert("Error", "Connection failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Sign-In</Text>
        
        <View style={styles.form}>
          <Text style={styles.label}>Email</Text>
          <TextInput 
            style={styles.input} 
            value={email} 
            onChangeText={setEmail} 
            autoCapitalize="none" 
            keyboardType="email-address" 
            placeholder="example@email.com"
          />

          <Text style={styles.label}>Password</Text>
          <TextInput 
            style={styles.input} 
            value={password} 
            onChangeText={setPassword} 
            secureTextEntry 
          />

          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin} disabled={loading}>
            {loading ? <ActivityIndicator color="#000" /> : <Text style={styles.loginBtnText}>Continue</Text>}
          </TouchableOpacity>
        </View>

        <View style={styles.dividerContainer}>
          <View style={styles.line} />
          <Text style={styles.dividerText}>New to Amazon?</Text>
          <View style={styles.line} />
        </View>

        <TouchableOpacity 
          style={styles.createAccountBtn} 
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.createAccountBtnText}>Create your Amazon account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  content: { paddingHorizontal: 25, paddingTop: 40 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 25, color: '#111' },
  form: { marginBottom: 20 },
  label: { fontWeight: 'bold', marginBottom: 8, fontSize: 14, color: '#111' },
  input: { 
    borderWidth: 1, 
    borderColor: '#BBB', 
    padding: 12, 
    borderRadius: 4, 
    marginBottom: 18, 
    fontSize: 16 
  },
  loginBtn: { 
    backgroundColor: '#FF9900', 
    padding: 14, 
    borderRadius: 4, 
    alignItems: 'center', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    elevation: 2
  },
  loginBtnText: { fontSize: 16, fontWeight: '500' },
  dividerContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 35 },
  line: { flex: 1, height: 1, backgroundColor: '#DDD' },
  dividerText: { marginHorizontal: 10, color: '#767676', fontSize: 12 },
  createAccountBtn: { 
    backgroundColor: '#F0F2F2', 
    padding: 12, 
    borderRadius: 4, 
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: '#D5D9D9' 
  },
  createAccountBtnText: { color: '#111', fontSize: 14 }
});