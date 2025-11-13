<script setup lang="ts">
import { ref, computed } from 'vue';
import questionsData from '../../../database/questions.json';

// Estado
const searchQuery = ref('');
const selectedCategory = ref('Todas');
const selectedTheme = ref('Todos');
const showAnswers = ref(true);
const expandedQuestions = ref<Set<string>>(new Set());

// Obtener categorías únicas
const categories = computed(() => {
  const cats = new Set(questionsData.map(q => q.bloque));
  return ['Todas', ...Array.from(cats).sort()];
});

// Obtener temas únicos según categoría seleccionada
const themes = computed(() => {
  if (selectedCategory.value === 'Todas') {
    const allThemes = new Set(questionsData.map(q => q.tema));
    return ['Todos', ...Array.from(allThemes).sort()];
  }
  const filteredThemes = new Set(
    questionsData
      .filter(q => q.bloque === selectedCategory.value)
      .map(q => q.tema)
  );
  return ['Todos', ...Array.from(filteredThemes).sort()];
});

// Filtrar preguntas
const filteredQuestions = computed(() => {
  return questionsData.filter(q => {
    const matchesSearch = searchQuery.value === '' || 
      q.pregunta.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      q.id.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      q.explicacion.toLowerCase().includes(searchQuery.value.toLowerCase());
    
    const matchesCategory = selectedCategory.value === 'Todas' || 
      q.bloque === selectedCategory.value;
    
    const matchesTheme = selectedTheme.value === 'Todos' || 
      q.tema === selectedTheme.value;
    
    return matchesSearch && matchesCategory && matchesTheme;
  });
});

// Toggle expansión de pregunta
const toggleQuestion = (questionId: string) => {
  if (expandedQuestions.value.has(questionId)) {
    expandedQuestions.value.delete(questionId);
  } else {
    expandedQuestions.value.add(questionId);
  }
};

// Expandir/colapsar todas
const expandAll = () => {
  filteredQuestions.value.forEach(q => {
    expandedQuestions.value.add(q.id);
  });
};

const collapseAll = () => {
  expandedQuestions.value.clear();
};

// Resetear filtros
const resetFilters = () => {
  searchQuery.value = '';
  selectedCategory.value = 'Todas';
  selectedTheme.value = 'Todos';
};

// Emitir evento de cierre
const emit = defineEmits(['close']);
</script>

