<script setup>
import { useBookStore } from '../../stores/book'

const bookSt = useBookStore()

const onUpdated = (content) => {
}
</script>

<template>
  <div class="flex flex-col gap-8">
    <div v-for="(block, index) in bookSt.chapter.blocks" :key="index">
      <HtmlEditor v-if="block.type === 'html'" :content="block.content" @updated="onUpdated" />
      <ImageEditor v-else-if="block.type === 'image'" :images="block.content" />
      <VideoEditor v-else-if="block.type === 'video'" :video="block.content" />
      <ModelEditor v-else-if="block.type === 'model'" :model="block.content" />
      <TestEditor v-else-if="block.type === 'test'" :test="block.content" />
      <BoardEditor v-else-if="block.type === 'board'" :board="block.content" />
    </div>
  </div>
</template>

<style scoped>
</style>
