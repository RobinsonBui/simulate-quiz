<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  score: {
    type: Number,
    required: true
  },
  totalQuestions: {
    type: Number,
    required: true
  },
  userAnswers: {
    type: Array as () => Array<{
      question: any;
      selected: number | null;
      isCorrect: boolean;
    }>,
    required: true
  }
});

const emit = defineEmits(['restart-quiz']);

const scorePercentage = computed(() => {
  return Math.round((props.score / props.totalQuestions) * 100);
});

const passed = computed(() => {
  return scorePercentage.value >= 90;
});

// Análisis de áreas de mejora
const studyRecommendations = computed(() => {
  const incorrectAnswers = props.userAnswers.filter(answer => !answer.isCorrect);
  
  // Agrupar por bloque
  const byBlock: Record<string, number> = {};
  const byTopic: Record<string, { count: number; block: string }> = {};
  
  incorrectAnswers.forEach(answer => {
    const block = answer.question.bloque;
    const topic = answer.question.tema;
    
    byBlock[block] = (byBlock[block] || 0) + 1;
    
    if (!byTopic[topic]) {
      byTopic[topic] = { count: 0, block };
    }
    byTopic[topic].count++;
  });
  
  // Ordenar por cantidad de errores
  const sortedBlocks = Object.entries(byBlock)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count }));
    
  const sortedTopics = Object.entries(byTopic)
    .sort((a, b) => b[1].count - a[1].count)
    .map(([name, data]) => ({ name, count: data.count, block: data.block }));
  
  return {
    blocks: sortedBlocks,
    topics: sortedTopics,
    totalIncorrect: incorrectAnswers.length
  };
});

const handleRestart = () => {
  emit('restart-quiz');
};
</script>

