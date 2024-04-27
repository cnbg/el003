<script setup>
import { formatDate } from '../../lib/date'

defineProps({
  book: Object,
})
</script>

<template>
  <Card @click="$router.push({name: 'book-view', params: {bookId: book.id}})"
        class="w-18rem overflow-hidden cursor-pointer">
    <template #header>
      <img alt="user header" :src="book.cover" class="h-16rem w-full" style="object-fit: cover" />
    </template>
    <template #title>
      <h5 class="m-0 h-5rem overflow-hidden">{{ book.title }}</h5>
    </template>
    <template #subtitle>
      <h5 class="m-0 h-2rem overflow-hidden">{{ book.author.name }}</h5>
    </template>
    <template #content>
      <p class="m-0 h-10rem overflow-hidden" v-html="book.desc"></p>
    </template>
    <template #footer>
      <h5 class="m-0 p-card-subtitle text-right">{{ formatDate(book.date) }}</h5>
    </template>
  </Card>
</template>
