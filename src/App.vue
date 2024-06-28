<script setup>
import { ref } from 'vue'
import { useUserStore } from "./stores/user"
import { slk } from 'survey-core';
const userSt = useUserStore()
const darkMode = ref(userSt.darkMode)
const locale = ref('kg')
const setDarkMode = async () => {
  await userSt.setDarkMode(darkMode.value)
}
import './locale/survey/settings'
slk(
    "OTEzNTJlNTMtYTI2MC00OWU3LWIwOWQtOTg4ODJlYjEwNzgyOzE9MjAyNS0wNC0xMiwyPTIwMjUtMDQtMTIsND0yMDI1LTA0LTEy"
);

</script>

<template>
  <RouterView />
  <Toast />
  <ConfirmationDialog />
  <DynamicDialog />
  <div class="flex items-center gap-3 bottom-8 left-7 fixed z-50">
    <InputSwitch v-model="darkMode" @change="setDarkMode" />
    <div class="flex items-center gap-1 hidden">
      <Button @click="$i18n.locale = 'kg'" label="kg" outlined size="small"
              :severity="$i18n.locale === 'kg' ? 'success' : 'secondary'" />
      <Button @click="$i18n.locale = 'ru'" label="ru" outlined size="small"
              :severity="$i18n.locale === 'ru' ? 'success' : 'secondary'" />
    </div>
  </div>
</template>
