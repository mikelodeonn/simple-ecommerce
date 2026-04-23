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
  container: { 
    flex: 1, 
    backgroundColor: '#F8F9FA' 
  },
  content: { 
    paddingHorizontal: 30, 
    paddingTop: 60,
    justifyContent: 'center'
  },
  title: { 
    fontSize: 32, 
    fontWeight: '800', 
    marginBottom: 10, 
    color: '#1A1A1A',
    letterSpacing: -0.5
  },
  subtitle: { 
    fontSize: 16,
    color: '#6C757D',
    marginBottom: 30
  },
  form: { 
    marginBottom: 10 
  },
  label: { 
    fontWeight: '600', 
    marginBottom: 8, 
    fontSize: 14, 
    color: '#495057' 
  },
  input: { 
    backgroundColor: '#FFF',
    borderWidth: 1, 
    borderColor: '#E9ECEF', 
    padding: 16, 
    borderRadius: 12, 
    marginBottom: 20, 
    fontSize: 16,
    color: '#212529',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2
  },
  loginBtn: { 
    backgroundColor: '#007AFF', 
    paddingVertical: 16, 
    borderRadius: 12, 
    alignItems: 'center', 
    marginTop: 10,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5
  },
  loginBtnText: { 
    fontSize: 18, 
    fontWeight: '700', 
    color: '#FFF' 
  },
  dividerContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginVertical: 40 
  },
  line: { 
    flex: 1, 
    height: 1, 
    backgroundColor: '#DEE2E6' 
  },
  dividerText: { 
    marginHorizontal: 15, 
    color: '#ADB5BD', 
    fontSize: 14,
    fontWeight: '500'
  },
  createAccountBtn: { 
    padding: 16, 
    borderRadius: 12, 
    alignItems: 'center', 
    borderWidth: 1.5, 
    borderColor: '#007AFF' 
  },
  createAccountBtnText: { 
    color: '#007AFF', 
    fontSize: 16, 
    fontWeight: '600' 
  }
});