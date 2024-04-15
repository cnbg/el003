<script setup>
import { computed, ref } from 'vue'
import data from '@/data/quizzes.json'
import NotFound from '@/pages/error/404Page.vue'
import QuizHeader from '@/components/quiz/QuizHeader.vue'
import QuizQuestion from '@/components/quiz/QuizQuestion.vue'
import QuizResult from '@/components/quiz/QuizResult.vue'

const props = defineProps({
  id: String,
})

const quiz = data.find(q => q.id == props.id)
const currentQuestionIndex = ref(0);
const numberOfCorrectAnswers = ref(0)
const showResults = ref(false)

const questionStatus = computed(() => `${currentQuestionIndex.value}/${quiz.questions.length}`)
const barPercentage = computed(() => `${currentQuestionIndex.value / quiz.questions.length * 100}%`)

const onOptionSelected = (isCorrect) => {
  if (isCorrect) {
    numberOfCorrectAnswers.value++;
  }

  if (quiz.questions.length - 1 === currentQuestionIndex.value) {
    showResults.value = true
  }

  currentQuestionIndex.value++;
}
</script>

<template>
  <div v-if="quiz">
    <QuizHeader
        :questionStatus="questionStatus"
        :barPercentage="barPercentage"
    />
    <div>
      <QuizResult
          v-if="showResults"
          :quizQuestionLength="quiz.questions.length"
          :numberOfCorrectAnswers="numberOfCorrectAnswers"
      />
      <QuizQuestion
          v-else
          :question="quiz.questions[currentQuestionIndex]"
          @selectOption="onOptionSelected"
      />
    </div>
  </div>
  <NotFound v-else />
</template>

<style scoped>
</style>
