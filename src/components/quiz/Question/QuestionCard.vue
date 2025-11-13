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
  <div class="bg-white rounded-lg shadow-md p-6 animate-fade-in">
    <h2 class="text-xl font-semibold text-gray-800 mb-6">
      {{ question.pregunta }}
    </h2>
    
    <div v-if="question.imagen" class="mb-6 flex justify-center">
      <img 
        :src="question.imagen" 
        :alt="'Imagen para: ' + question.pregunta"
        class="max-h-64 rounded-lg shadow-sm"
      />
    </div>
    
    <div class="space-y-3 mb-6">
      <button
        v-for="(option, index) in question.opciones"
        :key="index"
        class="w-full p-4 text-left rounded-lg border-2 transition-colors duration-200"
        :class="{
          'border-blue-500 bg-blue-50': selectedOption === index,
          'border-gray-200 hover:border-blue-300': selectedOption !== index,
          'hover:bg-gray-50': selectedOption === null || selectedOption !== index
        }"
        @click="handleSelectOption(index)"
      >
        <span class="font-medium text-gray-800">{{ option }}</span>
      </button>
    </div>
    
    <button
      class="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
