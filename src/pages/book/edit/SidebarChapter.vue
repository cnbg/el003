<script setup>
import EditChapter from './EditChapter.vue'
import EditChapterDialog from './EditChapterDialog.vue'

import { reactive, ref } from 'vue'
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
  <Panel>
    <template #header>
      <div class="w-full flex align-items-center">
        <h3 class="m-0 flex-auto">{{ $t('general.chapters') }}</h3>
        <Button @click="showChapterDialog"
                v-tooltip="$t('general.add-chapter')" icon="pi pi-plus" text plain />
        <Button v-if="bookSt.chapter"
                @click="showChapterDialog('edit')"
                v-tooltip="$t('general.edit-chapter')" icon="pi pi-pencil" text plain />
      </div>
    </template>
    <div class="flex flex-column">
      <SearchInput @search="onSearch" class="mt-2 mb-3" cl="w-full" />
      <ScrollPanel style="width: 100%; height: calc(100vh - 240px)">
        <EditChapter :chapters="bookSt.getChapters(null)" />
      </ScrollPanel>
    </div>
    <Dialog v-model:visible="chapterDialog" modal :header="$t('general.add-chapter')" class="w-30rem">
      <EditChapterDialog @save="addChapter" :chapter="chapter" @close="chapterDialog = false" />
    </Dialog>
  </Panel>
</template>

<style scoped>
</style>
