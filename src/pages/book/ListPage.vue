<script setup>
import { ref } from 'vue'
import { useBookStore } from '../../stores/book'

const bookSt = useBookStore()
const books = ref(bookSt.books || [])

const search = (s) => {
  books.value = s.length === 0 ? bookSt.books : filter(bookSt.books, s)
}
const filter = (items, s) => {
  return items.filter(i => {
    return i.title.match(new RegExp(s, 'i')) ||
        i.author.name.match(new RegExp(s, 'i')) ||
        i.desc.match(new RegExp(s, 'i')) ||
        i.tags.includes(s)
  })
}
</script>

<template>
  <TopMenu class="p-2" searchable @search="search" />

  <div class="px-3 py-4 m-0 grid flex-wrap justify-content-center column-gap-3 row-gap-5">
    <BookCard v-for="book in books" :key="book.id" :book="book" />
  </div>

</template>

<style scoped>
</style>
