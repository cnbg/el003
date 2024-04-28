<script setup>
defineProps({
  chapter: {type: Object, required: true},
})
</script>

<template>
  <div>
    <h2 class="mt-0 mb-3">{{ chapter.title }}</h2>
    <div v-for="item in chapter.items" :key="item.id">

      <div v-if="item.type === 'html'" v-html="item.content" class="ql-editor mb-5"></div>

      <BookGallery v-else-if="item.type === 'img'" :images="item.content" />

      <ModelViewer v-else-if="item.type === '3d'" :src="item.content" />

    </div>
    <BookChapter class="ml-4 mt-5" v-for="subchapter in chapter.chapters" :key="subchapter.id" :chapter="subchapter" />
  </div>
</template>

<style scoped>
</style>
