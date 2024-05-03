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

      <div class="px-2 py-1">
        <EditHeader class="m-0" />
      </div>

      <div class="grid grid-nogutter p-2 gap-2">
        <div class="col-12 md:col-5 lg:col-4 xl:col-3">
          <SidebarChapter class="max-height m-0" />
        </div>
        <div class="col">
          <EditContent v-if="bookSt.chapter" class="max-height" />
          <Panel v-else class="m-0 max-height" />
        </div>
      </div>
    </div>
    <NotFoundPage v-else />
  </div>
</template>

<style scoped>
.p-panel.max-height {
  min-height: calc(100vh - 85px);
}
</style>
