<script setup>
import EditChapter from './EditChapter.vue'
import EditChapterDialog from './EditChapterDialog.vue'
import { ref } from 'vue'
import { useBookStore } from '../../../stores/book'

const bookSt = useBookStore()
const chapter = ref({})
const showEditDialog = ref(false)

const addChapterBtn = () => {
  chapter.value = bookSt.chapterObj({
    parent: bookSt.chapter?.id ?? null,
  })
  showEditDialog.value = true
}
const editChapterBtn = () => {
  chapter.value = {...bookSt.chapter}
  showEditDialog.value = true
}
const onCloseDialog = async (ch = {}) => {
  if (ch.id) {
    await bookSt.updateChapter(ch)
  } else {
    await bookSt.saveChapter(ch)
  }

  chapter.value = {}
  showEditDialog.value = false
}
</script>

<template>
  <div>
    <Panel>
      <template #header>
        <div>{{ $t('general.chapters') }}</div>
      </template>
      <template #icons>
        <button @click="addChapterBtn"
                class="p-panel-header-icon p-link"
                v-tooltip="$t('general.add-chapter')">
          <i class="pi pi-plus"></i>
        </button>
        <button v-if="bookSt.chapter"
                @click="editChapterBtn"
                class="p-panel-header-icon p-link ml-6"
                v-tooltip="$t('general.edit-chapter')">
          <i class="pi pi-pencil"></i>
        </button>
      </template>
      <div class="flex flex-col">
        <ScrollPanel class="w-full" style="height: calc(100vh - 210px)">
          <EditChapter :chapters="bookSt.getChapters(null)" />
          <ScrollTop target="parent" :threshold="100" icon="pi pi-arrow-up" />
        </ScrollPanel>
      </div>
      <Dialog v-model:visible="showEditDialog" modal :header="$t('general.add-chapter')" class="w-30rem">
        <EditChapterDialog :chapter="chapter" @close="onCloseDialog" />
      </Dialog>
    </Panel>
  </div>
</template>

<style scoped>
</style>
