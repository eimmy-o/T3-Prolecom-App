import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const mockFlashcards = [
  { id: '1', front: '¿Qué es el modelo OSI?', back: 'Marco conceptual de 7 capas para redes.' },
  { id: '2', front: 'Dirección IP', back: 'Identificador numérico único asignado a cada dispositivo en una red.' },
  { id: '3', front: 'Brecha Digital', back: 'Desigualdad en el acceso, uso o impacto de las TIC entre grupos sociales.' }
];

const FlashcardsScreen = ({ route, navigation }) => {
  const { id, title } = route.params || { id: '0', title: 'Curso' };
  
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const currentCard = mockFlashcards[currentIdx];

  const flipCard = () => {
    if (isFlipped) {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setIsFlipped(false));
    } else {
      Animated.timing(animatedValue, {
        toValue: 180,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setIsFlipped(true));
    }
  };

  const nextCard = () => {
    if (currentIdx < mockFlashcards.length - 1) {
      if (isFlipped) {
        animatedValue.setValue(0);
        setIsFlipped(false);
      }
      setCurrentIdx(currentIdx + 1);
    }
  };

  const prevCard = () => {
    if (currentIdx > 0) {
      if (isFlipped) {
        animatedValue.setValue(0);
        setIsFlipped(false);
      }
      setCurrentIdx(currentIdx - 1);
    }
  };

  const frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg']
  });

  const backInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg']
  });

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }]
  };

  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }]
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Course', { id, title })} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Volver</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{title}</Text>
        <View style={{ width: 60 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.progressText}>Tarjeta {currentIdx + 1} de {mockFlashcards.length}</Text>
        <Text style={styles.instructionText}>Toca la tarjeta para voltearla</Text>

        <View style={styles.cardContainer}>
          <Pressable onPress={flipCard} style={styles.pressableArea}>
            <Animated.View style={[styles.card, styles.cardFront, frontAnimatedStyle]}>
              <Text style={styles.cardLabel}>PREGUNTA</Text>
              <Text style={styles.cardContent}>{currentCard.front}</Text>
            </Animated.View>
            <Animated.View style={[styles.card, styles.cardBack, backAnimatedStyle]}>
              <Text style={styles.cardLabel}>RESPUESTA</Text>
              <Text style={styles.cardContent}>{currentCard.back}</Text>
            </Animated.View>
          </Pressable>
        </View>

        <View style={styles.controlsContainer}>
          <TouchableOpacity 
            style={[styles.controlButton, currentIdx === 0 && styles.controlButtonDisabled]} 
            onPress={prevCard}
            disabled={currentIdx === 0}
          >
            <Text style={[styles.controlButtonText, currentIdx === 0 && styles.controlButtonTextDisabled]}>Anterior</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.controlButton, currentIdx === mockFlashcards.length - 1 && styles.controlButtonDisabled]} 
            onPress={nextCard}
            disabled={currentIdx === mockFlashcards.length - 1}
          >
            <Text style={[styles.controlButtonText, currentIdx === mockFlashcards.length - 1 && styles.controlButtonTextDisabled]}>Siguiente</Text>
          </TouchableOpacity>
        </View>
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
    padding: 24,
    alignItems: 'center',
  },
  progressText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  instructionText: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 32,
  },
  cardContainer: {
    width: '100%',
    height: 350,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressableArea: {
    width: '100%',
    height: '100%',
  },
  card: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 5,
    position: 'absolute',
    backfaceVisibility: 'hidden',
  },
  cardFront: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E2E8F0',
  },
  cardBack: {
    backgroundColor: '#EFF6FF',
    borderWidth: 2,
    borderColor: '#BFDBFE',
  },
  cardLabel: {
    position: 'absolute',
    top: 24,
    fontSize: 14,
    fontWeight: '700',
    color: '#94A3B8',
    letterSpacing: 2,
  },
  cardContent: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1E293B',
    textAlign: 'center',
    lineHeight: 34,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 40,
  },
  controlButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    width: '45%',
    alignItems: 'center',
  },
  controlButtonDisabled: {
    backgroundColor: '#E2E8F0',
  },
  controlButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  controlButtonTextDisabled: {
    color: '#94A3B8',
  },
});

export default FlashcardsScreen;
