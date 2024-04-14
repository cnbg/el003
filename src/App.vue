<script setup>
import AccordionComponent from '@/components/AccordionComponent.vue'

const date = new Date()
</script>

<template>
  <AccordionComponent />
  <Calendar v-model="date" inline showWeek />
</template>

<style scoped>
</style>
