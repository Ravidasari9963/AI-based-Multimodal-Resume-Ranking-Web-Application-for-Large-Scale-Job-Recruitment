import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Alert, ActivityIndicator, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
// react-native-reanimated removed for Expo Go compatibility

const API_BASE_URL = 'http://192.168.137.64:8000';

export default function MyApplicationsScreen() {
  const router = useRouter();
  const [apps, setApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/user/applications/`);
        const data = await response.json();
        if (response.ok) {
          setApps(data.applications);
        }
      } catch (error) {
        console.error('Fetch Apps Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchApps();
  }, []);

  return (
    <LinearGradient colors={['#0f172a', '#1e293b']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Text style={styles.backBtnText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>My Applications</Text>
        </View>

        {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#38bdf8" />
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            {apps.map((app, index) => (
              <View 
                key={index}
                style={styles.appCard}
              >
                <View style={styles.cardHeader}>
                  <Text style={styles.appName}>{app.name}</Text>
                  <View style={styles.scoreBadge}>
                    <Text style={styles.scoreText}>{app.similarity_score}% Match</Text>
                  </View>
                </View>
                <Text style={styles.appDate}>Applied on {new Date(app.created_at).toLocaleDateString()}</Text>
                <View style={styles.statusRow}>
                  <View style={styles.dot} />
                  <Text style={styles.statusText}>Under Review</Text>
                </View>
              </View>
            ))}
            {apps.length === 0 && (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyIcon}>📂</Text>
                <Text style={styles.emptyText}>No applications yet.</Text>
                <TouchableOpacity style={styles.applyBtn} onPress={() => router.push('/upload-resume')}>
                    <Text style={styles.applyBtnText}>Apply Now</Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 25,
    paddingTop: 40,
  },
  backBtn: { marginRight: 20, backgroundColor: 'rgba(255,255,255,0.1)', padding: 10, borderRadius: 12 },
  backBtnText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  loaderContainer: { flex: 1, justifyContent: 'center' },
  scrollContent: { padding: 25 },
  appCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 },
  appName: { fontSize: 18, fontWeight: 'bold', color: '#fff', flex: 1, marginRight: 10 },
  scoreBadge: { backgroundColor: 'rgba(56, 189, 248, 0.2)', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 12 },
  scoreText: { color: '#38bdf8', fontWeight: 'bold', fontSize: 12 },
  appDate: { fontSize: 14, color: '#94a3b8', marginBottom: 15 },
  statusRow: { flexDirection: 'row', alignItems: 'center' },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#fbbf24', marginRight: 8 },
  statusText: { color: '#fbbf24', fontSize: 13, fontWeight: '600' },
  emptyContainer: { alignItems: 'center', marginTop: 100 },
  emptyIcon: { fontSize: 64, marginBottom: 20 },
  emptyText: { color: '#94a3b8', fontSize: 18, marginBottom: 30 },
  applyBtn: { backgroundColor: '#38bdf8', paddingHorizontal: 30, paddingVertical: 15, borderRadius: 15 },
  applyBtnText: { color: '#fff', fontWeight: 'bold' },
});
