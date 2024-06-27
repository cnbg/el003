<template>
  <div class="flex flex-col gap-8">
    <div v-for="(block, index) in chapter?.blocks" :key="index">
      <HtmlViewer v-if="block.type === 'html'" :html="block.content" @content-updated="updateContent(index, $event)" />
      <ImageViewer v-else-if="block.type === 'image'" :images="block.content" @image-updated="updateImage(index, $event)" @image-deleted="deleteImage(index, $event)" />
      <VideoViewer v-else-if="block.type === 'video'" :video="block.content" @content-updated="updateVideo(index, $event)" @delete-video="deleteVideo(index)" />
      <Model3DViewer v-else-if="block.type === 'model'" :model="block.content" @content-updated="updateModel(index, $event)" @delete-model="deleteModel(index)" />
      <TestViewer v-else-if="block.type === 'test'" :test="block.content" />
    </div>
  </div>
</template>

<script setup>
defineProps(['chapter'])
import { useBookStore } from '../../stores/book'
const bookStore = useBookStore()

const updateContent = (index, updatedContent) => {
  bookStore.updateBlockContent(index, updatedContent);
};

const updateImage = (index, { index: imageIndex, image }) => {
  bookStore.updateImageBlock(index, imageIndex, image);
};

const deleteImage = (index, imageIndex) => {
  bookStore.deleteImageBlock(index, imageIndex);
};

const updateVideo = (index, updatedVideo) => {
  bookStore.updateVideoBlock(index, updatedVideo);
};

const deleteVideo = (index) => {
  bookStore.deleteVideoBlock(index);
};

const updateModel = (index, updatedModel) => {
  bookStore.updateModelBlock(index, updatedModel);
};

const deleteModel = (index) => {
  bookStore.deleteModelBlock(index);
};
</script>

<style scoped>
</style>
