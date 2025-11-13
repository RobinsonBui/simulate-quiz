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
  <header class="bg-white rounded-lg shadow-md p-6">
    <h1 class="text-2xl font-bold text-center text-gray-800 mb-2">
      Simulador de Examen de Conducción B1
    </h1>
    
    <div class="flex justify-between items-center mb-4">
      <div class="text-lg font-medium text-gray-700">
        Pregunta {{ currentQuestionIndex + 1 }} de {{ totalQuestions }}
      </div>
      
      <div 
        class="text-lg font-bold"
        :class="{
          'text-red-500': timeLeft <= 10,
          'text-blue-600': timeLeft > 10
        }"
      >
        Tiempo: {{ timeLeft }}s
      </div>
    </div>
    
    <div class="w-full bg-gray-200 rounded-full h-2.5">
      <div 
        class="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
        :style="{ width: `${progress}%` }"
      ></div>
    </div>
  </header>
</template>
