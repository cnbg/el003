<script setup>
import { useToast } from 'primevue/usetoast'
import { useI18n } from 'vue-i18n'
import { useBookStore } from '../../../stores/book'

const props = defineProps({
  chapter: {type: Object, required: true},
})

const toast = useToast()
const {t} = useI18n()
const bookSt = useBookStore()

const select = (chapterId) => {
  if(bookSt.editing) {
    toast.add({severity: 'error', summary: t('general.dont-forget-to-save'), life: 4000})
  } else {
    bookSt.chapter = chapterId === bookSt.chapter?.id ? null : props.chapter
  }
}
</script>

<template>
  <div>
    <Button :label="`${chapter.title}`"
            @click="select(chapter.id)"
            class="m-0 w-full text-left justify-content-start"
            :severity="bookSt.chapter?.id === chapter.id ? 'success' : ''"
            :plain="bookSt.chapter?.id !== chapter.id"
            :text="bookSt.chapter?.id !== chapter.id"
            :outlined="bookSt.chapter?.id === chapter.id" />
    <EditChapter class="ml-3" v-for="subchapter in chapter.chapters" :key="subchapter.id" :chapter="subchapter" />
  </div>
</template>

<style scoped>
</style>
