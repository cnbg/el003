<script setup>
import { ref } from 'vue'

defineProps({
  images: {type: Object, default: []},
})

const activeIndex = ref(0)
const displayCustom = ref(false)
const responsiveOptions = ref([
  {breakpoint: '1366px', numVisible: 5},
  {breakpoint: '1024px', numVisible: 4},
  {breakpoint: '768px', numVisible: 3},
  {breakpoint: '560px', numVisible: 2},
  {breakpoint: '320px', numVisible: 1},
])
const imageClick = (index) => {
  activeIndex.value = index
  displayCustom.value = true
}
</script>

<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
      <img v-for="(image, index) in images" :key="index"
           :src="image.src"
           @click="imageClick(index)"
           alt="" class="object-cover" />
    </div>
    <Galleria :value="images"
              v-model:activeIndex="activeIndex"
              v-model:visible="displayCustom"
              :fullScreen="true"
              :responsiveOptions="responsiveOptions"
              :showItemNavigators="images.length > 1"
              :showItemNavigatorsOnHover="images.length > 1"
              :showThumbnails="images.length > 1"
              :numVisible="4" :circular="images.length > 1"
              containerStyle="width 100%">
      <template #item="slotProps">
        <img :src="slotProps.item.src" alt=""
             style="width:100%; min-height: 70vh; max-height: 90vh; object-fit: contain" />
      </template>
      <template #thumbnail="slotProps">
        <div class="grid grid-nogutter justify-content-center">
          <img :src="slotProps.item.thumb" alt=""
               style="height: 90px; width: 100%; object-fit: cover; display: block" />
        </div>
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
