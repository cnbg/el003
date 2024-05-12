<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  book: {type: Object, required: true},
})

const router = useRouter()

const openBookEdit = () => {
  router.push({
    name: 'book-edit', params: {
      bookId: props.book.id,
    },
  })
}
</script>

<template>
  <Card class="w-80 overflow-hidden hover:shadow-lg hover:shadow-surface-300 dark:hover:shadow-surface-700">
    <template #header>
      <img @click="openBookEdit" alt="" :src="book.cover" class="h-96 cursor-pointer w-full object-cover" />
    </template>
    <template #title>
      <div @click="openBookEdit" class="cursor-pointer">{{ book.title }}</div>
    </template>
    <template #subtitle>
      <div class="flex justify-between items-start gap-3">
        <span>{{ book.author.name }}</span>
        <i @click="router.push({name: 'book-create', params: {bookId: book.id}})"
           class="flex-none pi pi-pencil cursor-pointer mt-1" v-tooltip.top="$t('general.edit')" />
      </div>
    </template>
    <template #footer>
      <div v-if="book.tags.length > 0" class="flex flex-wrap gap-x-2 gap-y-3">
        <Chip v-for="tag in book.tags" :label="tag" class="text-sm" />
      </div>
    </template>
  </Card>
</template>
