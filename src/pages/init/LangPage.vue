<script setup>
import { useUserStore } from '../../stores/user'

const userSt = useUserStore()
</script>

<template>
  <div class="w-full h-full flex flex-col items-center justify-center gap-6">
    <Button v-for="locale in userSt.locales" :key="locale.key"
            @click="$i18n.locale = locale.key; userSt.setLocale(locale.key)"
            :label="locale.name"
            severity="secondary"
            class="w-40 p-3 text-xl" />
  </div>
</template>
