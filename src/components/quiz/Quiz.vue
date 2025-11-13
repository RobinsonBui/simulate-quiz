<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import questionsData from '../../database/questions.json';
import QuizHeader from './Shared/QuizHeader.vue';
import QuestionCard from './Question/QuestionCard.vue';
import ResultsView from './Results/ResultsView.vue';
import CategorySelector from './CategorySelector.vue';
import { useQuestionStatsStore } from '../../stores/questionStats';

// Store de estadísticas
const statsStore = useQuestionStatsStore();

// Estado del simulador
const quizStarted = ref(false);
const categoryWeights = ref<Record<string, number>>({});
const currentQuestionIndex = ref(0);
const selectedOption = ref<number | undefined>(undefined);
const score = ref(0);
const quizCompleted = ref(false);
const timeLeft = ref(60);
const timer = ref<number | null>(null);
const showResults = ref(false);
const userAnswers = ref<Array<{question: any, selected: number | undefined, isCorrect: boolean}>>([]);

// Función para seleccionar preguntas con énfasis en categorías y dificultad
const selectQuestionsWithEmphasis = (weights: Record<string, number>) => {
  const selectedQuestions: any[] = [];
  const questionsByCategory: Record<string, any[]> = {};
  
  // Agrupar preguntas por categoría
  questionsData.forEach(question => {
    const category = question.bloque;
    if (!questionsByCategory[category]) {
      questionsByCategory[category] = [];
    }
    questionsByCategory[category].push(question);
  });
  
  // Calcular el total de peso
  const totalWeight = Object.values(weights).reduce((sum, weight) => sum + weight, 0);
  
  // Calcular cuántas preguntas de cada categoría (de 40 total)
  const questionsPerCategory: Record<string, number> = {};
  let remainingQuestions = 40;
  
  Object.entries(weights).forEach(([category, weight]) => {
    if (weight > 0) {
      const proportion = weight / totalWeight;
      const count = Math.floor(40 * proportion);
      questionsPerCategory[category] = count;
      remainingQuestions -= count;
    }
  });
  
  // Distribuir las preguntas restantes proporcionalmente
  if (remainingQuestions > 0) {
    const categoriesWithWeight = Object.entries(weights)
      .filter(([_, weight]) => weight > 0)
      .sort(([_, a], [__, b]) => b - a);
    
    for (let i = 0; i < remainingQuestions; i++) {
      const entry = categoriesWithWeight[i % categoriesWithWeight.length];
      if (entry) {
        const category = entry[0];
        questionsPerCategory[category] = (questionsPerCategory[category] || 0) + 1;
      }
    }
  }
  
  // Seleccionar preguntas usando selección ponderada por dificultad
  Object.entries(questionsPerCategory).forEach(([category, count]) => {
    const categoryQuestions = questionsByCategory[category] || [];
    const selected = selectWeightedQuestions(categoryQuestions, count);
    selectedQuestions.push(...selected);
  });
  
  // Mezclar todas las preguntas seleccionadas
  return selectedQuestions.sort(() => 0.5 - Math.random());
};

// Selección ponderada de preguntas basada en dificultad del usuario
const selectWeightedQuestions = (questions: any[], count: number) => {
  if (questions.length <= count) {
    return questions;
  }
  
  // Crear array con preguntas y sus pesos
  const weightedQuestions = questions.map(q => ({
    question: q,
    weight: statsStore.getSelectionWeight(q.id)
  }));
  
  // Selección ponderada
  const selected: any[] = [];
  const available = [...weightedQuestions];
  
  for (let i = 0; i < count && available.length > 0; i++) {
    // Calcular suma total de pesos
    const totalWeight = available.reduce((sum, item) => sum + item.weight, 0);
    
    // Seleccionar aleatoriamente basado en pesos
    let random = Math.random() * totalWeight;
    let selectedIndex = 0;
    
    for (let j = 0; j < available.length; j++) {
      const item = available[j];
      if (item) {
        random -= item.weight;
        if (random <= 0) {
          selectedIndex = j;
          break;
        }
      }
    }
    
    // Agregar pregunta seleccionada y removerla de disponibles
    const selectedItem = available[selectedIndex];
    if (selectedItem) {
      selected.push(selectedItem.question);
      available.splice(selectedIndex, 1);
    }
  }
  
  return selected;
};

