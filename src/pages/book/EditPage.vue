<script setup>
import EditHeader from './edit/EditHeader.vue'
import SidebarChapter from './edit/SidebarChapter.vue'
import EditContent from './edit/EditContent.vue'

import { useBookStore } from '../../stores/book'

const props = defineProps({
  bookId: {type: String, required: true},
  chapterId: {type: String},
})

const bookSt = useBookStore()
bookSt.getBook(props.bookId, props.chapterId)
</script>

<template>
  <div v-if="bookSt.book">
    <EditHeader class="p-2" />
    <div class="flex flew-wrap flex-col md:flex-row gap-2 px-2 pb-2">
      <SidebarChapter class="flex-none w-full md:w-1/2 lg:w-1/3 xl:w-1/4" />
      <EditContent class="grow" />
    </div>
  </div>
  <NotFoundPage v-else />
</template>

<style scoped>
</style>
