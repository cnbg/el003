<script setup>
import LangPage from '../pages/init/LangPage.vue'
import LoginPage from '../pages/init/EmailPage.vue'
import BookListPage from './book/ListPage.vue'
import { useUserStore } from "../stores/user"

const user = useUserStore()
</script>

<template>
  <LangPage v-if="!user.locale" />
  <LoginPage v-else-if="!user.name || !user.email" />
  <BookListPage v-else />
</template>
