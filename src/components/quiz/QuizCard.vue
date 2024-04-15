<script setup>
import { useRouter } from 'vue-router'

const props = defineProps(['quiz'])
const router = useRouter()
const navigateToQuiz = () => {
  router.push({name: 'quiz-show', params: {id: props.quiz.id}})
}
</script>

<template>
  <div class="card" @click="navigateToQuiz">
    <img :src="quiz.img" alt="">
    <div class="card-text">
      <h2>{{ quiz.name }}</h2>
      <p>{{ quiz.questions.length }} questions</p>
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 300px;
  overflow: hidden;
  border-radius: 4px;
  box-shadow: 0 0 4px 0 #cccccc;
  margin-bottom: 30px;
  margin-right: 20px;
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 8px 0 #cccccc;
  }

  img {
    width: 100%;
    height: 150px;
    margin: 0;
  }

  .card-text {
    margin: 5px 10px 20px 10px;

    h2 {
      font-weight: bold;
    }
  }
}
</style>
