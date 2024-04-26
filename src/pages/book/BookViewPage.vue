<script setup>
import BookChapters from './BookChapters.vue'

import { useBookStore } from '../../stores/bookStore'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useToast } from 'primevue/usetoast'
import NotFoundPage from '../error/NotFoundPage.vue';

const props = defineProps({bookId: String})
const router = useRouter()
const {t} = useI18n()
const toast = useToast()
const menu = ref(null)

const bookStore = useBookStore()
const book = bookStore.findBookById(props.bookId)

const panelMenuItems = ref([
  {
    label: t('general.back-to-editing'), icon: 'pi pi-arrow-left', command: () => {
      router.push({name: 'book-edit', params: {bookId: props.bookId}})
    },
  },
  {
    label: t('general.export'), icon: 'pi pi-hammer', command: () => {
      toast.add({severity: 'info', summary: t('general.under-development'), life: 4000})
    },
  },
])

const toggleMenu = (event) => {
  menu.value.toggle(event)
}
</script>

<template>
  <div v-if="book" class="my-5 mx-auto w-8">
    <div class="flex flex-wrap justify-content-between">
      <h1 class="m-0">{{ book.title }}</h1>
      <button class="p-panel-header-icon p-link" @click="toggleMenu">
        <span class="pi pi-cog"></span>
      </button>
      <Menu ref="menu" :model="panelMenuItems" popup />
    </div>
    <BookChapters v-for="chapter in book.chapters" :key="chapter.key" :chapter="chapter" />
  </div>
  <NotFoundPage v-else />
</template>

<style scoped>
</style>
