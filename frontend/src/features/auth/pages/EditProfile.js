import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  ScrollView, 
  SafeAreaView 
} from 'react-native';
import { useAuth } from '../../../context/AuthContext';

export const EditProfile = ({ navigation }) => {
  const { user, updateUser, deleteAccount } = useAuth();
  
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [emoji, setEmoji] = useState(user?.emoji || '👤');
  const [password, setPassword] = useState(user?.password || '');

  const handleUpdate = async () => {
    if (!name || !email || !password) {
      return Alert.alert("Error", "All fields are required");
    }
    try {
      await updateUser({ ...user, name, email, emoji, password });
      Alert.alert("Success", "Information updated");
      navigation.goBack();
    } catch (e) {
      Alert.alert("Error", "The information could not be updated");
    }
  };

  const confirmDelete = () => {
    Alert.alert(
      "Delete account",
      "Are you sure you want to delete your accounut? Your shopping cart and orders will be deleted",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete permanently", 
          style: "destructive", 
          onPress: async () => {
            await deleteAccount();
          } 
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.form}>
          <Text style={styles.label}>Avatar (Emoji)</Text>
          <TextInput 
            style={styles.input} 
            value={emoji} 
            onChangeText={setEmoji} 
            placeholder="Ej: 🦁" 
          />

          <Text style={styles.label}>Full name</Text>
          <TextInput 
            style={styles.input} 
            value={name} 
            onChangeText={setName} 
          />

          <Text style={styles.label}>E mail</Text>
          <TextInput 
            style={styles.input} 
            value={email} 
            onChangeText={setEmail} 
            keyboardType="email-address" 
            autoCapitalize="none" 
          />

          <Text style={styles.label}>Password</Text>
          <TextInput 
            style={styles.input} 
            value={password} 
            onChangeText={setPassword} 
            secureTextEntry 
          />

          <TouchableOpacity style={styles.saveBtn} onPress={handleUpdate}>
            <Text style={styles.saveText}>Save changes</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.deleteBtn} onPress={confirmDelete}>
            <Text style={styles.deleteText}>Delete my account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F8F9FA' 
  },
  scroll: { 
    padding: 25 
  },
  form: { 
    marginTop: 20,
    backgroundColor: '#FFF', 
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3
  },
  label: { 
    fontWeight: '700', 
    color: '#2D3436', 
    marginBottom: 8, 
    fontSize: 13,
    textTransform: 'uppercase', 
    letterSpacing: 0.5
  },
  input: { 
    backgroundColor: '#F1F3F5', 
    padding: 14, 
    borderRadius: 10, 
    marginBottom: 25, 
    borderWidth: 1, 
    borderColor: '#E9ECEF',
    fontSize: 16,
    color: '#212529'
  },
  saveBtn: { 
    backgroundColor: '#2D3436', 
    padding: 18, 
    borderRadius: 12, 
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4
  },
  saveText: { 
    fontWeight: '700', 
    color: '#FFF',
    fontSize: 16
  },
  divider: { 
    height: 1, 
    backgroundColor: '#E9ECEF', 
    marginVertical: 40,
    width: '80%',
    alignSelf: 'center'
  },
  deleteBtn: { 
    padding: 16, 
    borderRadius: 12, 
    alignItems: 'center',
    backgroundColor: '#FFF5F5', 
    borderWidth: 1, 
    borderColor: '#FFE3E3'
  },
  deleteText: { 
    color: '#FF4757', 
    fontWeight: '700',
    fontSize: 15
  }
});