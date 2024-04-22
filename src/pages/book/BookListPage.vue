<script setup>
import MenuBar from '@/components/common/MenuBar.vue'

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { FilterMatchMode } from 'primevue/api'
import { useConfirm } from "primevue/useconfirm"
import { useToast } from 'primevue/usetoast'
import { useI18n } from 'vue-i18n'
import { useBookStore } from '@/stores/bookStore'

const bookStore = useBookStore()

const {t} = useI18n()
const router = useRouter()
const confirm = useConfirm()
const toast = useToast()
const cm = ref()
const books = ref()
const selectedBook = ref()
const book = ref({})
const title = ref('')
const submitted = ref(false)
const createBookDialog = ref(false)
const filters = ref({
  global: {value: null, matchMode: FilterMatchMode.CONTAINS},
  // title: {value: null, matchMode: FilterMatchMode.STARTS_WITH},
})
const loading = ref(false)
const menuModel = ref([
  {
    label: t('general.open'), icon: 'pi pi-fw pi-eye', command: () => {
      router.push({name: 'book-show', params: {bookId: selectedBook.value.id}})
    },
  },
  {
    label: t('general.edit'), icon: 'pi pi-fw pi-pen-to-square', command: () => {
      book.value = selectedBook.value
      title.value = book.value.title
      createBookDialog.value = true
    },
  },
  {separator: true},
  {label: t('general.delete'), icon: 'pi pi-fw pi-times', command: () => confirmBookDelete()},
])

const confirmBookDelete = () => {
  confirm.require({
    message: t('general.are-you-sure-to-delete'),
    header: t('general.confirm'),
    icon: 'pi pi-info-circle',
    rejectLabel: t('general.no'),
    acceptLabel: t('general.yes'),
    rejectClass: 'p-button-secondary p-button-outlined',
    acceptClass: 'p-button-danger p-button-outlined',
    accept: () => {
      books.value = books.value.filter((b) => b.id !== selectedBook.value.id)
      toast.add({severity: 'info', summary: t('general.book-deleted'), detail: selectedBook.value.title, life: 4000})
      selectedBook.value = null
    },
    reject: () => {
      selectedBook.value = null
    },
  })
}

const onRowContextMenu = (event) => {
  cm.value.show(event.originalEvent)
}

const hideCreateBookDialog = () => {
  createBookDialog.value = false
  submitted.value = false
  title.value = ''
}

const saveBook = () => {
  submitted.value = true

  if (title.value.trim()) {
    book.value.title = title.value
    bookStore.saveBook(book.value)
    createBookDialog.value = false
    submitted.value = false
    title.value = ''
    book.value = {}

    toast.add({severity: 'success', summary: t('general.successfully-saved'), life: 4000})
  }
}
</script>

<template>
  <MenuBar />

  <div class="flex surface-50 p-2">
    <Button :label="t('general.create-new-book')" icon="pi pi-plus" text severity="success"
            @click="createBookDialog = true" />
    <div class="flex-grow-1"></div>
    <IconField iconPosition="left">
      <InputIcon>
        <i class="pi pi-search" />
      </InputIcon>
      <InputText v-model="filters['global'].value" :placeholder="t('general.search').concat('...')" />
    </IconField>
  </div>


  <DataTable :value="bookStore.books" dataKey="id" v-model:filters="filters"
             v-model:selection="selectedBook" selectionMode="single"
             contextMenu v-model:contextMenuSelection="selectedBook" @rowContextmenu="onRowContextMenu"
             :globalFilterFields="['title']" :loading="loading"
             paginator :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]"
             paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
             tableStyle="min-width: 20rem" class="mx-2"
  >
    <Column field="title"></Column>
  </DataTable>

  <Dialog v-model:visible="createBookDialog" :style="{width: '450px'}"
          :header="t('general.create-book')" :modal="true" class="p-fluid">
    <div class="field">
      <label for="name">{{ t('general.title') }}</label>
      <InputText v-model.trim="title" required :invalid="submitted && !title" />
      <small class="p-error" v-if="submitted && !title">{{ t('general.required-field') }}</small>
    </div>
    <template #footer>
      <Button :label="t('general.close')" icon="pi pi-times"
              severity="secondary"
              text @click="hideCreateBookDialog" />
      <Button :label="t('general.save')" icon="pi pi-check" text @click="saveBook" />
    </template>
  </Dialog>

  <ContextMenu ref="cm" :model="menuModel">
    <template #item="{ item, props }">
      <a v-ripple class="flex align-items-center" v-bind="props.action">
        <span :class="item.icon" />
        <span class="ml-2">{{ item.label }}</span>
        <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
        <span v-if="item.shortcut" class="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{{ item.shortcut }}</span>
        <i v-if="item.items" class="pi pi-angle-right ml-auto"></i>
      </a>
    </template>
  </ContextMenu>

  <ConfirmDialog />

  <Toast position="bottom-right" />
</template>

<style scoped>
</style>
