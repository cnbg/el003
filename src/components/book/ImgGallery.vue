<script setup>
import { ref } from 'vue'

defineProps({
  images: {type: Object, default: []},
})

const responsiveOptions = ref([
  {breakpoint: '1024px', numVisible: 4},
  {breakpoint: '768px', numVisible: 3},
  {breakpoint: '560px', numVisible: 2},
  {breakpoint: '320px', numVisible: 1},
])
</script>

<template>
  <Galleria :value="images"
            :responsiveOptions="responsiveOptions"
            :showItemNavigators="images.length > 1"
            :showItemNavigatorsOnHover="true"
            :showThumbnails="images.length > 1"
            :numVisible="5" :circular="true"
            containerStyle="width 100%">
    <template #item="slotProps">
      <img :src="slotProps.item.src" alt=""
           style="height:350px; width:100%; object-fit: contain; display: block" />
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
</template>

<style scoped>

</style>
