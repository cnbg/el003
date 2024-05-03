<script setup>
import EditChapter from './EditChapter.vue'
import EditChapterDialog from './EditChapterDialog.vue'

import { ref } from 'vue'
import { useBookStore } from '../../../stores/book'

const bookSt = useBookStore()
const chapters = ref(bookSt.book.chapters || [])
const showCreateChapterDialog = ref(false)

const search = (s) => {
  chapters.value = bookSt.book.chapters?.filter(c => c.title.match(new RegExp(s, 'i'))) || []
}

const addChapter = (chapter) => {
  if (bookSt.book) {
    bookSt.addChapter(bookSt.book.id, chapter)
    chapters.value = bookSt.book.chapters
    showCreateChapterDialog.value = false
  }
}
</script>

<template>
  <div>
    <Panel>
      <template #header>
        <div class="w-full flex align-items-center justify-content-between gap-3">
          <h3 class="m-0">{{ $t('general.chapters') }}</h3>
          <Button @click="showCreateChapterDialog = true" v-tooltip="$t('general.add-chapter')" icon="pi pi-plus" text plain />
        </div>
      </template>
      <div class="flex flex-column">
        <SearchInput @search="search" class="mt-2 mb-3" cl="w-full" />
        <ScrollPanel v-if="chapters" style="width: 100%; height: calc(100vh - 300px)">
          <EditChapter v-for="chapter in chapters" :key="chapter.id" :chapter="chapter" />
        </ScrollPanel>
      </div>
    </Panel>
    <Dialog v-model:visible="showCreateChapterDialog"
            modal :header="$t('general.add-chapter')" class="w-30rem">
      <EditChapterDialog @save="addChapter" @close="showCreateChapterDialog = false" />
    </Dialog>
  </div>
</template>

<style scoped>
</style>
