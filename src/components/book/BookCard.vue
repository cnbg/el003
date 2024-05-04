<script setup>
defineProps({
  book: {type: Object, required: true},
})
</script>

<template>
  <Card @click="$router.push({name: 'book-edit', params: {bookId: book.id}})"
        class="w-80 cursor-pointer overflow-hidden hover:shadow-xl">
    <template #header>
      <img alt="" :src="book.cover" class="h-72 w-full" style="object-fit: cover" />
    </template>
    <template #title>
      <div>{{ book.title }}</div>
    </template>
    <template #subtitle>
      <div>{{ book.author.name }}</div>
    </template>
    <template #content>
      <div v-html="book.desc"></div>
    </template>
    <template #footer>
      <div v-if="book.tags.length > 0" class="flex flex-wrap gap-x-2 gap-y-3">
        <Chip v-for="tag in book.tags" :label="tag" class="text-sm" />
      </div>
    </template>
  </Card>
</template>
