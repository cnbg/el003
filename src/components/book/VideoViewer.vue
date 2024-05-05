<script setup>
defineProps({
  video: {type: Object, default: null},
})
</script>

<template>
  <div class="text-2xl">
    {{ $t('general.under-development').concat('...') }}
  </div>
</template>

<style scoped>

</style>
