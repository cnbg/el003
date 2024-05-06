<script setup>
import EditChapter from './EditChapter.vue'
import EditChapterDialog from './EditChapterDialog.vue'

import { ref } from 'vue'
import { useBookStore } from '../../../stores/book'

const bookSt = useBookStore()
const chapter = ref(bookSt.chapterObj())
const status = ref('new')
const search = ref('')
const chapterDialog = ref(false)

const onSearch = (s) => {
  search.value = s
}

const addChapter = (chapter) => {
  if(status.value === 'new') {
    bookSt.addChapter(chapter)
  }
  chapterDialog.value = false
}

const showChapterDialog = (s = 'new') => {
  if(s === 'edit' && bookSt.chapter) {
    status.value = 'edit'
    chapter.value = bookSt.chapter
  } else {
    status.value = 'new'
    chapter.value = bookSt.chapterObj()
  }

  chapterDialog.value = true
}
</script>

<template>
  <div>
    <Panel>
      <template #header>
        <div>{{ $t('general.chapters') }}</div>
      </template>
      <template #icons>
        <button @click="showChapterDialog"
                class="p-panel-header-icon p-link"
                v-tooltip="$t('general.add-chapter')">
          <i class="pi pi-plus"></i>
        </button>
        <button v-if="bookSt.chapter"
                class="p-panel-header-icon p-link ml-6"
                @click="showChapterDialog('edit')"
                v-tooltip="$t('general.edit-chapter')">
          <i class="pi pi-pencil"></i>
        </button>
      </template>
      <div class="flex flex-col">
        <SearchInput @search="onSearch" />
        <ScrollPanel class="w-full mt-5" style="height: calc(100vh - 245px)">
          <EditChapter :chapters="bookSt.getChapters(null, search)" :search="search" />
        </ScrollPanel>
      </div>
      <Dialog v-model:visible="chapterDialog" modal :header="$t('general.add-chapter')" class="w-30rem">
        <EditChapterDialog @save="addChapter" :chapter="chapter" @close="chapterDialog = false" />
      </Dialog>
    </Panel>
  </div>
</template>

<style scoped>
</style>
