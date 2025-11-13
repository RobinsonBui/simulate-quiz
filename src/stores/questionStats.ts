import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

interface QuestionStat {
  questionId: string
  attempts: number
  correctAnswers: number
  lastAttempt: number // timestamp
  difficulty: 'easy' | 'medium' | 'hard' // calculado basado en el rendimiento
}

export const useQuestionStatsStore = defineStore('questionStats', () => {
  // Estado persistente en localStorage
  const questionStats = ref<Record<string, QuestionStat>>({})
  
  // Cargar datos del localStorage al iniciar
  const loadFromStorage = () => {
    const stored = localStorage.getItem('questionStats')
    if (stored) {
      try {
        questionStats.value = JSON.parse(stored)
      } catch (e) {
        console.error('Error loading question stats:', e)
        questionStats.value = {}
      }
    }
  }
  
  // Guardar en localStorage
  const saveToStorage = () => {
    localStorage.setItem('questionStats', JSON.stringify(questionStats.value))
  }
  
  // Registrar un intento de pregunta
  const recordAttempt = (questionId: string, isCorrect: boolean) => {
    if (!questionStats.value[questionId]) {
      questionStats.value[questionId] = {
        questionId,
        attempts: 0,
        correctAnswers: 0,
        lastAttempt: Date.now(),
        difficulty: 'medium'
      }
    }
    
    const stat = questionStats.value[questionId]
    stat.attempts++
    if (isCorrect) {
      stat.correctAnswers++
    }
    stat.lastAttempt = Date.now()
    
    // Calcular dificultad basada en el rendimiento
    const successRate = stat.correctAnswers / stat.attempts
    if (successRate >= 0.8 && stat.attempts >= 3) {
      stat.difficulty = 'easy'
    } else if (successRate <= 0.4 && stat.attempts >= 2) {
      stat.difficulty = 'hard'
    } else {
      stat.difficulty = 'medium'
    }
    
    saveToStorage()
  }
  
  // Obtener estadísticas de una pregunta
  const getQuestionStat = (questionId: string): QuestionStat | null => {
    return questionStats.value[questionId] || null
  }
  
  // Calcular peso de selección para una pregunta
  // Preguntas fáciles tienen menor peso, difíciles tienen mayor peso
  const getSelectionWeight = (questionId: string): number => {
    const stat = questionStats.value[questionId]
    
    if (!stat || stat.attempts === 0) {
      return 1.0 // Preguntas nuevas tienen peso normal
    }
    
    const successRate = stat.correctAnswers / stat.attempts
    const daysSinceLastAttempt = (Date.now() - stat.lastAttempt) / (1000 * 60 * 60 * 24)
    
    let weight = 1.0
    
    // Ajustar peso según tasa de éxito
    if (successRate >= 0.9 && stat.attempts >= 3) {
      // Muy fácil para el usuario - reducir mucho la probabilidad
      weight = 0.2
    } else if (successRate >= 0.7 && stat.attempts >= 2) {
      // Fácil - reducir probabilidad
      weight = 0.5
    } else if (successRate <= 0.3 && stat.attempts >= 2) {
      // Muy difícil - aumentar mucho la probabilidad
      weight = 2.5
    } else if (successRate <= 0.5) {
      // Difícil - aumentar probabilidad
      weight = 1.5
    }
    
    // Aumentar peso si hace mucho que no se ve (para refrescar conocimiento)
    if (daysSinceLastAttempt > 30) {
      weight *= 1.5
    } else if (daysSinceLastAttempt > 14) {
      weight *= 1.2
    }
    
    return weight
  }
  
  // Obtener preguntas por dificultad
  const getQuestionsByDifficulty = (difficulty: 'easy' | 'medium' | 'hard'): string[] => {
    return Object.values(questionStats.value)
      .filter(stat => stat.difficulty === difficulty)
      .map(stat => stat.questionId)
  }
  
  // Estadísticas generales
  const totalQuestionsAttempted = computed(() => {
    return Object.keys(questionStats.value).length
  })
  
  const averageSuccessRate = computed(() => {
    const stats = Object.values(questionStats.value)
    if (stats.length === 0) return 0
    
    const totalRate = stats.reduce((sum, stat) => {
      return sum + (stat.correctAnswers / stat.attempts)
    }, 0)
    
    return (totalRate / stats.length) * 100
  })
  
  const easyQuestionsCount = computed(() => {
    return Object.values(questionStats.value)
      .filter(stat => stat.difficulty === 'easy').length
  })
  
  const hardQuestionsCount = computed(() => {
    return Object.values(questionStats.value)
      .filter(stat => stat.difficulty === 'hard').length
  })
  
  // Resetear estadísticas
  const resetStats = () => {
    questionStats.value = {}
    saveToStorage()
  }
  
  // Resetear estadísticas de una pregunta específica
  const resetQuestionStat = (questionId: string) => {
    delete questionStats.value[questionId]
    saveToStorage()
  }
  
  // Inicializar
  loadFromStorage()
  
  return {
    questionStats,
    recordAttempt,
    getQuestionStat,
    getSelectionWeight,
    getQuestionsByDifficulty,
    totalQuestionsAttempted,
    averageSuccessRate,
    easyQuestionsCount,
    hardQuestionsCount,
    resetStats,
    resetQuestionStat
  }
})
