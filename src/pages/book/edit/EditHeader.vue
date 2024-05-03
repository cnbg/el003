<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'
import { formatDate } from '../../../lib/date'
import { useBookStore } from '../../../stores/book'

const bookSt = useBookStore()
const {t} = useI18n()
const toast = useToast()
const confirm = useConfirm()
const router = useRouter()
const menu = ref(null)

const toggle = (event) => {
  menu.value.toggle(event)
}

const goto = (route, params = {}) => {
  if(bookSt.editing) {
    toast.add({severity: 'error', summary: t('general.dont-forget-to-save'), life: 4000})
  } else {
    router.push({name: route, params: params})
  }
}

const dev = () => {
  toast.add({severity: 'info', summary: t('general.under-development'), life: 4000})
}

const confirmDialog = () => {
  confirm.require({
    message: t('general.are-you-sure-to-delete'),
    header: t('general.confirm'),
    icon: 'pi pi-exclamation-triangle',
    class: 'justify-content-between',
    rejectProps: {
      label: t('general.no').toLowerCase(),
      severity: 'secondary',
      outlined: true,
      class: 'mr-3',
    },
    acceptProps: {
      label: t('general.yes').toLowerCase(),
      severity: 'danger',
    },
    accept: async () => {
      await bookSt.deleteBook(bookSt.book.id)
      toast.add({severity: 'info', summary: t('general.book-deleted'), life: 4000})
      router.push({name: 'book-list'})
    },
    reject: () => { },
  })
}

const items = ref([
  {label: t('general.book-list'), icon: 'pi pi-list', command: () => {goto('book-list')}},
  {separator: true},
  {
    label: t('general.view-book'), icon: 'pi pi-eye', command: () => {
      goto('book-view', {bookId: bookSt.book.id})
    },
  },
  {separator: true},
  {label: t('general.delete'), icon: 'pi pi-times', command: () => {confirmDialog()}},
])
</script>

<template>
  <Panel toggleable :collapsed="true">
    <template #header>
      <h2 class="m-0">{{ bookSt.book.title }}</h2>
    </template>
    <template #footer>
      <div class="flex flex-wrap align-items-center justify-content-between gap-3">
        <div class="flex align-items-center gap-2">
          <Button @click="dev" icon="pi pi-user" severity="secondary" rounded text></Button>
          <Button @click="dev" icon="pi pi-bookmark" severity="secondary" rounded text></Button>
        </div>
        <span class="p-text-secondary">{{ formatDate(bookSt.book.date) }}</span>
      </div>
    </template>
    <template #icons>
      <button class="p-panel-header-icon p-link mr-2" @click="toggle">
        <span class="pi pi-cog"></span>
      </button>
      <Menu ref="menu" id="config_menu" :model="items" popup />
    </template>
    <h5 class="my-3 text-300">{{ bookSt.book.desc }}</h5>
    <div v-if="bookSt.book.tags?.length > 0">
      <Chip v-for="tag in bookSt.book.tags" :label="tag" class="text-xs mt-2 mr-2 px-3 pt-1 pb-2" />
    </div>
  </Panel>
</template>

<style scoped>
</style>
