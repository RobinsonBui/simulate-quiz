<script setup lang="ts">
import { ref, computed } from 'vue';
import questionsData from '../../database/questions.json';

// Filtrar solo preguntas con imágenes
const questionsWithImages = computed(() => {
  return questionsData.filter(q => q.imagen);
});

// Estado de carga de imágenes
const imageStatus = ref<Record<string, 'loading' | 'success' | 'error'>>({});

// Inicializar estado
questionsWithImages.value.forEach(q => {
  imageStatus.value[q.id] = 'loading';
});

// Manejar carga exitosa de imagen
const handleImageLoad = (questionId: string) => {
  imageStatus.value[questionId] = 'success';
};

// Manejar error de carga de imagen
const handleImageError = (questionId: string) => {
  imageStatus.value[questionId] = 'error';
};

// Estadísticas
const stats = computed(() => {
  const total = questionsWithImages.value.length;
  const loaded = Object.values(imageStatus.value).filter(s => s === 'success').length;
  const errors = Object.values(imageStatus.value).filter(s => s === 'error').length;
  const loading = Object.values(imageStatus.value).filter(s => s === 'loading').length;
  
  return { total, loaded, errors, loading };
});

// Filtros
const filter = ref<'all' | 'success' | 'error' | 'loading'>('all');

const filteredQuestions = computed(() => {
  if (filter.value === 'all') return questionsWithImages.value;
  return questionsWithImages.value.filter(q => imageStatus.value[q.id] === filter.value);
});

// Agrupar por bloque
const questionsByBloque = computed(() => {
  const grouped: Record<string, any[]> = {};
  filteredQuestions.value.forEach(q => {
    if (!grouped[q.bloque]) {
      grouped[q.bloque] = [];
    }
    const bloqueArray = grouped[q.bloque];
    if (bloqueArray) {
      bloqueArray.push(q);
    }
  });
  return grouped;
});

// Determinar si la URL es externa o local
const isExternalUrl = (url: string | null) => {
  if (!url) return false;
  return url.startsWith('http://') || url.startsWith('https://');
};

