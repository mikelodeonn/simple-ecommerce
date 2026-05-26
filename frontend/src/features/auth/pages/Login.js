import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  ActivityIndicator, 
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Platform
} from 'react-native';
import { useAuth } from '../../../context/AuthContext';
import { userService } from '../services/UserService';

export const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const APP_NAME = "Amazing App";

  const handleLogin = async () => {
    // Sanitización de strings básicos
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (!cleanEmail || !cleanPassword) {
      return Alert.alert("Error", "Please fill in all fields");
    }

    setLoading(true);
    try {
      const foundUser = await userService.validateLogin(cleanEmail, cleanPassword);
      
      if (foundUser) {
        await login(foundUser);
      } else {
        Alert.alert(APP_NAME, "Account not found or incorrect credentials");
      }
    } catch (e) {
      console.error("Login Error:", e); // Log interno para debugging
      Alert.alert("Error", "Connection failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.keyboardView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent} 
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.appName}>{APP_NAME.toUpperCase()}</Text>
          <Text style={styles.title}>Sign-In</Text>

          <View style={styles.form}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              textContentType="emailAddress" // Ayuda al autocompletado del sistema operativo
              placeholder="example@email.com"
              placeholderTextColor="#8E8E93"
              editable={!loading}
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry
              textContentType="password" // Permite usar el llavero/Keychain de contraseñas
              placeholder="••••••••"
              placeholderTextColor="#8E8E93"
              editable={!loading}
            />

            <TouchableOpacity 
              style={[styles.loginBtn, loading && styles.disabledBtn]} 
              onPress={handleLogin} 
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFF" /> // Cambiado a blanco para mejor contraste sobre fondo negro
              ) : (
                <Text style={styles.loginBtnText}>Continue</Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.dividerContainer}>
            <View style={styles.line} />
            <Text style={styles.dividerText}>New to {APP_NAME}?</Text>
            <View style={styles.line} />
          </View>

          <TouchableOpacity
            style={[styles.createAccountBtn, loading && styles.disabledBtn]}
            onPress={() => navigation.navigate('Register')}
            disabled={loading}
          >
            <Text style={styles.createAccountBtnText}>Create your account</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#828b70'
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 32,
    paddingTop: 40,
    paddingBottom: 24,
  },
  appName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 40,
    letterSpacing: 3, 
  },
  title: {
    fontSize: 34,
    fontWeight: '900',
    marginBottom: 8,
    color: '#121212',
    letterSpacing: -1.2
  },
  form: {
    marginBottom: 15
  },
  label: {
    fontWeight: '700',
    marginBottom: 10,
    fontSize: 13,
    color: '#1C1C1E',
    textTransform: 'uppercase',
    letterSpacing: 0.8
  },
  input: {
    backgroundColor: '#F2F2F7',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    padding: 18,
    borderRadius: 16,
    marginBottom: 24,
    fontSize: 16,
    color: '#000',
  },
  loginBtn: {
    backgroundColor: '#1A1A1A',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 8
  },
  disabledBtn: {
    opacity: 0.6,
  },
  loginBtnText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
    letterSpacing: 0.5
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 45
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E5EA'
  },
  dividerText: {
    marginHorizontal: 15,
    color: '#4A4A4F', // Ajustado para mejor legibilidad sobre fondo oliva oscuro (#828b70)
    fontSize: 13,
    fontWeight: '600'
  },
  createAccountBtn: {
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#1A1A1A'
  },
  createAccountBtnText: {
    color: '#1A1A1A',
    fontSize: 16,
    fontWeight: '700'
  }
});