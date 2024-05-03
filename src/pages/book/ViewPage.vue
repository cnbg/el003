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
  {
    separator: true,
  },
  {
    label: t('general.export'), icon: 'pi pi-globe', command: () => {
      const html = document.querySelector('#html-content').innerHTML
      exportPdf(html)
    },
  },
])
</script>

<template>
  <div>
    <div v-if="bookSt.book" id="html-content" class="py-2 px-4 mx-auto sm:w-full md:w-10 lg:w-9 xl:w-8">
      <div class="pt-2 flex align-items-start justify-content-between gap-3">
        <h1 class="m-0">{{ bookSt.book.title }}</h1>
        <Button @click="toggleMenu" icon="pi pi-cog" text plain class="mt-1" />
        <Menu ref="menu" :model="panelMenuItems" popup />
      </div>
      <Divider class="my-5" />
      <BookChapter v-for="chapter in bookSt.book.chapters" :key="chapter.id" :chapter="chapter" />
    </div>
    <NotFoundPage v-else />
  </div>
</template>

<style scoped>
</style>
