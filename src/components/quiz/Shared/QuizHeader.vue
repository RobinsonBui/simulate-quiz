<script setup lang="ts">
const props = defineProps({
  currentQuestionIndex: {
    type: Number,
    required: true
  },
  totalQuestions: {
    type: Number,
    required: true
  },
  timeLeft: {
    type: Number,
    required: true
  },
  progress: {
    type: Number,
    required: true
  }
});
</script>

<template>
  <header class="bg-white rounded-lg shadow-md p-3 sm:p-4 md:p-6">
    <h1 class="text-base sm:text-xl md:text-2xl font-bold text-center text-gray-800 mb-2 sm:mb-3">
      Simulador de Examen de Conducción B1
    </h1>
    
    <div class="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0 mb-3 sm:mb-4">
      <div class="text-sm sm:text-base md:text-lg font-medium text-gray-700 text-center sm:text-left">
        Pregunta {{ currentQuestionIndex + 1 }} de {{ totalQuestions }}
      </div>
      
      <div 
        class="text-base sm:text-lg font-bold px-3 py-1 rounded-lg"
        :class="{
          'text-red-500 bg-red-50': timeLeft <= 10,
          'text-blue-600 bg-blue-50': timeLeft > 10
        }"
      >
        ⏱️ {{ timeLeft }}s
      </div>
    </div>
    
    <div class="w-full bg-gray-200 rounded-full h-3 sm:h-2.5">
      <div 
        class="bg-blue-600 h-3 sm:h-2.5 rounded-full transition-all duration-300"
        :style="{ width: `${progress}%` }"
      ></div>
    </div>
  </header>
</template>
