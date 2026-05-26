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
  ScrollView 
} from 'react-native';
import { useAuth } from '../../../context/AuthContext';
import { userService } from '../services/UserService';

export const Register = ({ navigation }) => {
  const [form, setForm] = useState({ email: '', password: '', name: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const { email, password, name } = form;
    if (!email || !password || !name) {
      Alert.alert("Error", "Please fill in all fields");
      return false;
    }
    const isPasswordValid = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/.test(password);
    if (!isPasswordValid) {
      Alert.alert("Weak Password", "Must be at least 6 characters long and include a letter and a number.");
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const newUser = { ...form, emoji: '👤' };
      const success = await userService.registerUser(newUser);

      if (success) {
        await login(newUser);
        navigation.replace("Home"); // Redirige al home tras registro
      } else {
        Alert.alert("Error", "This email is already registered");
      }
    } catch (e) {
      Alert.alert("Error", "Registration failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join Amazing App today</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Your Name</Text>
          <TextInput 
            style={styles.input} 
            value={form.name} 
            onChangeText={(val) => handleChange("name", val)} 
            placeholder="First and last name"
          />

          <Text style={styles.label}>Email</Text>
          <TextInput 
            style={styles.input} 
            value={form.email} 
            onChangeText={(val) => handleChange("email", val)} 
            autoCapitalize="none" 
            keyboardType="email-address" 
            placeholder="example@email.com"
          />

          <Text style={styles.label}>Password</Text>
          <TextInput 
            style={styles.input} 
            value={form.password} 
            onChangeText={(val) => handleChange("password", val)} 
            secureTextEntry 
            placeholder="At least 6 characters"
          />

          <TouchableOpacity 
            style={[styles.registerBtn, loading && styles.disabledBtn]} 
            onPress={handleRegister} 
            disabled={loading}
          >
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.registerBtnText}>Continue</Text>}
          </TouchableOpacity>

          <Text style={styles.disclaimer}>
            By creating an account, you agree to Amazing App's Conditions of Use and Privacy Notice.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f2f4f1' 
  },
  scrollContent: { 
    paddingHorizontal: 30, 
    paddingTop: 50,
    paddingBottom: 40 
  },
  title: { 
    fontSize: 28, 
    fontWeight: '800', 
    marginBottom: 5, 
    color: '#1A1A1A',
    letterSpacing: -0.5 
  },
  subtitle: { 
    fontSize: 15,
    color: '#555',
    marginBottom: 35
  },
  form: { 
    width: '100%' 
  },
  label: { 
    fontWeight: '600', 
    marginBottom: 8, 
    fontSize: 13, 
    color: '#333',
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  input: { 
    backgroundColor: '#fff', 
    borderWidth: 1, 
    borderColor: '#ddd', 
    padding: 14, 
    borderRadius: 12, 
    marginBottom: 20, 
    fontSize: 15,
    color: '#000'
  },
  registerBtn: { 
    backgroundColor: '#0a0a09', 
    padding: 16, 
    borderRadius: 12, 
    alignItems: 'center', 
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3
  },
  disabledBtn: {
    opacity: 0.7
  },
  registerBtnText: { 
    fontSize: 16, 
    color: '#fff', 
    fontWeight: '700' 
  },
  disclaimer: { 
    marginTop: 25, 
    fontSize: 12, 
    color: '#777', 
    lineHeight: 18,
    textAlign: 'center' 
  }
});
