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
    backgroundColor: '#FFFFFF' 
  },
  content: { 
    paddingHorizontal: 32, 
    paddingTop: 80, 
    justifyContent: 'flex-start'
  },
  title: { 
    fontSize: 34, 
    fontWeight: '900', 
    marginBottom: 8, 
    color: '#121212',
    letterSpacing: -1.2 
  },
  subtitle: { 
    fontSize: 16,
    color: '#8E8E93', 
    marginBottom: 40,
    lineHeight: 22
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
    color: '#8E8E93', 
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