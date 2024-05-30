<script setup>
defineProps(['html'])
</script>

<template>
  <div v-html="html" class="tiny-editor"></div>
</template>
