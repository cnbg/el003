<script setup>
import { useBookStore } from '../../stores/book'

const book = useBookStore()
</script>

<template>
  <TopMenu class="m-3" searchable />

  <div class="mx-3 my-4 grid flex-wrap justify-content-center gap-3">
    <BookCard v-for="book in book.books" :key="book.id" :book="book" />
  </div>

</template>

<style scoped>
</style>