<template>
  <div class="bg-white rounded-lg shadow-md p-3 sm:p-4 md:p-6 animate-fade-in">
    <h2 class="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-4 sm:mb-6">
      Resultados del Examen
    </h2>
    
    <div class="text-center mb-6 sm:mb-8">
      <div 
        class="w-32 h-32 sm:w-40 sm:h-40 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 text-3xl sm:text-4xl font-bold text-white shadow-lg"
        :class="{
          'bg-green-500': passed,
          'bg-red-500': !passed
        }"
      >
        {{ scorePercentage }}%
      </div>
      
      <h3 
        class="text-base sm:text-lg md:text-xl font-semibold mb-2 px-3"
        :class="{
          'text-green-600': passed,
          'text-red-600': !passed
        }"
      >
        {{ passed ? '¡Felicidades! Has aprobado el examen.' : 'No has alcanzado el puntaje mínimo requerido (90%).' }}
      </h3>
      
      <p class="text-sm sm:text-base text-gray-600">
        Respuestas correctas: {{ score }} de {{ totalQuestions }}
      </p>
    </div>
    
    <div class="mb-6 sm:mb-8">
      <h3 class="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4 pb-2 border-b border-gray-200">
        Revisión de respuestas
      </h3>
      
      <div class="space-y-4 sm:space-y-6 max-h-80 sm:max-h-96 overflow-y-auto pr-1 sm:pr-2">
        <div 
          v-for="(answer, index) in userAnswers" 
          :key="index"
          class="p-3 sm:p-4 rounded-lg border"
          :class="{
            'border-green-200 bg-green-50': answer.isCorrect,
            'border-red-200 bg-red-50': !answer.isCorrect
          }"
        >
          <div class="text-sm sm:text-base font-medium text-gray-800 mb-2 leading-snug">
            Pregunta {{ index + 1 }}: {{ answer.question.pregunta }}
          </div>
          
          <div 
            class="p-2 sm:p-3 rounded-md mb-2 text-sm sm:text-base"
            :class="{
              'bg-green-100 text-green-800': answer.isCorrect,
              'bg-red-100 text-red-800': !answer.isCorrect
            }"
          >
            <span class="font-medium">Tu respuesta:</span>
            <span class="ml-1">
              {{ answer.selected !== null ? 
                 answer.question.opciones[answer.selected] : 
                 'No respondida' }}
            </span>
          </div>
          
          <div 
            v-if="!answer.isCorrect && answer.selected !== null"
            class="p-2 sm:p-3 rounded-md bg-green-50 border border-green-100 text-green-800 text-sm sm:text-base"
          >
            <span class="font-medium">Respuesta correcta:</span>
            <span class="ml-1">
              {{ answer.question.opciones[answer.question.respuestaCorrecta] }}
            </span>
          </div>
          
          <div 
            v-if="answer.question.explicacion"
            class="mt-2 sm:mt-3 p-2 sm:p-3 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700 rounded-r text-sm sm:text-base"
          >
            <p class="font-medium">Explicación:</p>
            <p class="mt-1">{{ answer.question.explicacion }}</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Sección de recomendaciones de estudio -->
    <div v-if="studyRecommendations.totalIncorrect > 0" class="mb-6 sm:mb-8">
      <h3 class="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4 pb-2 border-b border-gray-200">
        📚 Áreas de mejora
      </h3>
      
      <div class="bg-blue-50 border-l-4 border-blue-500 p-3 sm:p-4 mb-3 sm:mb-4 rounded-r">
        <p class="text-sm sm:text-base text-blue-800 font-medium mb-2">
          Tuviste {{ studyRecommendations.totalIncorrect }} respuesta(s) incorrecta(s). 
          Te recomendamos estudiar los siguientes temas:
        </p>
      </div>
      
      <!-- Bloques con más errores -->
      <div class="mb-4 sm:mb-6">
        <h4 class="text-sm sm:text-base font-semibold text-gray-700 mb-2 sm:mb-3">Bloques a reforzar:</h4>
        <div class="space-y-2">
          <div 
            v-for="block in studyRecommendations.blocks" 
            :key="block.name"
            class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-3 bg-orange-50 border border-orange-200 rounded-lg"
          >
            <div class="flex items-center gap-2 sm:gap-3">
              <div class="w-7 h-7 sm:w-8 sm:h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-xs sm:text-sm flex-shrink-0">
                {{ block.count }}
              </div>
              <span class="text-sm sm:text-base font-medium text-gray-800">{{ block.name }}</span>
            </div>
            <span class="text-xs sm:text-sm text-orange-600 font-medium ml-9 sm:ml-0">
              {{ Math.round((block.count / studyRecommendations.totalIncorrect) * 100) }}% de tus errores
            </span>
          </div>
        </div>
      </div>
      
      <!-- Temas específicos -->
      <div>
        <h4 class="text-sm sm:text-base font-semibold text-gray-700 mb-2 sm:mb-3">Temas específicos a repasar:</h4>
        <div class="space-y-2">
          <div 
            v-for="topic in studyRecommendations.topics.slice(0, 5)" 
            :key="topic.name"
            class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-3 bg-purple-50 border border-purple-200 rounded-lg"
          >
            <div class="flex-1">
              <div class="text-sm sm:text-base font-medium text-gray-800">{{ topic.name }}</div>
              <div class="text-xs sm:text-sm text-gray-600">{{ topic.block }}</div>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-xs sm:text-sm text-purple-600 font-medium whitespace-nowrap">
                {{ topic.count }} error(es)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Mensaje de felicitación si no hay errores -->
    <div v-else class="mb-6 sm:mb-8 bg-green-50 border-l-4 border-green-500 p-3 sm:p-4 rounded-r">
      <p class="text-sm sm:text-base text-green-800 font-medium">
        🎉 ¡Excelente! Respondiste todas las preguntas correctamente. ¡Sigue así!
      </p>
    </div>
    
    <button
      class="w-full py-3 sm:py-3.5 px-4 sm:px-6 bg-blue-600 text-white text-sm sm:text-base font-semibold rounded-lg shadow-md hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200 touch-manipulation"
      @click="handleRestart"
    >
      Realizar otro examen
    </button>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Estilo personalizado para la barra de desplazamiento */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
