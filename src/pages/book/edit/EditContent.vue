<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'
import { useBookStore } from '../../../stores/book'
import HtmlEditor from '../../../components/book/HtmlEditor.vue'

const bookSt = useBookStore()
const {t} = useI18n()
const toast = useToast()
const confirm = useConfirm()
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

const dev = () => {
  toast.add({severity: 'info', summary: t('general.under-development'), life: 4000})
}

const confirmDialog = () => {
  confirm.require({
    header: t('general.confirm'),
    message: t('general.are-you-sure-to-delete'),
    icon: 'pi pi-exclamation-triangle mr-4',
    rejectClass: 'p-button-sm',
    acceptClass: 'p-button-outlined p-button-sm',
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
  {label: t('general.add-text'), icon: 'pi pi-file-word', command: () => {editHtml()}},
  {separator: true},
  {label: t('general.add-image'), icon: 'pi pi-image', command: () => {editImage()}},
  {label: t('general.add-video'), icon: 'pi pi-video', command: () => {editVideo()}},
  {label: t('general.add-model'), icon: 'pi pi-box', command: () => {editModel()}},
  {label: t('general.add-test'), icon: 'pi pi-list', command: () => {editTest()}},
  {label: t('general.add-interactive-board'), icon: 'pi pi-window-maximize', command: () => {editBoard()}},
  {separator: true},
  {label: t('general.delete'), icon: 'pi pi-times', command: () => {confirmDialog()}},
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
        <HtmlEditor v-if="htmlEditing === true" />
        <ImageEditor v-else-if="imageEditing === true" :chapter="bookSt.chapter" />
        <VideoEditor v-else-if="videoEditing === true" :chapter="bookSt.chapter" />
        <ModelEditor v-else-if="modelEditing === true" :chapter="bookSt.chapter" />
        <TestEditor v-else-if="testEditing === true" :chapter="bookSt.chapter" />
        <BoardEditor v-else-if="boardEditing === true" :chapter="bookSt.chapter" />
      </div>
      <ScrollPanel v-else class="w-full" style="height: calc(100vh - 186px)">
        <ContentViewer :chapter="bookSt.chapter" />
      </ScrollPanel>
    </Panel>
    <Card v-else style="height: calc(100vh - 95px)" />
  </div>
</template>

<style>
.chapter-content div[data-pc-section='content'] {
  padding: 0 !important;
}
</style>
