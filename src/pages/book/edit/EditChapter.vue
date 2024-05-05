<script setup>
import { useToast } from 'primevue/usetoast'
import { useI18n } from 'vue-i18n'
import { useBookStore } from '../../../stores/book'

const props = defineProps({
  chapters: {type: Array, default: []},
  search: {type: String, default: ''},
})

const toast = useToast()
const {t} = useI18n()
const bookSt = useBookStore()

const select = (chapter) => {
  if(bookSt.editing) {
    toast.add({severity: 'error', summary: t('general.dont-forget-to-save'), life: 4000})
  } else {
    bookSt.chapter = chapter.id === bookSt.chapter?.id ? null : chapter
  }
}
</script>

<template>
  <div>
    <div v-for="chapter in chapters" :key="chapter.id">
      <Button class="btn-chapter my-1 mx-0 w-full flex items-center focus:ring-0"
              :severity="bookSt.chapter?.id === chapter.id ? 'success' : ''"
              :text="bookSt.chapter?.id !== chapter.id"
              size="small"
              :outlined="bookSt.chapter?.id === chapter.id">
        <i v-if="chapter.items > 0"
           @click="chapter.expanded = !chapter.expanded"
           class="p-2 pi"
           :class="chapter.expanded ? 'pi-chevron-down' : 'pi-chevron-right'"></i>
        <span @click="select(chapter)"
              class="flex-auto py-1 px-1 text-left"
              :class="{'ml-8': chapter.items === 0}"
        >{{ chapter.title }}</span>
      </Button>
      <div v-if="chapter.items > 0" v-show="chapter.expanded" class="ml-4">
        <EditChapter :chapters="bookSt.getChapters(chapter.id)" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn-chapter {
  padding: 0;
  outline: none !important;
}
</style>
