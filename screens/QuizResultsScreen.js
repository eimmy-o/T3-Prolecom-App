import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const QuizResultsScreen = ({ route, navigation }) => {
  const { score, totalQuestions, id, title } = route.params || { score: 0, totalQuestions: 0, id: '0', title: 'Curso' };
  
  const percentage = totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;
  let message = '¡Sigue practicando!';
  let emoji = '📚';
  
  if (percentage === 100) {
    message = '¡Puntuación Perfecta!';
    emoji = '🏆';
  } else if (percentage >= 66) {
    message = '¡Excelente trabajo!';
    emoji = '🎉';
  } else if (percentage >= 33) {
    message = '¡Buen intento!';
    emoji = '👍';
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.celebrationContainer}>
          <Text style={styles.emoji}>{emoji}</Text>
          <Text style={styles.message}>{message}</Text>
        </View>
        
        <View style={styles.card}>
          <Text style={styles.scoreLabel}>Tu Resultado</Text>
          <Text style={styles.scoreText}>
            {score} <Text style={styles.scoreTotal}>/ {totalQuestions}</Text>
          </Text>
          <View style={styles.percentageBadge}>
            <Text style={styles.scorePercentage}>{percentage.toFixed(0)}% correctas</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('Course', { id, title })}
        >
          <Text style={styles.buttonText}>Volver al Curso</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  celebrationContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  emoji: {
    fontSize: 80,
    marginBottom: 16,
  },
  message: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1E293B',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 32,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 5,
    marginBottom: 40,
  },
  scoreLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  scoreText: {
    fontSize: 64,
    fontWeight: '800',
    color: '#2563EB',
  },
  scoreTotal: {
    fontSize: 32,
    color: '#94A3B8',
  },
  percentageBadge: {
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 16,
  },
  scorePercentage: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1D4ED8',
  },
  button: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 32,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#1E293B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
});

export default QuizResultsScreen;
