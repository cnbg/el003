<script setup>
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
</script>

<template>
  <div class="w-full h-full flex align-items-center justify-content-center">
    <div style="width: 200px">
      <Button @click="$i18n.locale = 'kg'; userStore.setLocale('kg')"
              label="кыргызча"
              severity="contrast"
              class="mb-3 w-full" />
      <Button @click="$i18n.locale = 'ru'; userStore.setLocale('ru')"
              label="русский"
              severity="contrast"
              class="w-full" />
    </div>
  </div>
</template>
