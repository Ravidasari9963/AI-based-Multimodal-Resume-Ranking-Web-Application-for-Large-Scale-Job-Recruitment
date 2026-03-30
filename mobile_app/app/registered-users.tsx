import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Alert, ActivityIndicator, Platform, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
// react-native-reanimated removed for Expo Go compatibility

const { width } = Dimensions.get('window');
const API_BASE_URL = Platform.OS === 'web' ? 'http://localhost:8000' : 'http://192.168.137.64:8000';

export default function RegisteredUsersScreen() {
  const router = useRouter();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/users/`);
      const data = await response.json();
      if (response.ok) {
        setUsers(data.users);
      } else {
        Alert.alert('Error', 'Failed to fetch users.');
      }
    } catch (error) {
      Alert.alert('Error', 'Could not connect to server.');
    } finally {
      setLoading(false);
    }
  };

  const handleManageUser = async (id: number, action: 'activate' | 'delete') => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/users/manage/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action }),
      });

      if (response.ok) {
        Alert.alert('Success', `User ${action}d successfully!`);
        fetchUsers();
      } else {
        Alert.alert('Error', 'Failed to perform action.');
      }
    } catch (error) {
      Alert.alert('Error', 'Could not connect to server.');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <LinearGradient colors={['#450a0a', '#1e293b', '#000000']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Text style={styles.backBtnText}>← Exit</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Manage Users</Text>
        </View>

        {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#ef4444" />
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            {users.map((user, index) => (
              <View 
                key={user.id}
                style={styles.userCard}
              >
                <View style={styles.cardInfo}>
                  <View style={styles.nameRow}>
                    <Text style={styles.userName}>{user.name}</Text>
                    <View style={[styles.statusBadge, user.status === 'activated' ? styles.activeBadge : styles.pendingBadge]}>
                      <Text style={[styles.statusText, user.status === 'activated' ? styles.activeText : styles.pendingText]}>
                        {user.status.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.userDetails}>ID: {user.loginid}</Text>
                  <Text style={styles.userDetails}>{user.email}</Text>
                </View>
                
                <View style={styles.actions}>
                  {user.status !== 'activated' && (
                    <TouchableOpacity 
                      style={[styles.btn, styles.activateBtn]} 
                      onPress={() => handleManageUser(user.id, 'activate')}
                    >
                      <Text style={styles.btnText}>Activate</Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity 
                    style={[styles.btn, styles.deleteBtn]} 
                    onPress={() => handleManageUser(user.id, 'delete')}
                  >
                    <Text style={styles.btnText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
            {users.length === 0 && (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyIcon}>👥</Text>
                <Text style={styles.emptyText}>No registered users found.</Text>
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
  header: { flexDirection: 'row', alignItems: 'center', padding: 25, paddingTop: 40 },
  backBtn: { marginRight: 20, backgroundColor: 'rgba(255,255,255,0.1)', padding: 10, borderRadius: 12 },
  backBtnText: { color: '#ef4444', fontSize: 14, fontWeight: 'bold' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  loaderContainer: { flex: 1, justifyContent: 'center' },
  scrollContent: { padding: 25 },
  userCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  cardInfo: { marginBottom: 20 },
  nameRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  userName: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  activeBadge: { backgroundColor: 'rgba(34, 197, 94, 0.2)' },
  pendingBadge: { backgroundColor: 'rgba(234, 179, 8, 0.2)' },
  statusText: { fontSize: 10, fontWeight: '800' },
  activeText: { color: '#4ade80' },
  pendingText: { color: '#facc15' },
  userDetails: { fontSize: 14, color: '#94a3b8', marginBottom: 2 },
  actions: { flexDirection: 'row', gap: 12 },
  btn: { flex: 1, paddingVertical: 12, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  activateBtn: { backgroundColor: '#10b981' },
  deleteBtn: { backgroundColor: 'rgba(239, 68, 68, 0.2)', borderWidth: 1, borderColor: '#ef4444' },
  btnText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  emptyContainer: { alignItems: 'center', marginTop: 100 },
  emptyIcon: { fontSize: 64, marginBottom: 20 },
  emptyText: { color: '#94a3b8', fontSize: 18 },
});
