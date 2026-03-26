import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
// react-native-reanimated removed for Expo Go compatibility

export default function PlaceholderScreen() {
  const router = useRouter();
  const { title } = useLocalSearchParams();

  return (
    <LinearGradient colors={['#0f172a', '#1e293b']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>🚧</Text>
          </View>

          <View style={styles.glassCard}>
            <Text style={styles.title}>{title || 'Feature'}</Text>
            <Text style={styles.subtitle}>
              We're working hard to bring you this feature. Stay tuned for updates!
            </Text>

            <TouchableOpacity 
              style={styles.buttonMain} 
              onPress={() => router.back()}
            >
              <LinearGradient colors={['#38bdf8', '#0ea5e9']} style={styles.btnGradient}>
                <Text style={styles.buttonText}>Go Back</Text>
              </LinearGradient>
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
  iconContainer: {
    width: 100,
    height: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  icon: { fontSize: 50 },
  glassCard: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 24,
    padding: 40,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  title: { fontSize: 28, fontWeight: '800', color: '#fff', marginBottom: 15, textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#94a3b8', textAlign: 'center', lineHeight: 24, marginBottom: 30 },
  buttonMain: { width: '100%', borderRadius: 12, overflow: 'hidden' },
  btnGradient: { paddingVertical: 16, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
