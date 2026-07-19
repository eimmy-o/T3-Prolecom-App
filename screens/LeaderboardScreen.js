import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const mockLeaderboard = [
  { id: '1', name: 'Carlos Mendoza', points: 1250 },
  { id: '2', name: 'Ana Torres', points: 1100 },
  { id: '3', name: 'Luis Felipe', points: 950 },
  { id: '4', name: 'Tú', points: 820 },
  { id: '5', name: 'Sofía Castro', points: 700 }
];

const LeaderboardScreen = ({ route, navigation }) => {
  const { title } = route.params || { title: 'Curso' };

  const getMedalColor = (index) => {
    switch (index) {
      case 0: return { bg: '#FEF08A', border: '#EAB308', text: '#854D0E', medal: '🥇' }; // Gold
      case 1: return { bg: '#E2E8F0', border: '#94A3B8', text: '#334155', medal: '🥈' }; // Silver
      case 2: return { bg: '#FED7AA', border: '#F97316', text: '#9A3412', medal: '🥉' }; // Bronze
      default: return null;
    }
  };

  const renderItem = ({ item, index }) => {
    const medalConfig = getMedalColor(index);
    const isPodium = index < 3;
    const isMe = item.name === 'Tú';

    return (
      <View 
        style={[
          styles.card,
          isPodium && { 
            backgroundColor: medalConfig.bg,
            borderColor: medalConfig.border,
            borderWidth: 1,
            transform: [{ scale: index === 0 ? 1.02 : 1 }]
          },
          isMe && !isPodium && styles.myCard
        ]}
      >
        <View style={styles.rankContainer}>
          <Text style={[styles.rankNumber, isPodium && { color: medalConfig.text }]}>
            {isPodium ? medalConfig.medal : `#${index + 1}`}
          </Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={[
            styles.studentName,
            isPodium && { color: medalConfig.text, fontWeight: '800' },
            isMe && { color: '#2563EB', fontWeight: '800' }
          ]}>
            {item.name}
          </Text>
        </View>
        <View style={styles.pointsContainer}>
          <Text style={[styles.pointsText, isPodium && { color: medalConfig.text }]}>
            {item.points} XP
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Volver</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>Podio</Text>
        <View style={{ width: 60 }} />
      </View>
      
      <View style={styles.content}>
        <View style={styles.courseContext}>
          <Text style={styles.courseTitle}>{title}</Text>
          <Text style={styles.subtitle}>Ranking de Estudiantes</Text>
        </View>

        <FlatList
          data={mockLeaderboard}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
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
  courseContext: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  courseTitle: {
    fontSize: 16,
    color: '#64748B',
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1E293B',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
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
  myCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#2563EB',
    backgroundColor: '#EFF6FF',
  },
  rankContainer: {
    width: 40,
    alignItems: 'center',
  },
  rankNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#64748B',
  },
  nameContainer: {
    flex: 1,
    paddingHorizontal: 12,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#334155',
  },
  pointsContainer: {
    alignItems: 'flex-end',
  },
  pointsText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
  },
});

export default LeaderboardScreen;
