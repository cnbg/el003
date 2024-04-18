<script setup>
import LangPage from "./pages/user/LangPage.vue"
import LoginPage from "./pages/auth/LoginPage.vue"
import HomePage from "./pages/HomePage.vue"

import { ref, watch } from 'vue'
import { useUserStore } from "./stores"

const userStore = useUserStore()

const isLangSet = ref(false)
const isEmailSet = ref(false)

userStore.syncLocalData()

// watch()
</script>

<template>
  <LangPage v-if="!isLangSet" />
  <LoginPage v-else-if="!isEmailSet" />
  <HomePage v-else />
</template>
