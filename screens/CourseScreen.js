import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Linking, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const mockMaterials = [
  { id: '101', type: 'pdf', title: 'Syllabus y Reglas', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
  { id: '102', type: 'video', title: 'Grabación: Clase 1', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }
];

const CourseScreen = ({ route, navigation }) => {
  const { id, title } = route.params || { id: '0', title: 'Curso' };

  const handleOpenMaterial = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'No se puede abrir este enlace en tu dispositivo.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Ocurrió un error al intentar abrir el material.');
    }
  };

  const renderMaterial = ({ item }) => {
    const isPdf = item.type === 'pdf';
    
    return (
      <TouchableOpacity 
        style={styles.card}
        onPress={() => handleOpenMaterial(item.url)}
      >
        <View style={[styles.iconContainer, isPdf ? styles.iconPdf : styles.iconVideo]}>
          <Text style={isPdf ? styles.iconTextPdf : styles.iconTextVideo}>
            {isPdf ? 'PDF' : '▶'}
          </Text>
        </View>
        <View style={styles.materialInfo}>
          <Text style={styles.materialTitle}>{item.title}</Text>
          <Text style={styles.materialType}>{isPdf ? 'Documento PDF' : 'Video externo'}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderFooter = () => (
    <View style={styles.footerContainer}>
      <TouchableOpacity 
        style={styles.leaderboardButton}
        onPress={() => navigation.navigate('Leaderboard', { id, title })}
      >
        <Text style={styles.buttonIcon}>🏆</Text>
        <Text style={styles.leaderboardButtonText}>Ver Podio de la Clase</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.quizButton}
        onPress={() => navigation.navigate('Quiz', { id, title })}
      >
        <Text style={styles.buttonIcon}>📝</Text>
        <Text style={styles.quizButtonText}>Autoevaluación (Quiz)</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.flashcardButton}
        onPress={() => navigation.navigate('Flashcards', { id, title })}
      >
        <Text style={styles.buttonIcon}>🗂️</Text>
        <Text style={styles.flashcardButtonText}>Tarjetas de Estudio (Flashcards)</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Volver</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{title}</Text>
        <View style={{ width: 60 }} />
      </View>
      
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Material de Estudio</Text>
        <FlatList
          data={mockMaterials}
          keyExtractor={item => item.id}
          renderItem={renderMaterial}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={renderFooter}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backButton: {
    width: 60,
  },
  backButtonText: {
    fontSize: 16,
    color: '#2563EB',
    fontWeight: '600',
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#334155',
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 16,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  iconPdf: {
    backgroundColor: '#FEE2E2',
  },
  iconVideo: {
    backgroundColor: '#DBEAFE',
  },
  iconTextPdf: {
    color: '#DC2626',
    fontWeight: 'bold',
    fontSize: 14,
  },
  iconTextVideo: {
    color: '#2563EB',
    fontWeight: 'bold',
    fontSize: 16,
  },
  materialInfo: {
    flex: 1,
  },
  materialTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  materialType: {
    fontSize: 13,
    color: '#64748B',
  },
  footerContainer: {
    marginTop: 16,
    gap: 16,
  },
  buttonIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  leaderboardButton: {
    flexDirection: 'row',
    backgroundColor: '#FEF3C7',
    borderColor: '#F59E0B',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  leaderboardButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#B45309',
  },
  quizButton: {
    flexDirection: 'row',
    backgroundColor: '#2563EB',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  quizButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  flashcardButton: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9', // Slate-100
    borderColor: '#CBD5E1', // Slate-300
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  flashcardButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#334155', // Slate-700
  },
});

export default CourseScreen;
