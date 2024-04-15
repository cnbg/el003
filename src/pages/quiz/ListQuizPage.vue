<script setup>
import { ref, watch } from 'vue'
import gsap from "gsap"
import QuizCard from '@/components/quiz/QuizCard.vue'
import data from '@/data/quizzes.json'

const quizzes = ref(data)
const search = ref('')

watch(search, () => {
  quizzes.value = data.filter((quiz) => quiz.name.toLowerCase().includes(search.value.toLowerCase()))
})

const beforeEnter = (el) => {
  el.style.transform = "translateY(-60px)"
  el.style.opacity = 0;
}

const enter = (el) => {
  gsap.to(el, {
    duration: 1,
    y: 0,
    opacity: 1,
    delay: el.dataset.index * 0.2,
  })
}
</script>

<template>
  <div class="container">
    <header>
      <h1>Quiz</h1>
      <input v-model.trim="search" type="text" placeholder="Search...">
    </header>
    <hr>
    <div class="options-container">
      <TransitionGroup @before-enter="beforeEnter" @enter="enter" appear>
        <QuizCard v-for="quiz in quizzes" :key="quiz.id" :quiz />
      </TransitionGroup>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1000px;
  margin: 0 auto;
}

header {
  margin-bottom: 20px;
  margin-top: 30px;
  display: flex;
  align-items: center;
  text-transform: uppercase;

  h1 {
    font-weight: bold;
    margin-right: 30px;
  }

  input {
    border: none;
    background: rgba(128, 128, 128, 0.1);
    outline: none;
    color: currentColor;
    padding: 8px;
    font-size: 1.4rem;
  }
}

.options-container {
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
}
</style>
