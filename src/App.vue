<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
  <ConfirmDialog />
  <Toast position="bottom-right" />
</template>
