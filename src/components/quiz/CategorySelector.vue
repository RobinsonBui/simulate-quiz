<script setup lang="ts">
import { ref, computed } from 'vue';

interface CategoryEmphasis {
  name: string;
  weight: number;
  icon: string;
  description: string;
}

const emit = defineEmits<{
  (e: 'start-quiz', categories: Record<string, number>): void
}>();

// Categorías disponibles con sus pesos
const categories = ref<CategoryEmphasis[]>([
  {
    name: 'Señalización Vial',
    weight: 1,
    icon: '🚦',
    description: 'Señales de tránsito, marcas viales y semáforos'
  },
  {
    name: 'Normativa y Reglas',
    weight: 1,
    icon: '📋',
    description: 'Leyes de tránsito, velocidades y prelación'
  },
  {
    name: 'El Vehículo',
    weight: 1,
    icon: '🚗',
    description: 'Mecánica básica y equipamiento'
  },
  {
    name: 'Seguridad Vial',
    weight: 1,
    icon: '🛡️',
    description: 'Conducción defensiva y primeros auxilios'
  },
  {
    name: 'Infracciones y Sanciones',
    weight: 1,
    icon: '⚠️',
    description: 'Multas y sanciones de tránsito'
  }
]);

// Incrementar énfasis
const increaseEmphasis = (index: number) => {
  if (categories.value[index].weight < 5) {
    categories.value[index].weight++;
  }
};

// Decrementar énfasis
const decreaseEmphasis = (index: number) => {
  if (categories.value[index].weight > 0) {
    categories.value[index].weight--;
  }
};

// Obtener el texto del nivel de énfasis
const getEmphasisLabel = (weight: number): string => {
  switch (weight) {
    case 0: return 'Sin énfasis';
    case 1: return 'Normal';
    case 2: return 'Medio';
    case 3: return 'Alto';
    case 4: return 'Muy Alto';
    case 5: return 'Máximo';
    default: return 'Normal';
  }
};

// Obtener el color del nivel de énfasis
const getEmphasisColor = (weight: number): string => {
  switch (weight) {
    case 0: return 'bg-gray-200';
    case 1: return 'bg-blue-200';
    case 2: return 'bg-green-300';
    case 3: return 'bg-yellow-300';
    case 4: return 'bg-orange-400';
    case 5: return 'bg-red-400';
    default: return 'bg-blue-200';
  }
};

// Verificar si al menos una categoría tiene peso > 0
const canStart = computed(() => {
  return categories.value.some(cat => cat.weight > 0);
});

// Iniciar el quiz con las categorías seleccionadas
const startQuiz = () => {
  if (!canStart.value) return;
  
  const categoryWeights: Record<string, number> = {};
  categories.value.forEach(cat => {
    categoryWeights[cat.name] = cat.weight;
  });
  
  emit('start-quiz', categoryWeights);
};

// Restablecer a valores normales
const resetToNormal = () => {
  categories.value.forEach(cat => {
    cat.weight = 1;
  });
};
</script>

<template>
  <div class="max-w-4xl mx-auto p-6">
    <div class="bg-white rounded-lg shadow-lg p-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">
          🎯 Configuración del Simulacro
        </h1>
        <p class="text-gray-600">
          Selecciona en qué categorías quieres hacer más énfasis
        </p>
      </div>

      <!-- Instrucciones -->
      <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <p class="text-sm text-blue-800">
          <strong>💡 Instrucción:</strong> Ajusta el nivel de énfasis para cada categoría. 
          Mayor énfasis = más preguntas de esa categoría en el simulacro.
        </p>
      </div>

      <!-- Categorías -->
      <div class="space-y-4 mb-8">
        <div 
          v-for="(category, index) in categories" 
          :key="category.name"
          class="border rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <div class="flex items-start justify-between mb-3">
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-2xl">{{ category.icon }}</span>
                <h3 class="text-lg font-semibold text-gray-800">
                  {{ category.name }}
                </h3>
              </div>
              <p class="text-sm text-gray-600 ml-9">
                {{ category.description }}
              </p>
            </div>
          </div>

          <!-- Control de énfasis -->
          <div class="ml-9 flex items-center gap-4">
            <button
              @click="decreaseEmphasis(index)"
              :disabled="category.weight === 0"
              class="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-bold text-gray-700 transition-colors"
            >
              −
            </button>

            <!-- Barra de progreso -->
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-sm font-medium text-gray-700 min-w-[80px]">
                  {{ getEmphasisLabel(category.weight) }}
                </span>
                <span class="text-xs text-gray-500">
                  ({{ category.weight }}/5)
                </span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div 
                  :class="getEmphasisColor(category.weight)"
                  class="h-2 rounded-full transition-all duration-300"
                  :style="{ width: `${(category.weight / 5) * 100}%` }"
                ></div>
              </div>
            </div>

            <button
              @click="increaseEmphasis(index)"
              :disabled="category.weight === 5"
              class="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-bold text-gray-700 transition-colors"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <!-- Botones de acción -->
      <div class="flex gap-4 justify-center">
        <button
          @click="resetToNormal"
          class="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors"
        >
          Restablecer a Normal
        </button>
        <button
          @click="startQuiz"
          :disabled="!canStart"
          class="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors shadow-md"
        >
          Iniciar Simulacro
        </button>
      </div>

      <!-- Advertencia si no hay categorías seleccionadas -->
      <div v-if="!canStart" class="mt-4 text-center">
        <p class="text-sm text-red-600">
          ⚠️ Debes seleccionar al menos una categoría con énfasis mayor a 0
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Animaciones suaves */
button {
  transition: all 0.2s ease;
}

button:active:not(:disabled) {
  transform: scale(0.95);
}
</style>
