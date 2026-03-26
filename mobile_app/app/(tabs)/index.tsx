import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0f172a', '#1e293b', '#334155']}
        style={styles.gradient}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.content}>
            <View style={styles.header}>
              <View style={styles.logoContainer}>
                <Image
                  source={require('@/assets/images/react-logo.png')}
                  style={styles.logo}
                  contentFit="contain"
                />
              </View>
              <Text style={styles.title}>AI-based Multimodal Resume Ranking Web
                Application for Large Scale Job Recruitment</Text>
              <Text style={styles.subtitle}>Elevate your career with the perfect match.</Text>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.cardButton}
                onPress={() => router.push('/user-login')}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#38bdf8', '#0ea5e9']}
                  style={styles.cardGradient}
                >
                  <Text style={styles.iconText}>👤</Text>
                  <Text style={styles.cardTitle}>User Portal</Text>
                  <Text style={styles.cardDesc}>Upload resumes &amp; track applications</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.cardButton, styles.adminMargin]}
                onPress={() => router.push('/admin-login')}
                activeOpacity={0.8}
              >
                <View style={styles.adminCard}>
                  <Text style={styles.iconText}>🔑</Text>
                  <Text style={[styles.cardTitle, { color: '#1e293b' }]}>Admin Portal</Text>
                  <Text style={[styles.cardDesc, { color: '#64748b' }]}>Manage candidates &amp; system</Text>
                </View>
              </TouchableOpacity>

              <View style={styles.footer}>
                <Text style={styles.footerText}>New to the platform? </Text>
                <TouchableOpacity onPress={() => router.push('/register')}>
                  <Text style={styles.footerLink}>Create Account</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logoContainer: {
    width: 120,
    height: 120,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  logo: {
    width: 70,
    height: 70,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 18,
    color: '#94a3b8',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 24,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 400,
  },
  cardButton: {
    borderRadius: 20,
    overflow: 'hidden',
    ...Platform.select({
      web: { boxShadow: '0px 10px 15px -3px rgba(0, 0, 0, 0.2)' },
      default: { elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 10 },
    }),
  },
  cardGradient: {
    padding: 24,
    alignItems: 'center',
  },
  adminCard: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  adminMargin: {
    marginTop: 20,
  },
  iconText: {
    fontSize: 32,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
  },
  footerText: {
    color: '#94a3b8',
    fontSize: 15,
  },
  footerLink: {
    color: '#38bdf8',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