// Copiar al portapapeles
const copyToClipboard = (text: string) => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
  }
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="container mx-auto px-4">
      <!-- Header -->
      <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">
          🖼️ Verificador de Imágenes
        </h1>
        <p class="text-gray-600">
          Visualiza todas las preguntas con imágenes y detecta cuáles no se están cargando
        </p>
      </div>

      <!-- Estadísticas -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div class="bg-white rounded-lg shadow p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">Total</p>
              <p class="text-2xl font-bold text-gray-800">{{ stats.total }}</p>
            </div>
            <div class="text-3xl">📊</div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">Cargadas</p>
              <p class="text-2xl font-bold text-green-600">{{ stats.loaded }}</p>
            </div>
            <div class="text-3xl">✅</div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">Errores</p>
              <p class="text-2xl font-bold text-red-600">{{ stats.errors }}</p>
            </div>
            <div class="text-3xl">❌</div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">Cargando</p>
              <p class="text-2xl font-bold text-yellow-600">{{ stats.loading }}</p>
            </div>
            <div class="text-3xl">⏳</div>
          </div>
        </div>
      </div>

      <!-- Filtros -->
      <div class="bg-white rounded-lg shadow p-4 mb-6">
        <div class="flex flex-wrap gap-2">
          <button
            @click="filter = 'all'"
            :class="[
              'px-4 py-2 rounded-lg font-medium transition-colors',
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            ]"
          >
            Todas ({{ stats.total }})
          </button>
          <button
            @click="filter = 'success'"
            :class="[
              'px-4 py-2 rounded-lg font-medium transition-colors',
              filter === 'success'
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            ]"
          >
            ✅ Exitosas ({{ stats.loaded }})
          </button>
          <button
            @click="filter = 'error'"
            :class="[
              'px-4 py-2 rounded-lg font-medium transition-colors',
              filter === 'error'
                ? 'bg-red-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            ]"
          >
            ❌ Con Error ({{ stats.errors }})
          </button>
          <button
            @click="filter = 'loading'"
            :class="[
              'px-4 py-2 rounded-lg font-medium transition-colors',
              filter === 'loading'
                ? 'bg-yellow-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            ]"
          >
            ⏳ Cargando ({{ stats.loading }})
          </button>
        </div>
      </div>

      <!-- Lista de preguntas por bloque -->
      <div v-for="(questions, bloque) in questionsByBloque" :key="bloque" class="mb-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span v-if="bloque === 'Señalización Vial'">🚦</span>
          <span v-else-if="bloque === 'El Vehículo'">🚗</span>
          <span v-else-if="bloque === 'Normativa y Reglas'">📋</span>
          <span v-else-if="bloque === 'Seguridad Vial'">🛡️</span>
          <span v-else-if="bloque === 'Infracciones y Sanciones'">⚠️</span>
          {{ bloque }}
          <span class="text-sm text-gray-500">({{ questions.length }})</span>
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="question in questions"
            :key="question.id"
            class="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <!-- Estado de la imagen -->
            <div
              :class="[
                'px-4 py-2 text-sm font-medium flex items-center justify-between',
                imageStatus[question.id] === 'success' ? 'bg-green-100 text-green-800' :
                imageStatus[question.id] === 'error' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              ]"
            >
              <span class="flex items-center gap-2">
                <span v-if="imageStatus[question.id] === 'success'">✅</span>
                <span v-else-if="imageStatus[question.id] === 'error'">❌</span>
                <span v-else>⏳</span>
                {{ question.id }}
              </span>
              <span
                v-if="isExternalUrl(question.imagen)"
                class="text-xs bg-orange-200 text-orange-800 px-2 py-1 rounded"
              >
                Externa
              </span>
              <span
                v-else
                class="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded"
              >
                Local
              </span>
            </div>

            <!-- Imagen -->
            <div class="relative bg-gray-100 h-48 flex items-center justify-center">
              <img
                :src="question.imagen"
                :alt="question.pregunta"
                @load="handleImageLoad(question.id)"
                @error="handleImageError(question.id)"
                class="max-w-full max-h-full object-contain"
              />
              
              <!-- Overlay de error -->
              <div
                v-if="imageStatus[question.id] === 'error'"
                class="absolute inset-0 bg-red-50 bg-opacity-90 flex flex-col items-center justify-center p-4"
              >
                <div class="text-6xl mb-2">🚫</div>
                <p class="text-sm text-red-800 font-medium text-center">
                  Error al cargar imagen
                </p>
              </div>

              <!-- Overlay de carga -->
              <div
                v-if="imageStatus[question.id] === 'loading'"
                class="absolute inset-0 bg-yellow-50 bg-opacity-90 flex flex-col items-center justify-center"
              >
                <div class="animate-spin text-4xl mb-2">⏳</div>
                <p class="text-sm text-yellow-800 font-medium">
                  Cargando...
                </p>
              </div>
            </div>

            <!-- Información de la pregunta -->
            <div class="p-4">
              <p class="text-xs text-gray-500 mb-1">{{ question.tema }}</p>
              <p class="text-sm text-gray-800 font-medium mb-2 line-clamp-2">
                {{ question.pregunta }}
              </p>
              
              <!-- URL de la imagen -->
              <div class="mt-2 p-2 bg-gray-50 rounded">
                <p class="text-xs text-gray-600 font-mono break-all">
                  {{ question.imagen }}
                </p>
              </div>

              <!-- Botón para copiar URL -->
              <button
                @click="copyToClipboard(question.imagen)"
                class="mt-2 w-full px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs rounded transition-colors"
              >
                📋 Copiar URL
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Mensaje si no hay resultados -->
      <div
        v-if="filteredQuestions.length === 0"
        class="bg-white rounded-lg shadow-lg p-12 text-center"
      >
        <div class="text-6xl mb-4">🔍</div>
        <h3 class="text-xl font-bold text-gray-800 mb-2">
          No hay preguntas para mostrar
        </h3>
        <p class="text-gray-600">
          Cambia el filtro para ver otras preguntas
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
