<script setup>
import HomePage from '../pages/HomePage.vue'
import LangPage from '../pages/init/LangPage.vue'
import LoginPage from '../pages/init/EmailPage.vue'

import { storeToRefs } from 'pinia'
import { useUserStore } from "../stores/user"

const userStore = useUserStore()
const {locale, email} = storeToRefs(userStore)
</script>

<template>
  <LangPage v-if="!locale" />
  <LoginPage v-else-if="!email" />
  <HomePage v-else />
</template>
