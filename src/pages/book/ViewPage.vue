<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useBookStore } from '../../stores/book'
import { exportPdf } from '../../lib/exportpdf'

const props = defineProps({
  bookId: {type: String, required: true},
})

const router = useRouter()
const {t} = useI18n()
const menu = ref(null)

const bookSt = useBookStore()
bookSt.findById(props.bookId)

const toggleMenu = (event) => {
  menu.value.toggle(event)
}

const panelMenuItems = ref([
  {
    label: t('general.edit'), icon: 'pi pi-pencil', command: () => {
      router.push({name: 'book-edit', params: {bookId: props.bookId}})
    },
  },
  {separator: true},
  {label: t('general.send'), icon: 'pi pi-send', command: () => {},},
  {separator: true},
  {
    label: t('general.download-as-pdf'), icon: 'pi pi-download', command: () => {
      const html = document.querySelector('#html-content').innerHTML
      exportPdf(html)
    },
  },
])
</script>

<template>
  <div class="md:py-6 md:px-2 ">
    <div v-if="bookSt.book" id="html-content"
         class="bg-white p-8 mx-auto sm:w-full md:w-4/5 lg:w-3/4 xl:w-3/5">
      <div class="flex items-center gap-3">
        <div class="text-2xl m-0 flex-auto">{{ bookSt.book.title }}</div>
        <Button @click="toggleMenu" icon="pi pi-cog" text plain />
        <Menu ref="menu" :model="panelMenuItems" popup />
      </div>
      <Divider class="my-5" />
      <ContentViewer v-for="chapter in bookSt.book.chapters" :key="chapter.id" :chapter="chapter" />
    </div>
    <NotFoundPage v-else />
  </div>
</template>

<style scoped>
</style>
