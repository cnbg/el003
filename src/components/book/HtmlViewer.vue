<script setup>
defineProps(['html'])
</script>

<template>
  <div v-html="html" class="ql-editor"></div>
</template>
