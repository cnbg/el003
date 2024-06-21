<script setup>
import { ref, onMounted  } from 'vue'

const electron = window.electron;
if (!electron) {
  throw new Error("Electron API not available");
}

const paths = ref({});
const fetchPaths = async () => {
  try {
    paths.value = await electron.getPaths();
  } catch (error) {
    console.error('Error fetching paths:', error);
  }
};

onMounted(() => {
  fetchPaths();
});

const props = defineProps({
  images: {type: Object, default: []},
})
const activeIndex = ref(0)
const displayGallery = ref(false)
const imageClick = (index) => {
  activeIndex.value = index
  displayGallery.value = true
}

const getImageSrc = (imageSrc) => {
  if (paths.value.resourcesPath) {
    return `${paths.value.resourcesPath}${imageSrc}`;
  }
  return imageSrc;
};

</script>

<template>
  <div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      <img v-for="(image, index) in images" :key="index"
           :src="getImageSrc(image.src)"
           @click="imageClick(index)"
           alt="" class="object-cover aspect-video" />
    </div>
    <Galleria :value="images"
              v-model:activeIndex="activeIndex"
              v-model:visible="displayGallery"
              :fullScreen="true"
              :showItemNavigators="images.length > 1"
              :showItemNavigatorsOnHover="images.length > 1"
              :showThumbnails="images.length > 1"
              :numVisible="4" :circular="images.length > 1"
              containerStyle="width 100%">
      <template #item="slotProps">
        <img :src="getImageSrc(slotProps.item.src)" alt="" class="object-contain aspect-video"
             style="width: calc(80vw); height: calc(65vh)" />
      </template>
      <template #thumbnail="slotProps">
          <img :src="getImageSrc(slotProps.item.thumb)" alt="" class="max-h-14 md:max-h-24 object-cover px-2 aspect-video" />
      </template>
      <template #caption="slotProps">
        <div v-if="slotProps.item.title">
          <div class="mb-1 font-bold">{{ slotProps.item.title }}</div>
          <p class="text-sm m-0">{{ slotProps.item.alt }}</p>
        </div>
      </template>
    </Galleria>
  </div>
</template>

<style scoped>

</style>
