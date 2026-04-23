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
  container: { 
    flex: 1, 
    backgroundColor: '#FFFFFF' 
  },
  scrollContent: { 
    paddingHorizontal: 30, 
    paddingTop: 50,
    paddingBottom: 40 
  },
  title: { 
    fontSize: 30, 
    fontWeight: '800', 
    marginBottom: 10, 
    color: '#1A1A1A',
    letterSpacing: -0.8 
  },
  subtitle: { 
    fontSize: 15,
    color: '#636E72',
    marginBottom: 35
  },
  form: { 
    width: '100%' 
  },
  label: { 
    fontWeight: '600', 
    marginBottom: 8, 
    fontSize: 13, 
    color: '#2D3436',
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  input: { 
    backgroundColor: '#F8F9FA', 
    borderWidth: 1, 
    borderColor: '#E9ECEF', 
    padding: 16, 
    borderRadius: 14, 
    marginBottom: 22, 
    fontSize: 16,
    color: '#2D3436'
  },
  registerBtn: { 
    backgroundColor: '#1A1A1A', 
    padding: 18, 
    borderRadius: 14, 
    alignItems: 'center', 
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4
  },
  registerBtnText: { 
    fontSize: 17, 
    color: '#FFF', 
    fontWeight: '700' 
  },
  disclaimer: { 
    marginTop: 25, 
    fontSize: 13, 
    color: '#A0AEC0', 
    lineHeight: 20,
    textAlign: 'center' 
  }
});