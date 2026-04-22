import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { useAuth } from '../../../context/AuthContext';
import { IconSelector } from '../components/IconSelector';

export const EditProfile = ({ navigation }) => {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({ ...user });

  const handleSave = async () => {
    if (!form.name || !form.email) {
      Alert.alert("Error", "El nombre y el email son obligatorios");
      return;
    }
    
    await updateUser(form);
    Alert.alert("Éxito", "Información actualizada", [
      { text: "OK", onPress: () => navigation.goBack() }
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <IconSelector 
        selectedIcon={form.icon} 
        onSelect={(icon) => setForm({ ...form, icon })} 
      />

      <Text style={styles.label}>Nombre completo</Text>
      <TextInput
        style={styles.input}
        value={form.name}
        onChangeText={(val) => setForm({ ...form, name: val })}
      />

      <Text style={styles.label}>Nueva Contraseña (opcional)</Text>
      <TextInput
        style={styles.input}
        value={form.password}
        secureTextEntry
        onChangeText={(val) => setForm({ ...form, password: val })}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>Guardar Cambios</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 30, backgroundColor: '#FFF', flexGrow: 1 },
  label: { fontSize: 14, color: '#7F8C8D', marginBottom: 5, marginTop: 15 },
  input: { backgroundColor: '#F4F7F6', padding: 15, borderRadius: 12, fontSize: 16 },
  saveButton: { backgroundColor: '#2C3E50', padding: 18, borderRadius: 12, marginTop: 30, alignItems: 'center' },
  saveText: { color: '#FFF', fontWeight: 'bold' }
});