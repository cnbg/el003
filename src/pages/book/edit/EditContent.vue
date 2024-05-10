<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'
import { useBookStore } from '../../../stores/book'

const emit = defineEmits(['deleteChapter'])

const bookSt = useBookStore()
const {t} = useI18n()
const toast = useToast()
const confirm = useConfirm()
const router = useRouter()
const menu = ref(null)
const htmlEditing = ref(false)
const imageEditing = ref(false)
const videoEditing = ref(false)
const modelEditing = ref(false)
const testEditing = ref(false)
const boardEditing = ref(false)

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

const confirmDeleteDialog = () => {
  confirm.require({
    group: 'headless',
    accept: () => {
      emit('deleteChapter', bookSt.chapter)
      toast.add({severity: 'info', summary: t('general.successfully-deleted'), life: 4000})
    },
    reject: () => { },
  })
}

const editHtml = () => {
  bookSt.editing = true
  htmlEditing.value = true
  imageEditing.value = false
  videoEditing.value = false
  modelEditing.value = false
  testEditing.value = false
  boardEditing.value = false
  bookSt.block = {
    type: 'html',
    content: '',
  }
}
const editImage = () => {
  bookSt.editing = true
  htmlEditing.value = false
  imageEditing.value = true
  videoEditing.value = false
  modelEditing.value = false
  testEditing.value = false
  boardEditing.value = false
  bookSt.block = {
    type: 'image',
    content: '',
  }
}
const editVideo = () => {
  bookSt.editing = true
  htmlEditing.value = false
  imageEditing.value = false
  videoEditing.value = true
  modelEditing.value = false
  testEditing.value = false
  boardEditing.value = false
  bookSt.block = {
    type: 'video',
    content: '',
  }
}
const editModel = () => {
  bookSt.editing = true
  htmlEditing.value = false
  imageEditing.value = false
  videoEditing.value = false
  modelEditing.value = true
  testEditing.value = false
  boardEditing.value = false
  bookSt.block = {
    type: 'model',
    content: '',
  }
}
const editTest = () => {
  bookSt.editing = true
  htmlEditing.value = false
  imageEditing.value = false
  videoEditing.value = false
  modelEditing.value = false
  testEditing.value = true
  boardEditing.value = false
  bookSt.block = {
    type: 'test',
    content: '',
  }
}
const editBoard = () => {
  bookSt.editing = true
  htmlEditing.value = false
  imageEditing.value = false
  videoEditing.value = false
  modelEditing.value = false
  testEditing.value = false
  boardEditing.value = true
  bookSt.block = {
    type: 'test',
    content: '',
  }
}
const saveContent = () => {
  bookSt.editing = false
  htmlEditing.value = false
  imageEditing.value = false
  videoEditing.value = false
  modelEditing.value = false
  testEditing.value = false
  boardEditing.value = false
  if(bookSt.block.content.length > 0) {
    bookSt.chapter.blocks.push(bookSt.block)
  }
  bookSt.block = null
}

const items = ref([
  {
    label: t('general.view-chapter'), icon: 'pi pi-eye', command: () => {
      goto('book-view', {bookId: bookSt.book.id, chapterId: bookSt.chapter?.id})
    },
  },
  {separator: true},
  {label: t('general.add-text'), icon: 'pi pi-file-word', command: () => {editHtml()}},
  {label: t('general.add-image'), icon: 'pi pi-image', command: () => {editImage()}},
  {label: t('general.add-video'), icon: 'pi pi-video', command: () => {editVideo()}},
  {label: t('general.add-model'), icon: 'pi pi-box', command: () => {editModel()}},
  {label: t('general.add-test'), icon: 'pi pi-list', command: () => {editTest()}},
  {label: t('general.add-interactive-board'), icon: 'pi pi-window-maximize', command: () => {editBoard()}},
  {separator: true},
  {label: t('general.delete'), icon: 'pi pi-times', command: () => {confirmDeleteDialog()}},
])
</script>

<template>
  <div>
    <Panel v-if="bookSt.chapter">
      <template #header>
        <div class="m-0">{{ bookSt.chapter.title }}</div>
      </template>
      <template #icons>
        <div v-if="bookSt.editing">
          <button class="p-panel-header-icon p-link flex items-center gap-2" @click="saveContent">
            <span class="pi pi-save"></span>
            <span class="lowercase">{{ $t('general.save') }}</span>
          </button>
        </div>
        <div v-else>
          <button class="p-panel-header-icon p-link" @click="toggle">
            <span class="pi pi-cog"></span>
          </button>
          <Menu ref="menu" id="config_menu" :model="items" popup />
        </div>
      </template>
      <div v-if="bookSt.editing">
        <ContentEditor :chapter="bookSt.chapter" />
      </div>
      <ScrollPanel v-else class="" style="height: calc(100vh - 209px)">
        <ContentViewer :chapter="bookSt.chapter" />
        <ScrollTop target="parent" :threshold="100" icon="pi pi-arrow-up" />
      </ScrollPanel>
    </Panel>
    <Panel v-else>
      <template #header>
        <div>{{ $t('general.select-chapter') }}</div>
      </template>
      <div style="height: calc(100vh - 209px)"></div>
    </Panel>
  </div>
</template>

<style>
.chapter-content div[data-pc-section='content'] {
  padding: 0 !important;
}
</style>
