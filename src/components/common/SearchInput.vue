<script setup>
import { ref } from 'vue'

defineProps(['cl'])
const emit = defineEmits(['search'])

const search = ref('')

const onSearch = () => {
  emit('search', search.value)
}
</script>

<template>
  <IconField iconPosition="left">
    <InputIcon>
      <i class="pi pi-search" />
    </InputIcon>
    <InputText v-model.trim="search"
               @input="onSearch"
               :placeholder="$t('general.search').concat('...')"
               :class="cl" />
  </IconField>
</template>

<style scoped>
</style>