// Mezclar preguntas y seleccionar 40
const questions = computed(() => {
  if (Object.keys(categoryWeights.value).length === 0) {
    return [...questionsData]
      .sort(() => 0.5 - Math.random())
      .slice(0, 40);
  }
  return selectQuestionsWithEmphasis(categoryWeights.value);
});

// Pregunta actual
const currentQuestion = computed(() => {
  return questions.value[currentQuestionIndex.value];
});

// Progreso del cuestionario
const progress = computed(() => {
  return ((currentQuestionIndex.value + 1) / questions.value.length) * 100;
});

// Iniciar temporizador
const startTimer = () => {
  timeLeft.value = 60;
  if (timer.value) clearInterval(timer.value);
  
  timer.value = setInterval(() => {
    timeLeft.value--;
    
    if (timeLeft.value <= 0) {
      nextQuestion();
    }
  }, 1000) as unknown as number;
};

// Seleccionar respuesta
const selectOption = (index: number) => {
  selectedOption.value = index;
};

// Siguiente pregunta
const nextQuestion = () => {
  // Guardar respuesta del usuario
  const isCorrect = selectedOption.value === currentQuestion.value.respuestaCorrecta;
  userAnswers.value.push({
    question: currentQuestion.value,
    selected: selectedOption.value,
    isCorrect
  });
  
  // Registrar intento en el store de estadísticas
  statsStore.recordAttempt(currentQuestion.value.id, isCorrect);
  
  // Actualizar puntuación
  if (isCorrect) {
    score.value++;
  }
  
  // Limpiar selección
  selectedOption.value = undefined;
  
  // Detener temporizador
  if (timer.value) {
    clearInterval(timer.value);
  }
  
  // Verificar si es la última pregunta
  if (currentQuestionIndex.value < questions.value.length - 1) {
    currentQuestionIndex.value++;
    startTimer();
  } else {
    // Finalizar cuestionario
    finishQuiz();
  }
};

// Finalizar cuestionario
const finishQuiz = () => {
  if (timer.value) {
    clearInterval(timer.value);
  }
  quizCompleted.value = true;
  showResults.value = true;
};

// Iniciar el quiz con las categorías seleccionadas
const handleStartQuiz = (weights: Record<string, number>) => {
  categoryWeights.value = weights;
  quizStarted.value = true;
  startTimer();
};

// Reiniciar cuestionario
const restartQuiz = () => {
  currentQuestionIndex.value = 0;
  selectedOption.value = undefined;
  score.value = 0;
  quizCompleted.value = false;
  showResults.value = false;
  userAnswers.value = [];
  quizStarted.value = false;
  categoryWeights.value = {};
};

// Limpiar el temporizador al desmontar el componente
onUnmounted(() => {
  if (timer.value) {
    clearInterval(timer.value);
  }
});
</script>

<template>
  <div class="max-w-4xl mx-auto p-0 sm:p-2 md:p-4">
    <!-- Selector de categorías (antes de iniciar) -->
    <CategorySelector 
      v-if="!quizStarted"
      @start-quiz="handleStartQuiz"
    />

    <!-- Quiz en progreso -->
    <template v-else>
      <QuizHeader 
        :current-question-index="currentQuestionIndex" 
        :total-questions="questions.length"
        :time-left="timeLeft"
        :progress="progress"
      />

      <div class="mt-3 sm:mt-4 md:mt-6">
        <transition name="fade" mode="out-in">
          <QuestionCard
            v-if="!quizCompleted"
            :question="currentQuestion"
            :selected-option="selectedOption"
            @select-option="selectOption"
            @next-question="nextQuestion"
            :is-last-question="currentQuestionIndex === questions.length - 1"
          />
          
          <ResultsView
            v-else-if="showResults"
            :score="score"
            :total-questions="questions.length"
            :user-answers="userAnswers"
            @restart-quiz="restartQuiz"
          />
        </transition>
      </div>
    </template>
  </div>
</template>
