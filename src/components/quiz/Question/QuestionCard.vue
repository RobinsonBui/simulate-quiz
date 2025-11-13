<script setup lang="ts">
const props = defineProps({
  question: {
    type: Object,
    required: true
  },
  selectedOption: {
    type: Number,
    default: null
  },
  isLastQuestion: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['select-option', 'next-question']);

const handleSelectOption = (index: number) => {
  emit('select-option', index);
};

const handleNextQuestion = () => {
  emit('next-question');
};
</script>

<template>
  <div class="bg-white rounded-lg shadow-md p-3 sm:p-4 md:p-6 animate-fade-in">
    <h2 class="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-4 sm:mb-5 md:mb-6 leading-snug">
      {{ question.pregunta }}
    </h2>
    
    <div v-if="question.imagen" class="mb-4 sm:mb-5 md:mb-6 flex justify-center">
      <img 
        :src="question.imagen" 
        :alt="'Imagen para: ' + question.pregunta"
        class="max-h-48 sm:max-h-56 md:max-h-64 w-auto max-w-full rounded-lg shadow-sm"
      />
    </div>
    
    <div class="space-y-2 sm:space-y-3 mb-4 sm:mb-5 md:mb-6">
      <button
        v-for="(option, index) in question.opciones"
        :key="index"
        class="w-full p-3 sm:p-4 text-left rounded-lg border-2 transition-colors duration-200 touch-manipulation"
        :class="{
          'border-blue-500 bg-blue-50': selectedOption === index,
          'border-gray-200 hover:border-blue-300 active:border-blue-400': selectedOption !== index,
          'hover:bg-gray-50 active:bg-gray-100': selectedOption === null || selectedOption !== index
        }"
        @click="handleSelectOption(index)"
      >
        <span class="text-sm sm:text-base font-medium text-gray-800">{{ option }}</span>
      </button>
    </div>
    
    <button
      class="w-full py-3 sm:py-3.5 px-4 sm:px-6 bg-blue-600 text-white text-sm sm:text-base font-semibold rounded-lg shadow-md hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
      :disabled="selectedOption === null"
      @click="handleNextQuestion"
    >
      {{ isLastQuestion ? 'Finalizar examen' : 'Siguiente pregunta' }}
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
</style>
