<script setup>
defineProps(['chapter'])
</script>

<template>
  <h4 class="mt-5">{{ chapter.label }}</h4>
  <p v-html="chapter.content"></p>
  <BookChapters v-for="chapter in chapter.children" :key="chapter.key" :chapter="chapter"/>
</template>

<style scoped>
</style>
