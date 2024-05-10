<script setup>
import { ref } from 'vue'
import { useUserStore } from "./stores/user"

const userSt = useUserStore()
const darkMode = ref(userSt.darkMode)

const setDarkMode = async () => {
  await userSt.setDarkMode(darkMode.value)
}
</script>

<template>
  <RouterView />
  <Toast />
  <ConfirmationDialog />
  <DynamicDialog />
  <div class="bottom-8 left-7 fixed z-50">
    <InputSwitch v-model="darkMode" @change="setDarkMode" />
  </div>
</template>
