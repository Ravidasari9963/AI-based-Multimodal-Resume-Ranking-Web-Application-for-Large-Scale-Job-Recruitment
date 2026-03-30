import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, Platform, Dimensions, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as DocumentPicker from 'expo-document-picker';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
// react-native-reanimated removed for Expo Go compatibility

const { width } = Dimensions.get('window');
const API_BASE_URL = 'http://192.168.137.64:8000';

export default function ResumeUploadScreen() {
  const router = useRouter();
  const [file, setFile] = useState<DocumentPicker.DocumentPickerResult | null>(null);
  const [uploading, setUploading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [jobDescription, setJobDescription] = useState('');

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        setFile(result);
        setAnalysisResult(null);
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to pick document');
    }
  };

  const handleUpload = async () => {
    if (!jobDescription.trim()) {
      Alert.alert('Error', 'Please enter a job description first');
      return;
    }
    if (!file || file.canceled) {
      Alert.alert('Error', 'Please select a PDF file first');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    const asset = file.assets[0];

    try {
      formData.append('job_description', jobDescription);
      if (Platform.OS === 'web') {
        const response = await fetch(asset.uri);
        const blob = await response.blob();
        formData.append('resume', blob, asset.name);
      } else {
        formData.append('resume', {
          uri: asset.uri,
          name: asset.name,
          type: 'application/pdf',
        } as any);
      }

      const response = await fetch(`${API_BASE_URL}/api/resume/upload/`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setAnalysisResult(data);
        Alert.alert('Success', 'Resume uploaded and analyzed!');
      } else {
        Alert.alert('Error', data.error || 'Upload failed');
      }
    } catch (error) {
      Alert.alert('Error', 'Could not connect to server.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <LinearGradient colors={['#0f172a', '#1e293b']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Text style={styles.backBtnText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Resume Analysis</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Analyze Your Potential</Text>
            <Text style={styles.infoSubtitle}>Upload your PDF resume to get ranked against relevant job roles.</Text>
          </View>

          <View style={styles.glassCard}>
            <Text style={styles.fieldLabel}>Job Description</Text>
            <TextInput
              style={styles.jobDescInput}
              placeholder="Paste the job description here..."
              placeholderTextColor="#64748b"
              value={jobDescription}
              onChangeText={setJobDescription}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
            />

            <Text style={styles.fieldLabel}>Resume (PDF)</Text>
            <TouchableOpacity 
              style={[styles.uploadArea, file && !file.canceled && styles.uploadAreaActive]} 
              onPress={pickDocument}
            >
              <Text style={styles.uploadIcon}>{file && !file.canceled ? '📄' : '📁'}</Text>
              <Text style={styles.uploadText}>
                {file && !file.canceled ? file.assets[0].name : 'Tap to Select PDF Resume'}
              </Text>
              <Text style={styles.uploadSubtext}>PDF files only (Max 5MB)</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.btn, (!file || file.canceled || uploading || !jobDescription.trim()) && styles.btnDisabled]} 
              onPress={handleUpload}
              disabled={!file || file.canceled || uploading || !jobDescription.trim()}
            >
              <LinearGradient colors={['#38bdf8', '#0ea5e9']} style={styles.btnGradient}>
                {uploading ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>Analyze Resume</Text>}
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {analysisResult && (
            <View style={styles.resultCard}>
              <Text style={styles.resultTitle}>Analysis Result</Text>
              <View style={styles.scoreRow}>
                <Text style={styles.scoreLabel}>Similarity Score:</Text>
                <Text style={styles.scoreValue}>{analysisResult.similarity_score}%</Text>
              </View>
              <Text style={styles.resultDesc}>
                Based on our AI analysis, your profile has a {analysisResult.similarity_score}% match with the target job requirements.
              </Text>
              <TouchableOpacity style={styles.viewAppsBtn} onPress={() => router.push('/my-applications')}>
                <Text style={styles.viewAppsText}>View My Applications</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 25, paddingTop: 40 },
  backBtn: { marginRight: 20, backgroundColor: 'rgba(255,255,255,0.1)', padding: 10, borderRadius: 12 },
  backBtnText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  scrollContent: { padding: 25, paddingBottom: 60 },
  infoCard: { marginBottom: 30 },
  fieldLabel: { color: '#cbd5e1', fontSize: 14, fontWeight: '600', marginBottom: 10 },
  jobDescInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
    borderRadius: 16,
    padding: 15,
    color: '#fff',
    fontSize: 15,
    minHeight: 130,
    marginBottom: 25,
    lineHeight: 22,
  },
  infoTitle: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 10 },
  infoSubtitle: { fontSize: 16, color: '#94a3b8', lineHeight: 24 },
  glassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 24,
    padding: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 30,
  },
  uploadArea: {
    borderWidth: 2,
    borderColor: 'rgba(56, 189, 248, 0.3)',
    borderStyle: 'dashed',
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    marginBottom: 25,
    backgroundColor: 'rgba(56, 189, 248, 0.05)',
  },
  uploadAreaActive: {
    borderColor: '#38bdf8',
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
  },
  uploadIcon: { fontSize: 48, marginBottom: 15 },
  uploadText: { color: '#fff', fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginBottom: 5 },
  uploadSubtext: { color: '#94a3b8', fontSize: 12 },
  btn: { borderRadius: 15, overflow: 'hidden' },
  btnDisabled: { opacity: 0.5 },
  btnGradient: { paddingVertical: 18, alignItems: 'center' },
  btnText: { color: '#fff', fontSize: 16, fontWeight: 'bold', letterSpacing: 1 },
  resultCard: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderRadius: 24,
    padding: 25,
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.3)',
    marginBottom: 50,
  },
  resultTitle: { fontSize: 20, fontWeight: 'bold', color: '#4ade80', marginBottom: 15 },
  scoreRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  scoreLabel: { color: '#fff', fontSize: 16, marginRight: 10 },
  scoreValue: { color: '#4ade80', fontSize: 24, fontWeight: '800' },
  resultDesc: { color: '#94a3b8', fontSize: 14, lineHeight: 20, marginBottom: 20 },
  viewAppsBtn: { alignItems: 'center', paddingVertical: 10 },
  viewAppsText: { color: '#38bdf8', fontWeight: 'bold', textDecorationLine: 'underline' },
});
