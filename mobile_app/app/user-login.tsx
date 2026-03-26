import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Platform, Alert, ActivityIndicator, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
// Note: Animations disabled for Expo Go compatibility

const { width } = Dimensions.get('window');
const API_BASE_URL = 'http://192.168.137.22:8000';

export default function UserLoginScreen() {
  const router = useRouter();
  const [loginid, setLoginid] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!loginid || !password) {
      Alert.alert("Error", "Please fill in both login ID and password");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ loginid, password }),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert("Success", `Welcome back, ${data.user.name}!`);
        router.push('/user-dashboard'); 
      } else {
        Alert.alert("Error", data.message || "Invalid credentials");
      }
    } catch (error) {
      Alert.alert("Error", "Could not connect to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#0f172a', '#1e293b', '#0f172a']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <Text style={styles.headerTitle}>User Login</Text>
          <Text style={styles.headerSubtitle}>Sign in to continue your journey</Text>
          
          <View style={styles.glassCard}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Login ID</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your ID"
                placeholderTextColor="#94a3b8"
                value={loginid}
                onChangeText={setLoginid}
                autoCapitalize="none"
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor="#94a3b8"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
            
            <TouchableOpacity onPress={() => Alert.alert('Forgot Password', 'Please contact support to reset your password.')}>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.buttonMain, loading && { opacity: 0.7 }]} 
              onPress={handleLogin}
              disabled={loading}
            >
              <LinearGradient colors={['#38bdf8', '#0ea5e9']} style={styles.buttonGradient}>
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign In</Text>}
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <Text style={styles.backButtonText}>← Back to Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  content: { flex: 1, padding: 30, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 36, fontWeight: '800', color: '#fff', marginBottom: 8 },
  headerSubtitle: { fontSize: 16, color: '#94a3b8', marginBottom: 40 },
  glassCard: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 24,
    padding: 30,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    ...Platform.select({
      web: { backdropFilter: 'blur(10px)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' },
      default: { elevation: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 20 },
    }),
  },
  inputContainer: { marginBottom: 20 },
  inputLabel: { color: '#f8fafc', fontSize: 14, fontWeight: '600', marginBottom: 8, marginLeft: 4 },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 16,
    borderRadius: 12,
    color: '#fff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  forgotPassword: { color: '#38bdf8', textAlign: 'right', marginBottom: 25, fontSize: 14, fontWeight: '500' },
  buttonMain: { borderRadius: 12, overflow: 'hidden', marginBottom: 20 },
  buttonGradient: { paddingVertical: 16, alignItems: 'center', justifyContent: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold', letterSpacing: 1 },
  backButton: { alignItems: 'center', paddingVertical: 10 },
  backButtonText: { color: '#94a3b8', fontSize: 14, fontWeight: '500' },
});
