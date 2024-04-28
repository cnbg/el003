<script setup>
import { ref } from 'vue'
import { useUserStore } from "../../stores/user"

const userSt = useUserStore()
const darkMode = ref(userSt.darkMode)

const setDarkMode = async () => {
  await userSt.setDarkMode(darkMode.value)
}
</script>

<template>
  <TopMenu class="m-3" />
  <div class="m-4">
    <div class="flex align-items-center">
      <span class="w-10rem">{{ $t('general.language') }}</span>
      <Button @click="$i18n.locale = 'kg'; userSt.setLocale('kg')"
              label="кыргызча"
              :severity="userSt.locale === 'kg' ? 'success' : 'contrast'"
              :outlined="userSt.locale !== 'kg'"
              :icon="userSt.locale === 'kg' ? 'pi pi-check' : ''"
              class="w-8rem mr-2 text-sm" />
      <Button @click="$i18n.locale = 'ru'; userSt.setLocale('ru')"
              label="русский"
              :severity="userSt.locale === 'ru' ? 'success' : 'contrast'"
              :outlined="userSt.locale !== 'ru'"
              :icon="userSt.locale === 'ru' ? 'pi pi-check' : ''"
              class="w-8rem text-sm" />
    </div>
    <div class="mt-5 flex align-items-center">
      <span class="w-10rem">{{ $t('general.night-mode') }}</span>
      <InputSwitch v-model="darkMode" @change="setDarkMode" />
    </div>
    <div class="mt-5 flex align-items-center">
      <span class="w-10rem">{{ $t('general.name') }}</span>
      <span>{{ userSt.name }}</span>
    </div>
    <div class="mt-5 flex align-items-center">
      <span class="w-10rem">{{ $t('general.email') }}</span>
      <span>{{ userSt.email }}</span>
    </div>
  </div>
</template>