<template>
  <div class="min-h-screen bg-gray-50 pb-20">
    <!-- Header Sticky -->
    <div class="sticky top-0 z-40 bg-white shadow-sm border-b">
      <div class="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div class="flex items-center justify-between mb-3">
          <h1 class="text-lg sm:text-2xl font-bold text-gray-800">
            📚 Banco de Preguntas
          </h1>
          <button
            @click="emit('close')"
            class="text-gray-500 hover:text-gray-700 text-2xl leading-none px-2"
          >
            ×
          </button>
        </div>

        <!-- Búsqueda -->
        <div class="mb-3">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="🔍 Buscar por pregunta, ID o explicación..."
            class="w-full px-3 sm:px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
          />
        </div>

        <!-- Filtros -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
          <select
            v-model="selectedCategory"
            @change="selectedTheme = 'Todos'"
            class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          >
            <option v-for="cat in categories" :key="cat" :value="cat">
              {{ cat }}
            </option>
          </select>

          <select
            v-model="selectedTheme"
            class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          >
            <option v-for="theme in themes" :key="theme" :value="theme">
              {{ theme }}
            </option>
          </select>
        </div>

        <!-- Controles -->
        <div class="flex flex-wrap gap-2 items-center justify-between">
          <div class="flex gap-2">
            <button
              @click="expandAll"
              class="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-xs sm:text-sm font-medium hover:bg-blue-200 transition-colors"
            >
              Expandir Todas
            </button>
            <button
              @click="collapseAll"
              class="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              Colapsar Todas
            </button>
          </div>

          <div class="flex items-center gap-2">
            <label class="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
              <input
                v-model="showAnswers"
                type="checkbox"
                class="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              Mostrar respuestas
            </label>
            <button
              @click="resetFilters"
              class="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-xs sm:text-sm font-medium hover:bg-red-200 transition-colors"
            >
              Limpiar
            </button>
          </div>
        </div>

        <!-- Contador -->
        <div class="mt-3 text-xs sm:text-sm text-gray-600 text-center">
          Mostrando <strong>{{ filteredQuestions.length }}</strong> de <strong>{{ questionsData.length }}</strong> preguntas
        </div>
      </div>
    </div>

    <!-- Lista de Preguntas -->
    <div class="container mx-auto px-3 sm:px-4 py-4 space-y-3">
      <div
        v-for="(question, index) in filteredQuestions"
        :key="question.id"
        class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
      >
        <!-- Header de la pregunta -->
        <div
          @click="toggleQuestion(question.id)"
          class="p-3 sm:p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <div class="flex items-start justify-between gap-3">
            <div class="flex-1 min-w-0">
              <div class="flex flex-wrap items-center gap-2 mb-2">
                <span class="text-xs font-mono bg-gray-100 text-gray-700 px-2 py-1 rounded">
                  {{ question.id }}
                </span>
                <span class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-medium">
                  {{ question.bloque }}
                </span>
                <span class="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                  {{ question.tema }}
                </span>
              </div>
              <p class="text-sm sm:text-base font-semibold text-gray-800">
                {{ index + 1 }}. {{ question.pregunta }}
              </p>
            </div>
            <button class="text-gray-400 hover:text-gray-600 flex-shrink-0">
              <span v-if="expandedQuestions.has(question.id)" class="text-xl">▼</span>
              <span v-else class="text-xl">▶</span>
            </button>
          </div>
        </div>

        <!-- Contenido expandido -->
        <div
          v-if="expandedQuestions.has(question.id)"
          class="border-t border-gray-200 p-3 sm:p-4 bg-gray-50"
        >
          <!-- Imagen si existe -->
          <div v-if="question.imagen" class="mb-4">
            <img
              :src="question.imagen"
              :alt="question.pregunta"
              class="max-w-full h-auto rounded-lg border border-gray-300 mx-auto"
              style="max-height: 300px;"
            />
          </div>

          <!-- Opciones -->
          <div class="space-y-2 mb-4">
            <div
              v-for="(opcion, idx) in question.opciones"
              :key="idx"
              :class="[
                'p-3 rounded-lg border-2 text-sm sm:text-base',
                showAnswers && idx === question.respuestaCorrecta
                  ? 'bg-green-50 border-green-500 text-green-900 font-semibold'
                  : 'bg-white border-gray-200 text-gray-700'
              ]"
            >
              <div class="flex items-start gap-2">
                <span class="font-bold flex-shrink-0">{{ String.fromCharCode(65 + idx) }}.</span>
                <span class="flex-1">{{ opcion }}</span>
                <span v-if="showAnswers && idx === question.respuestaCorrecta" class="text-green-600 flex-shrink-0">
                  ✓
                </span>
              </div>
            </div>
          </div>

          <!-- Explicación -->
          <div v-if="showAnswers" class="bg-blue-50 border-l-4 border-blue-500 p-3 rounded-r-lg">
            <p class="text-xs sm:text-sm font-semibold text-blue-900 mb-1">
              💡 Explicación:
            </p>
            <p class="text-xs sm:text-sm text-blue-800">
              {{ question.explicacion }}
            </p>
            <p class="text-xs text-blue-600 mt-2 italic">
              Fuente: {{ question.fuente }}
            </p>
          </div>
        </div>
      </div>

      <!-- Mensaje si no hay resultados -->
      <div
        v-if="filteredQuestions.length === 0"
        class="text-center py-12"
      >
        <span class="text-6xl">🔍</span>
        <p class="text-lg text-gray-600 mt-4">
          No se encontraron preguntas
        </p>
        <p class="text-sm text-gray-500 mt-2">
          Intenta ajustar los filtros o la búsqueda
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Animaciones suaves */
.bg-gray-50 {
  transition: background-color 0.2s;
}

/* Scroll suave */
html {
  scroll-behavior: smooth;
}
</style>
