<script setup>
import EditHeader from './edit/EditHeader.vue'
import SidebarChapter from './edit/SidebarChapter.vue'
import EditContent from './edit/EditContent.vue'

import { useBookStore } from '../../stores/book'

const props = defineProps({
  bookId: {type: String, required: true},
})

const bookSt = useBookStore()
bookSt.findById(props.bookId)
</script>

<template>
  <div>
    <div v-if="bookSt.book">
      <EditHeader class="p-2" />
      <div class="flex px-2 pb-2 gap-2">
        <SidebarChapter class="flex-none w-96" />
        <EditContent class="grow" />
      </div>
    </div>
    <NotFoundPage v-else />
  </div>
</template>

<style scoped>
</style>
