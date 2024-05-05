<script setup>
import { ref } from 'vue'

const search = ref('')
</script>

<template>
  <IconField iconPosition="left">
    <InputIcon>
      <i class="pi pi-search" />
    </InputIcon>
    <InputText v-model.trim="search"
               @input="$emit('search', search)"
               :placeholder="$t('general.search').concat('...')"
               class="w-full" />
  </IconField>
</template>

<style scoped>
</style>
