import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const mockQuestions = [
  { 
    id: 'q1', 
    question: '¿Cuál es el lenguaje principal para desarrollo en React Native?', 
    options: ['Java', 'Swift', 'JavaScript', 'C#'], 
    correctAnswer: 'JavaScript' 
  },
  { 
    id: 'q2', 
    question: '¿Qué componente se utiliza para renderizar listas eficientes en React Native?', 
    options: ['ScrollView', 'FlatList', 'ListView', 'ArrayView'], 
    correctAnswer: 'FlatList' 
  },
  { 
    id: 'q3', 
    question: '¿Cuál hook de React se usa para manejar efectos secundarios?', 
    options: ['useState', 'useContext', 'useReducer', 'useEffect'], 
    correctAnswer: 'useEffect' 
  },
];

const QuizScreen = ({ route, navigation }) => {
  const { title } = route.params || { title: 'Quiz' };
  
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (timeLeft <= 0) {
      finishQuiz();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeLeft]);

  const finishQuiz = (finalScore = score) => {
    navigation.replace('QuizResults', { 
      score: finalScore, 
      totalQuestions: mockQuestions.length,
      id: route.params?.id,
      title: title
    });
  };

  const handleNext = () => {
    let newScore = score;
    if (selectedOption === mockQuestions[currentIdx].correctAnswer) {
      newScore = score + 1;
      setScore(newScore);
    }

    if (currentIdx < mockQuestions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOption(null);
    } else {
      finishQuiz(newScore);
    }
  };

  const currentQ = mockQuestions[currentIdx];
  const isLastQuestion = currentIdx === mockQuestions.length - 1;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle} numberOfLines={1}>{title}</Text>
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>⏳ {timeLeft}s</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.progressText}>Pregunta {currentIdx + 1} de {mockQuestions.length}</Text>
        
        <View style={styles.card}>
          <Text style={styles.questionText}>{currentQ.question}</Text>
        </View>

        <View style={styles.optionsContainer}>
          {currentQ.options.map((opt, idx) => {
            const isSelected = selectedOption === opt;
            return (
              <TouchableOpacity 
                key={idx}
                style={[styles.optionButton, isSelected && styles.optionSelected]}
                onPress={() => setSelectedOption(opt)}
              >
                <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>{opt}</Text>
              </TouchableOpacity>
            )
          })}
        </View>

        <TouchableOpacity 
          style={[styles.nextButton, !selectedOption && styles.nextButtonDisabled]}
          disabled={!selectedOption}
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>
            {isLastQuestion ? 'Finalizar' : 'Siguiente'}
          </Text>
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
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
  },
  timerContainer: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  timerText: {
    color: '#DC2626',
    fontWeight: '700',
    fontSize: 14,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  progressText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  questionText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
    lineHeight: 28,
  },
  optionsContainer: {
    flex: 1,
  },
  optionButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  optionSelected: {
    backgroundColor: '#EFF6FF',
    borderColor: '#3B82F6',
    borderWidth: 2,
  },
  optionText: {
    fontSize: 16,
    color: '#334155',
    fontWeight: '500',
  },
  optionTextSelected: {
    color: '#1D4ED8',
    fontWeight: '700',
  },
  nextButton: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 12,
  },
  nextButtonDisabled: {
    backgroundColor: '#94A3B8',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default QuizScreen;
