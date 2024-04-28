<script setup>
import { useBookStore } from '../../../stores/book'

const props = defineProps({
  chapter: {type: Object, required: true},
})

const bookSt = useBookStore()

const selectChapter = (e) => {
  const el = e.target
  if(el.classList.contains('selected')) {
    el.classList.remove('selected')
    bookSt.chapter = {}
  } else {
    document.querySelector('.selected')?.classList.remove('selected')
    e.target.classList.add('selected')
    bookSt.chapter = props.chapter
  }
}
</script>

<template>
  <div class="cursor-pointer">
    <h4 class="my-3" @click="selectChapter">{{ chapter.title }}</h4>
    <EditChapter class="ml-2" v-for="subchapter in chapter.chapters" :key="subchapter.id" :chapter="subchapter" />
  </div>
</template>

<style scoped>
.selected {
  background-color: #0e8174;
}
</style>
