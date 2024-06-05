<template>
  <div class="flex flex-col gap-8">
    <div v-for="(block, index) in chapter.blocks" :key="index">
      <HtmlViewer v-if="block.type === 'html'" :html="block.content" @content-updated="updateContent(index, $event)" />
      <ImageViewer v-else-if="block.type === 'image'" :images="block.content" />
      <VideoViewer v-else-if="block.type === 'video'" :video="block.content" />
      <Model3DViewer v-else-if="block.type === 'model'" :model="block.content" />
      <TestViewer v-else-if="block.type === 'test'" :test="block.content" />
    </div>
  </div>
</template>

<script setup>
import { useBookStore } from '../../stores/book';
import { toRefs } from 'vue';

const bookStore = useBookStore();
const { chapter } = toRefs(bookStore);

const updateContent = (index, updatedContent) => {
  bookStore.updateBlockContent(index, updatedContent);
};
</script>

<style scoped>

</style>
