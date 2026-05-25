import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useAuth } from '../../../context/AuthContext';

export const Profile = ({ navigation }) => {
  const { user, logout } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.emoji}>{user?.emoji || '👤'}</Text>
          <Text style={styles.name}>{user?.name || 'Usuario'}</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>

        <View style={styles.menu}>
          <TouchableOpacity 
            style={styles.amazonBtn} 
            onPress={() => navigation.navigate('EditProfile')}
          >
            <Text style={styles.btnText}>Edit information / Delete account</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.amazonBtn} 
            onPress={() => navigation.navigate('OrderHistory')}
          >
            <Text style={styles.btnText}>My orders</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
            <Text style={styles.logoutText}>Log out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#aabc84',
    marginTop: 30
  },
  scroll: { 
    padding: 20 
  },
  header: { 
    backgroundColor: '#040504', 
    paddingVertical: 40, 
    paddingHorizontal: 20,
    borderRadius: 24,
    alignItems: 'center', 
    marginBottom: 30,
    shadowColor: '#f6efef',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 3 
  },
  emojiContainer: {
    backgroundColor: '#F1F3F5',
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15
  },
  emoji: { 
    fontSize: 50 
  },
  name: { 
    fontSize: 24, 
    fontWeight: '800', 
    color: '#f8f0f0',
    letterSpacing: -0.5
  },
  email: { 
    color: '#f3f6f9', 
    fontSize: 15,
    marginTop: 4,
    fontWeight: '400'
  },
  menu: { 
    gap: 12 
  },
  amazonBtn: { 
    backgroundColor: '#0c0b0b', 
    paddingVertical: 18, 
    paddingHorizontal: 20,
    borderRadius: 16, 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1, 
    borderColor: '#E9ECEF',
    shadowColor: '#fbf8f8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    elevation: 1
  },
  btnText: { 
    color: '#e8ebeb', 
    fontSize: 16, 
    fontWeight: '600' 
  },
  logoutBtn: { 
    marginTop: 40, 
    padding: 20, 
    borderRadius: 16,
    alignItems: 'center',
    backgroundColor: '#030303'
  },
  logoutText: { 
    color: '#f7eff0', 
    fontWeight: '700', 
    fontSize: 16 
  }
});