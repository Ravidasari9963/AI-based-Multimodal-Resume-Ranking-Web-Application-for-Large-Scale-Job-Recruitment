import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Platform, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
// react-native-reanimated removed for Expo Go compatibility

const API_BASE_URL = 'https://ai-based-multimodal-resume-ranking-web.onrender.com';

export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [loginid, setLoginid] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [stateName, setStateName] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    console.log("DEBUG: Validating registration form...");
    if (!name || !loginid || !email || !mobile || !password || !stateName) {
      console.log("DEBUG: Validation failed - missing fields");
      Alert.alert("Error", "All fields are required.");
      return false;
    }
    // Relaxed validation for testing
    if (password.length < 4) {
      Alert.alert("Error", "Password must be at least 4 characters.");
      return false;
    }
    console.log("DEBUG: Validation successful");
    return true;
  };

  const handleRegister = async () => {
    if (!validate()) return;
    setLoading(true);
    console.log(`DEBUG: Sending registration request to: ${API_BASE_URL}/api/register/`);
    try {
      const payload = {
        name, loginid, email, mobile, password,
        state: stateName, status: 'activated'
      };
      console.log("DEBUG: Payload:", payload);

      const response = await fetch(`${API_BASE_URL}/api/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      console.log(`DEBUG: Response status: ${response.status}`);
      const data = await response.json();
      console.log("DEBUG: Response data:", data);

      if (response.ok) {
        Alert.alert("Success", "Registration successful! You can now login.");
        router.push('/user-login');
      } else {
        const errorMsg = data ? JSON.stringify(data) : "Registration failed.";
        Alert.alert("Error", errorMsg);
      }
    } catch (error: any) {
      console.error("DEBUG: Fetch error:", error);
      Alert.alert("Error", "Could not connect to server: " + (error.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#0f172a', '#1e293b']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Join Us</Text>
            <Text style={styles.headerSubtitle}>Start your career journey with us today</Text>
          </View>

          <View style={styles.glassCard}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput style={styles.input} placeholder="John Doe" placeholderTextColor="#94a3b8" value={name} onChangeText={setName} />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Login ID</Text>
              <TextInput style={styles.input} placeholder="johndoe" placeholderTextColor="#94a3b8" value={loginid} onChangeText={setLoginid} autoCapitalize="none" />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput style={styles.input} placeholder="john@example.com" placeholderTextColor="#94a3b8" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Mobile Number</Text>
              <TextInput style={styles.input} placeholder="9876543210" placeholderTextColor="#94a3b8" value={mobile} onChangeText={setMobile} keyboardType="phone-pad" />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>State</Text>
              <TextInput style={styles.input} placeholder="California" placeholderTextColor="#94a3b8" value={stateName} onChangeText={setStateName} />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <TextInput style={styles.input} placeholder="••••••••" placeholderTextColor="#94a3b8" value={password} onChangeText={setPassword} secureTextEntry />
            </View>

            <TouchableOpacity style={styles.registerBtn} onPress={handleRegister} disabled={loading}>
              <LinearGradient colors={['#38bdf8', '#0ea5e9']} style={styles.btnGradient}>
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>Create Account</Text>}
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => router.push('/user-login')}>
                <Text style={styles.footerLink}>Sign In</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
              <Text style={styles.backBtnText}>← Back to Home</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  scrollContent: { padding: 25, paddingBottom: 50 },
  header: { alignItems: 'center', marginBottom: 30, marginTop: 20 },
  headerTitle: { fontSize: 32, fontWeight: '800', color: '#fff', marginBottom: 8 },
  headerSubtitle: { fontSize: 16, color: '#94a3b8', textAlign: 'center' },
  glassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 24,
    padding: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  inputGroup: { marginBottom: 18 },
  label: { color: '#f8fafc', fontSize: 13, fontWeight: '600', marginBottom: 8, marginLeft: 4 },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 14,
    borderRadius: 12,
    color: '#fff',
    fontSize: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  registerBtn: { borderRadius: 12, overflow: 'hidden', marginTop: 10, marginBottom: 20 },
  btnGradient: { paddingVertical: 16, alignItems: 'center' },
  btnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 20 },
  footerText: { color: '#94a3b8', fontSize: 14 },
  footerLink: { color: '#38bdf8', fontSize: 14, fontWeight: 'bold' },
  backBtn: { alignItems: 'center' },
  backBtnText: { color: '#94a3b8', fontSize: 14 },
});
