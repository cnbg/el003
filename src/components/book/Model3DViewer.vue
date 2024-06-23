<script setup>
import '@google/model-viewer'
import { ref, onMounted  } from 'vue'
defineProps(['model'])

const electron = window.electron;
if (!electron) {
  throw new Error("Electron API not available");
}

const paths = ref({});
const fetchPaths = async () => {
  try {
    const response = await electron.getPaths();
    if (response.success) {
      paths.value = response;
    } else {
      console.error('Error fetching paths:', response.message);
    }
  } catch (error) {
    console.error('Error fetching paths:', error);
  }
};

const getModelSrc = (modelSrc) => {
  if (modelSrc.startsWith('file://')) {
    return modelSrc;
  }

  if (paths.value.resourcesPath) {
    return `file://${paths.value.resourcesPath.replace(/\\/g, '/')}/${modelSrc.replace(/\\/g, '/')}`;
  }

  return modelSrc;
};


onMounted(() => {
  fetchPaths();
});

onMounted(() => {
  fetchPaths();
});
</script>

<template>
  <div>
    <model-viewer  tone-mapping="neutral" shadow-intensity="1" ar camera-controls touch-action="pan-y" :src="getModelSrc(model.path)" :alt="model.name"
    class="h-96 mx-auto w-full">
    </model-viewer>
  </div>
</template>
