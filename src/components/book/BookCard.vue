<script setup>
defineProps({
  book: {type: Object, required: true},
})
</script>

<template>
  <Card @click="$router.push({name: 'book-edit', params: {bookId: book.id}})"
        class="w-18rem cursor-pointer overflow-hidden shadow-1 hover:shadow-3">
    <template #header>
      <img alt="user header" :src="book.cover" class="h-15rem w-full" style="object-fit: cover" />
    </template>
    <template #title>
      <h5 class="m-0">{{ book.title }}</h5>
    </template>
    <template #subtitle>
      <h5 class="m-0">{{ book.author.name }}</h5>
    </template>
    <template #content>
      <p class="m-0" v-html="book.desc"></p>
    </template>
    <template #footer>
      <div v-if="book.tags" class="m-0">
        <Divider />
        <Chip v-for="tag in book.tags" :label="tag" class="text-xs mt-2 mr-2 px-3 pt-1 pb-2" />
      </div>
    </template>
  </Card>
</template>
