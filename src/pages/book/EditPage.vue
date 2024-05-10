<script setup>
import { useRouter } from 'vue-router'

import EditHeader from './edit/EditHeader.vue'
import SidebarChapter from './edit/SidebarChapter.vue'
import EditContent from './edit/EditContent.vue'

import { useBookStore } from '../../stores/book'

const props = defineProps({
  bookId: {type: String, required: true},
  chapterId: {type: String},
})

const router = useRouter()
const bookSt = useBookStore()
bookSt.getBook(props.bookId, props.chapterId)

const onDeleteChapter = (chapter) => {
  if(bookSt.deleteChapter(chapter)) {
    router.push({name: 'book-edit', params: {bookId: bookSt.book.id}})
  }
}
</script>

<template>
  <div>
    <div v-if="bookSt.book">
      <EditHeader class="p-2" />
      <div class="flex flew-wrap flex-col md:flex-row gap-3 px-2 pb-2">
        <SidebarChapter class="flex-none w-full md:w-1/2 lg:w-1/3 xl:w-1/4" />
        <EditContent class="grow" @deleteChapter="onDeleteChapter" />
      </div>
    </div>
    <NotFoundPage v-else />
  </div>
</template>

<style scoped>
</style>
