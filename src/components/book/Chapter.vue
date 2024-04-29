<script setup>
defineProps({
  chapter: {type: Object, required: true},
})
</script>

<template>
  <div>
    <h2 class="mt-0 mb-3">{{ chapter.title }}</h2>

    <div v-if="chapter.type === 'html'" v-html="chapter.content" class="ql-editor mb-5"></div>

    <BookGallery v-else-if="chapter.type === 'img'" :images="chapter.images" />

    <ModelViewer v-else-if="chapter.type === '3d'" :src="chapter.content" />

    <BookChapter class="ml-4 mt-5" v-for="subchapter in chapter.chapters" :key="subchapter.id" :chapter="subchapter" />
  </div>
</template>

<style scoped>
</style>
