<script setup>
import MenuBar from '@/components/common/MenuBar.vue'

defineProps({
  bookId: String
})
</script>

<template>
  <MenuBar />
  <hr>
  <h1>book show page {{ bookId }}</h1>
</template>

<style scoped>

</style>
