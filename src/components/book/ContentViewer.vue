<script setup>
defineProps(['chapter'])
</script>

<template>
  <div class="flex flex-col gap-8">
    <div v-for="(block, index) in chapter?.blocks" :key="index">
      <HtmlViewer v-if="block.type === 'html'" :html="block.content" />
      <ImageViewer v-else-if="block.type === 'image'" :images="block.content" />
      <VideoViewer v-else-if="block.type === 'video'" :video="block.content" />
      <ModelViewer v-else-if="block.type === 'model'" :model="block.content" />
      <TestViewer v-else-if="block.type === 'test'" :test="block.content" />
      <BoardViewer v-else-if="block.type === 'board'" :test="block.content" />
    </div>
  </div>
</template>

<style scoped>
</style>
