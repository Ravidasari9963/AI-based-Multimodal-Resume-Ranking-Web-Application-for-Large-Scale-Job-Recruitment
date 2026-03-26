import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Platform, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
// react-native-reanimated removed for Expo Go compatibility

const { width } = Dimensions.get('window');

export default function UserDashboard() {
  const router = useRouter();
  console.log("DEBUG: UserDashboard rendered");

  const menuItems = [
    { title: 'My Applications', icon: '📝', route: '/my-applications', color: ['#38bdf8', '#0ea5e9'] },
    { title: 'Upload Resume', icon: '📤', route: '/upload-resume', color: ['#818cf8', '#6366f1'] },
    { title: 'Search Jobs', icon: '🔍', route: '/placeholder?title=Search%20Jobs', color: ['#34d399', '#10b981'] },
    { title: 'My Profile', icon: '👤', route: '/placeholder?title=My%20Profile', color: ['#fbbf24', '#f59e0b'] },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0f172a', '#1e293b']} style={styles.topSection}>
        <SafeAreaView>
          <View style={styles.header}>
            <View>
              <Text style={styles.welcomeText}>Welcome Back,</Text>
              <Text style={styles.userName}>Candidate</Text>
            </View>
            <TouchableOpacity style={styles.logoutBtn} onPress={() => router.push('/')}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Applied</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>5</Text>
              <Text style={styles.statLabel}>Interviews</Text>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>Dashboard Menu</Text>
        <View style={styles.grid}>
          {menuItems.map((item, index) => (
            <View 
              key={index}
              style={styles.gridItemContainer}
            >
              <TouchableOpacity 
                style={styles.gridItem}
                onPress={() => item.route && router.push(item.route as any)}
                activeOpacity={0.7}
              >
                <LinearGradient colors={item.color as any} style={styles.iconContainer}>
                  <Text style={styles.icon}>{item.icon}</Text>
                </LinearGradient>
                <Text style={styles.itemTitle}>{item.title}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  topSection: { paddingBottom: 30, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingTop: 20,
    marginBottom: 25,
  },
  welcomeText: { color: '#94a3b8', fontSize: 16 },
  userName: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  logoutBtn: { backgroundColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 12 },
  logoutText: { color: '#fff', fontWeight: '600' },
  statsRow: { flexDirection: 'row', paddingHorizontal: 25, gap: 15 },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  statNumber: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  statLabel: { color: '#94a3b8', fontSize: 12, marginTop: 4 },
  scrollContent: { padding: 25 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1e293b', marginBottom: 20 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  gridItemContainer: { width: '48%', marginBottom: 15 },
  gridItem: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 24,
    alignItems: 'center',
    ...Platform.select({
      web: { boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' },
      default: { elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
    }),
  },
  iconContainer: { width: 50, height: 50, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  icon: { fontSize: 24 },
  itemTitle: { fontSize: 14, fontWeight: '600', color: '#334155', textAlign: 'center' },
});
