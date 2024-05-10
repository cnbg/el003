<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  book: {type: Object, required: true},
})

const router = useRouter()

const chapterId = props.book.chapters[0]?.id
const openBookEdit = () => {
  router.push({
    name: 'book-edit', params: {
      bookId: props.book.id,
      chapterId: chapterId,
    },
  })
}
</script>

<template>
  <Card @click="openBookEdit"
        class="w-80 cursor-pointer overflow-hidden hover:shadow-lg hover:shadow-surface-300 dark:hover:shadow-surface-700">
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
