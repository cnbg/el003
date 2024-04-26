<script setup>
import { useUserStore } from '../../stores/userStore'
const user = useUserStore()
</script>

<template>
  <div class="w-full h-full flex flex-column align-items-center justify-content-center gap-3">

    <Button @click="$i18n.locale = 'kg'; user.setLocale('kg')"
            label="кыргызча"
            severity="contrast"
            class="w-15rem p-3 text-xl" />

    <Button @click="$i18n.locale = 'ru'; user.setLocale('ru')"
            label="русский"
            severity="contrast"
            class="w-15rem p-3 text-xl" />

  </div>
</template>
