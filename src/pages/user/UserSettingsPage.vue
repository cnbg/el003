<script setup>
import MenuBar from '@/components/common/MenuBar.vue'

import { ref, watch } from 'vue'
import { useUserStore } from "@/stores/userStore"

const userStore = useUserStore()
userStore.syncSettings()

const locales = [{key: 'kg', name: 'Кыргызча'}, {key: 'ru', name: 'Русский'}]
const locale = ref(locales.find(l => l.key === userStore.locale))

const darkMode = ref(userStore.darkMode)

watch(locale, (val) => {
  userStore.setLocale(val.key)
  window.location.reload()
})

watch(darkMode, (val) => {
  userStore.setDarkMode(val)
  window.location.reload()
})
</script>

<template>
  <MenuBar />
  <div class="m-4">
    <div class="flex align-items-center">
      <span class="mr-3 w-9rem">{{ $t('general.language') }}</span>
      <SelectButton v-model="locale" :options="locales" dataKey="key" optionLabel="name" />
    </div>
    <div class="mt-5 flex align-items-center">
      <span class="mr-3 w-9rem">{{ $t('general.night-mode') }}</span>
      <InputSwitch v-model="darkMode" />
    </div>
    <div class="mt-5 flex align-items-center">
      <span class="mr-3 w-9rem">{{ $t('general.email') }}</span>
      <span>{{ userStore.email }}</span>
    </div>
  </div>
</template>
