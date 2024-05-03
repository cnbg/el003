<script setup>
import { useBookStore } from '../../../stores/book'

const bookSt = useBookStore()
</script>

<template>
  <Panel>
    <template #header>
      <div class="w-full flex flex-column just-content-start">
        <h2 class="m-0">{{ bookSt.chapter.title }}</h2>
        <h5 v-if="bookSt.chapter.desc" class="text-300 my-3">{{ bookSt.chapter.desc }}</h5>
        <div v-if="bookSt.chapter.tags?.length > 0">
          <Chip v-for="tag in bookSt.chapter.tags" :label="tag" class="text-xs mt-2 mr-2 px-3 pt-1 pb-2" />
        </div>
      </div>
    </template>
    <Divider />
    <div v-if="bookSt.chapter.type === 'html'">
      <Editor v-if="bookSt.editing" v-model="bookSt.chapter.content" editorStyle="min-height: 250px"></Editor>
      <p v-else v-html="bookSt.chapter.content" class="ql-editor my-1"></p>
    </div>
    <div v-else-if="bookSt.chapter.type === 'img'">
      <div v-if="bookSt.editing">image editor</div>
      <BookGallery v-else :images="bookSt.chapter.images" class="my-1"></BookGallery>
    </div>
  </Panel>
</template>

<style scoped>

</style>
