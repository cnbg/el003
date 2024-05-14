<script setup>
import '@google/model-viewer'
defineProps(['model'])
</script>

<template>
  <div>
    <model-viewer  tone-mapping="neutral" shadow-intensity="1" ar camera-controls touch-action="pan-y"
                   :src="model.path"
                  :alt="model.name"
    class="h-96 mx-auto w-full">
    </model-viewer>
  </div>
</template>
