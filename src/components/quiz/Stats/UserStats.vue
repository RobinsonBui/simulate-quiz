<script setup lang="ts">
import { computed } from 'vue';
import { useQuestionStatsStore } from '../../../stores/questionStats';

const statsStore = useQuestionStatsStore();

const emit = defineEmits(['close']);

// Obtener preguntas por dificultad
const easyQuestions = computed(() => {
  return statsStore.getQuestionsByDifficulty('easy');
});

const mediumQuestions = computed(() => {
  return statsStore.getQuestionsByDifficulty('medium');
});

const hardQuestions = computed(() => {
  return statsStore.getQuestionsByDifficulty('hard');
});

// Formatear porcentaje
const formatPercentage = (value: number) => {
  return value.toFixed(1);
};

const handleClose = () => {
  emit('close');
};

const handleReset = () => {
  if (confirm('¿Estás seguro de que quieres resetear todas las estadísticas? Esta acción no se puede deshacer.')) {
    statsStore.resetStats();
  }
};
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
    <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="sticky top-0 bg-white border-b border-gray-200 p-4 sm:p-6 flex items-center justify-between">
        <h2 class="text-xl sm:text-2xl font-bold text-gray-800">
          📊 Tus Estadísticas
        </h2>
        <button
          @click="handleClose"
          class="text-gray-500 hover:text-gray-700 text-2xl leading-none"
        >
          ×
        </button>
      </div>

      <!-- Content -->
      <div class="p-4 sm:p-6 space-y-6">
        <!-- Resumen General -->
        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 sm:p-6">
          <h3 class="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
            Resumen General
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div class="bg-white rounded-lg p-3 sm:p-4 text-center">
              <div class="text-2xl sm:text-3xl font-bold text-blue-600">
                {{ statsStore.totalQuestionsAttempted }}
              </div>
              <div class="text-xs sm:text-sm text-gray-600 mt-1">
                Preguntas Practicadas
              </div>
            </div>
            <div class="bg-white rounded-lg p-3 sm:p-4 text-center">
              <div class="text-2xl sm:text-3xl font-bold text-green-600">
                {{ formatPercentage(statsStore.averageSuccessRate) }}%
              </div>
              <div class="text-xs sm:text-sm text-gray-600 mt-1">
                Tasa de Éxito Promedio
              </div>
            </div>
            <div class="bg-white rounded-lg p-3 sm:p-4 text-center">
              <div class="text-2xl sm:text-3xl font-bold text-purple-600">
                {{ statsStore.hardQuestionsCount }}
              </div>
              <div class="text-xs sm:text-sm text-gray-600 mt-1">
                Preguntas Difíciles
              </div>
            </div>
          </div>
        </div>

        <!-- Información sobre el sistema -->
        <div class="bg-yellow-50 border-l-4 border-yellow-400 p-3 sm:p-4 rounded-r">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <span class="text-xl sm:text-2xl">💡</span>
            </div>
            <div class="ml-3">
              <h4 class="text-sm sm:text-base font-semibold text-yellow-800 mb-1">
                Sistema de Aprendizaje Adaptativo
              </h4>
              <p class="text-xs sm:text-sm text-yellow-700">
                El simulador ajusta automáticamente las preguntas según tu desempeño:
              </p>
              <ul class="text-xs sm:text-sm text-yellow-700 mt-2 space-y-1 ml-4 list-disc">
                <li>Las preguntas que dominas aparecen con <strong>menor frecuencia</strong></li>
                <li>Las preguntas difíciles aparecen <strong>más seguido</strong> para reforzar</li>
                <li>Preguntas no vistas en 30+ días reaparecen para refrescar conocimiento</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Distribución por Dificultad -->
        <div>
          <h3 class="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
            Distribución por Dificultad
          </h3>
          
          <!-- Fáciles -->
          <div class="mb-4">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm sm:text-base font-medium text-gray-700">
                🟢 Fáciles (Dominas)
              </span>
              <span class="text-sm sm:text-base font-bold text-green-600">
                {{ easyQuestions.length }}
              </span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                class="bg-green-500 h-2.5 rounded-full transition-all duration-300"
                :style="{ width: `${(easyQuestions.length / statsStore.totalQuestionsAttempted) * 100}%` }"
              ></div>
            </div>
            <p class="text-xs text-gray-500 mt-1">
              Estas preguntas aparecerán con menor frecuencia
            </p>
          </div>

          <!-- Medias -->
          <div class="mb-4">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm sm:text-base font-medium text-gray-700">
                🟡 Medias (En progreso)
              </span>
              <span class="text-sm sm:text-base font-bold text-yellow-600">
                {{ mediumQuestions.length }}
              </span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                class="bg-yellow-500 h-2.5 rounded-full transition-all duration-300"
                :style="{ width: `${(mediumQuestions.length / statsStore.totalQuestionsAttempted) * 100}%` }"
              ></div>
            </div>
            <p class="text-xs text-gray-500 mt-1">
              Frecuencia normal de aparición
            </p>
          </div>

          <!-- Difíciles -->
          <div class="mb-4">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm sm:text-base font-medium text-gray-700">
                🔴 Difíciles (Necesitan refuerzo)
              </span>
              <span class="text-sm sm:text-base font-bold text-red-600">
                {{ hardQuestions.length }}
              </span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                class="bg-red-500 h-2.5 rounded-full transition-all duration-300"
                :style="{ width: `${(hardQuestions.length / statsStore.totalQuestionsAttempted) * 100}%` }"
              ></div>
            </div>
            <p class="text-xs text-gray-500 mt-1">
              Estas preguntas aparecerán con mayor frecuencia para ayudarte a mejorar
            </p>
          </div>
        </div>

        <!-- Mensaje si no hay estadísticas -->
        <div v-if="statsStore.totalQuestionsAttempted === 0" class="text-center py-8">
          <span class="text-4xl sm:text-6xl">📚</span>
          <p class="text-base sm:text-lg text-gray-600 mt-4">
            Aún no has practicado ninguna pregunta
          </p>
          <p class="text-xs sm:text-sm text-gray-500 mt-2">
            Comienza un simulacro para que el sistema aprenda tu nivel
          </p>
        </div>

        <!-- Botón de Reset -->
        <div class="pt-4 border-t border-gray-200">
          <button
            @click="handleReset"
            :disabled="statsStore.totalQuestionsAttempted === 0"
            class="w-full py-2.5 px-4 bg-red-100 hover:bg-red-200 active:bg-red-300 text-red-700 text-sm sm:text-base font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
          >
            🗑️ Resetear Todas las Estadísticas
          </button>
          <p class="text-xs text-gray-500 text-center mt-2">
            Esto eliminará todo tu progreso y el sistema volverá a empezar desde cero
          </p>
        </div>
      </div>

      <!-- Footer -->
      <div class="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-4 sm:p-6">
        <button
          @click="handleClose"
          class="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm sm:text-base font-semibold rounded-lg transition-colors touch-manipulation"
        >
          Cerrar
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Animación de entrada */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.fixed {
  animation: fadeIn 0.2s ease-out;
}
</style>
