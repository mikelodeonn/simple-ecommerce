import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, SafeAreaView, ScrollView } from 'react-native';
import { useAuth } from '../../../context/AuthContext';
import { userService } from '../services/UserService';

export const Register = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleRegister = async () => {
    if (!email || !password || !name) return Alert.alert("Error", "Please fill in all fields");
    setLoading(true);
    try {
      const newUser = { email, name, password, emoji: '👤' };
      const success = await userService.registerUser(newUser);
      if (success) {
        await login(newUser);
      } else {
        Alert.alert("Error", "This email is already registered");
      }
    } catch (e) {
      Alert.alert("Error", "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Create account</Text>
        
        <View style={styles.form}>
          <Text style={styles.label}>Your name</Text>
          <TextInput 
            style={styles.input} 
            value={name} 
            onChangeText={setName} 
            placeholder="First and last name"
          />

          <Text style={styles.label}>Email</Text>
          <TextInput 
            style={styles.input} 
            value={email} 
            onChangeText={setEmail} 
            autoCapitalize="none" 
            keyboardType="email-address" 
          />

          <Text style={styles.label}>Password</Text>
          <TextInput 
            style={styles.input} 
            value={password} 
            onChangeText={setPassword} 
            secureTextEntry 
            placeholder="At least 6 characters"
          />

          <TouchableOpacity style={styles.registerBtn} onPress={handleRegister} disabled={loading}>
            {loading ? <ActivityIndicator color="#000" /> : <Text style={styles.registerBtnText}>Continue</Text>}
          </TouchableOpacity>

          <Text style={styles.disclaimer}>
            By creating an account, you agree to Amazon's Conditions of Use and Privacy Notice.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  scrollContent: { paddingHorizontal: 25, paddingTop: 30 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 25, color: '#111' },
  form: { width: '100%' },
  label: { fontWeight: 'bold', marginBottom: 6, fontSize: 14, color: '#111' },
  input: { 
    borderWidth: 1, 
    borderColor: '#BBB', 
    padding: 12, 
    borderRadius: 4, 
    marginBottom: 20, 
    fontSize: 16 
  },
  registerBtn: { 
    backgroundColor: '#F0C14B', 
    padding: 14, 
    borderRadius: 4, 
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: '#A88734',
    marginTop: 10
  },
  registerBtnText: { fontSize: 16, color: '#111' },
  disclaimer: { 
    marginTop: 20, 
    fontSize: 12, 
    color: '#555', 
    lineHeight: 18 
  }
});