<script setup lang="ts">
import { ref } from 'vue';
import Quiz from './components/quiz/Quiz.vue';
import ImageChecker from './components/quiz/ImageChecker.vue';
import UserStats from './components/quiz/Stats/UserStats.vue';
import QuestionBank from './components/quiz/Study/QuestionBank.vue';

const currentView = ref<'quiz' | 'image-checker' | 'question-bank'>('quiz');
const showStats = ref(false);

// Detectar si estamos en modo debug (URL con ?debug=images)
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('debug') === 'images') {
  currentView.value = 'image-checker';
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navegación Mobile-First -->
    <div class="bg-white shadow-sm border-b sticky top-0 z-50">
      <div class="container mx-auto px-3 sm:px-4">
        <div class="flex flex-col sm:flex-row items-center justify-between py-2 sm:py-3 gap-2 sm:gap-0">
          <div class="flex items-center gap-2 sm:gap-4">
            <h1 class="text-base sm:text-xl font-bold text-gray-800 text-center sm:text-left">
              🚗 Simulador de Tránsito
            </h1>
          </div>
          
          <div class="flex gap-1.5 sm:gap-2 w-full sm:w-auto flex-wrap">
            <button
              @click="currentView = 'quiz'"
              :class="[
                'flex-1 sm:flex-none px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors',
                currentView === 'quiz'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              ]"
            >
              <span class="hidden sm:inline">📝 Simulacro</span>
              <span class="sm:hidden">📝</span>
            </button>
            <button
              @click="currentView = 'question-bank'"
              :class="[
                'flex-1 sm:flex-none px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors',
                currentView === 'question-bank'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              ]"
              title="Ver banco de preguntas"
            >
              <span class="hidden sm:inline">📚 Banco</span>
              <span class="sm:hidden">📚</span>
            </button>
            <button
              @click="showStats = true"
              class="flex-1 sm:flex-none px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200"
              title="Ver tus estadísticas"
            >
              <span class="hidden sm:inline">📊 Stats</span>
              <span class="sm:hidden">📊</span>
            </button>
            <button
              @click="currentView = 'image-checker'"
              :class="[
                'flex-1 sm:flex-none px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors',
                currentView === 'image-checker'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              ]"
            >
              <span class="hidden sm:inline">🖼️ Imágenes</span>
              <span class="sm:hidden">🖼️</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Contenido -->
    <div v-if="currentView !== 'question-bank'" class="py-3 sm:py-6 md:py-8">
      <div class="container mx-auto px-3 sm:px-4">
        <transition name="fade" mode="out-in">
          <Quiz v-if="currentView === 'quiz'" />
          <ImageChecker v-else-if="currentView === 'image-checker'" />
        </transition>
      </div>
    </div>

    <!-- Banco de Preguntas (pantalla completa) -->
    <QuestionBank v-if="currentView === 'question-bank'" @close="currentView = 'quiz'" />

    <!-- Modal de Estadísticas -->
    <UserStats v-if="showStats" @close="showStats = false" />
  </div>
</template>

<style>
/* Estilos globales */
body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

/* Animaciones */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Personalización de la barra de desplazamiento */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
