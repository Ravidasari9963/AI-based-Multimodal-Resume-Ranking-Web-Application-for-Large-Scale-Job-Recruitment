import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Platform, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
// react-native-reanimated removed for Expo Go compatibility

const { width } = Dimensions.get('window');

export default function AdminDashboard() {
  const router = useRouter();
  console.log("DEBUG: AdminDashboard rendered");

  const menuItems = [
    { title: 'View Registered Users', icon: '👥', route: '/registered-users', color: ['#ef4444', '#b91c1c'] },
    { title: 'Manage Resumes', icon: '📄', route: '/upload-resume', color: ['#475569', '#1e293b'] }, 
    { title: 'Job Applications', icon: '💼', route: '/placeholder?title=Job%20Applications', color: ['#6366f1', '#4f46e5'] },
    { title: 'System Settings', icon: '⚙️', route: '/placeholder?title=System%20Settings', color: ['#f59e0b', '#d97706'] },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#450a0a', '#1e293b']} style={styles.topSection}>
        <SafeAreaView>
          <View style={styles.header}>
            <View>
              <Text style={styles.welcomeText}>Secure Access,</Text>
              <Text style={styles.userName}>Administrator</Text>
            </View>
            <TouchableOpacity style={styles.logoutBtn} onPress={() => router.push('/')}>
              <Text style={styles.logoutText}>Exit</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>124</Text>
              <Text style={styles.statLabel}>Total Users</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>45</Text>
              <Text style={styles.statLabel}>Resumes</Text>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>Management Console</Text>
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
  container: { flex: 1, backgroundColor: '#0f172a' },
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
  logoutText: { color: '#ef4444', fontWeight: 'bold' },
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
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#94a3b8', marginBottom: 20 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  gridItemContainer: { width: '48%', marginBottom: 15 },
  gridItem: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    padding: 20,
    borderRadius: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  iconContainer: { width: 50, height: 50, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  icon: { fontSize: 24 },
  itemTitle: { fontSize: 14, fontWeight: '600', color: '#f8fafc', textAlign: 'center' },
});
