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

const selectChapter = (e) => {
  if (bookSt.editing) {
    toast.add({severity: 'info', summary: t('general.dont-forget-to-save'), life: 4000})
    return
  }
  const el = e.target
  if (el.classList.contains('selected')) {
    el.classList.remove('selected')
    bookSt.chapter = null
  } else {
    document.querySelector('.selected')?.classList.remove('selected')
    e.target.classList.add('selected')
    bookSt.chapter = props.chapter
  }
}
</script>

<template>
  <div class="cursor-pointer">
    <Button class="m-0 w-full" plain text @click="selectChapter">{{ chapter.type }} {{ chapter.title }}</Button>
    <EditChapter class="ml-2" v-for="subchapter in chapter.chapters" :key="subchapter.id" :chapter="subchapter" />
  </div>
</template>

<style scoped>
</style>
