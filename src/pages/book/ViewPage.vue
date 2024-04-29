<script setup>
import { ref } from 'vue'
import { jsPDF as JsPDF } from 'jspdf'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useToast } from 'primevue/usetoast'
import { useBookStore } from '../../stores/book'

const props = defineProps({
  bookId: {type: String, required: true},
})

const router = useRouter()
const {t} = useI18n()
const toast = useToast()
const menu = ref(null)

const bookSt = useBookStore()
const book = bookSt.findById(props.bookId)

const toggleMenu = (event) => {
  menu.value.toggle(event)
}

const doc = new JsPDF({
  orientation: "landscape",
  unit: "in",
  format: [4, 2]
})

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
      doc.text("Hello world!", 1, 1);
      doc.save(`${book.title}.pdf`)
      toast.add({severity: 'info', summary: t('general.under-development'), life: 4000})
    },
  },
])
</script>

<template>
  <TopMenu class="p-2" />

  <div v-if="book" id="html-content" class="py-2 px-4 mx-auto sm:w-full md:w-10 lg:w-9 xl:w-8">
    <div class="pt-2 flex align-items-start justify-content-between gap-3">
      <h1 class="m-0">{{ book.title }}</h1>
      <Button @click="toggleMenu" icon="pi pi-cog" text plain class="mt-1" />
      <Menu ref="menu" :model="panelMenuItems" popup />
    </div>
    <Divider class="my-5" />
    <BookChapter v-for="chapter in book.chapters" :key="chapter.id" :chapter="chapter" />
  </div>
  <NotFoundPage v-else />

</template>

<style scoped>
</style>
