<script setup>
import { useToast } from 'primevue/usetoast'
import { useI18n } from 'vue-i18n'
import { useBookStore } from '../../../stores/book'

const props = defineProps({
  chapters: {type: Array, default: []},
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
      <div class="flex align-items-center justify-content-between py-1">

        <Button class="m-0 p-0 w-full text-left align-items-center justify-content-start"
                :class="{'ml-5': chapter.items === 0}"
                :severity="bookSt.chapter?.id === chapter.id ? 'success' : ''"
                :plain="bookSt.chapter?.id !== chapter.id"
                :text="bookSt.chapter?.id !== chapter.id"
                :outlined="bookSt.chapter?.id === chapter.id">
          <i v-if="chapter.items > 0"
             @click="chapter.expanded = !chapter.expanded"
             class="p-2 text-xs pi"
             :class="chapter.expanded ? 'pi-chevron-down' : 'pi-chevron-right'"></i>
          <span @click="select(chapter)"
                class="w-full px-2 pt-1 pb-2"
          >{{ chapter.title }}</span>
        </Button>

      </div>
      <div v-if="chapter.items > 0" v-show="chapter.expanded" class="ml-4">
        <EditChapter :chapters="bookSt.getChapters(chapter.id)" />
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
