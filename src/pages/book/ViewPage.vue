<script setup>
import { useBookStore } from '../../stores/book'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useToast } from 'primevue/usetoast'
import NotFoundPage from '../error/NotFoundPage.vue';

const props = defineProps({
  bookId: {type: String, required: true},
})
const router = useRouter()
const {t} = useI18n()
const toast = useToast()
const menu = ref(null)

const bookStore = useBookStore()
const book = bookStore.findById(props.bookId)

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
  <TopMenu class="p-2" />

  <div v-if="book" class="py-2 px-4 mx-auto sm:w-full md:w-10 lg:w-8 xl:w-7">
    <div class="flex justify-content-between">
      <h2 class="m-0">{{ book.title }}</h2>
      <Button class="p-panel-header-icon p-link" text plain @click="toggleMenu">
        <span class="pi pi-cog"></span>
      </Button>
      <Menu ref="menu" :model="panelMenuItems" popup />
    </div>
    <BookChapter v-for="chapter in book.chapters" :key="chapter.key" :chapter="chapter" />
  </div>
  <NotFoundPage v-else />
</template>

<style scoped>
</style>
