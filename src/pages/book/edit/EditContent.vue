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
const textEditing = ref(false)
const imageEditing = ref(false)
const videoEditing = ref(false)

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
      toast.add({severity: 'info', summary: t('general.chapter-deleted'), life: 4000})
    },
    reject: () => { },
  })
}

const editText = () => {
  bookSt.editing = true
  textEditing.value = true
  bookSt.block = {
    type: 'html',
    content: '',
  }
}
const editImage = () => {
  bookSt.editing = true
  imageEditing.value = true
  bookSt.block = {
    type: 'image',
    content: '',
  }
}
const editVideo = () => {
  bookSt.editing = true
  videoEditing.value = true
  bookSt.block = {
    type: 'video',
    content: '',
  }
}
const saveContent = () => {
  bookSt.editing = false
  textEditing.value = false
  imageEditing.value = false
  videoEditing.value = false
  bookSt.chapter.blocks.push(bookSt.block)
  bookSt.block = null
}

const items = ref([
  {label: t('general.add-text'), icon: 'pi pi-file-word', command: () => {editText()}},
  {separator: true},
  {label: t('general.add-image'), icon: 'pi pi-image', command: () => {editImage()}},
  {label: t('general.add-video'), icon: 'pi pi-video', command: () => {editVideo()}},
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
          <button class="p-panel-header-icon p-link" @click="saveContent">
            <span class="pi pi-save"></span>
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
        <HtmlEditor v-if="textEditing === true" />
        <ImageEditor v-else-if="imageEditing === true" :images="bookSt.chapter" />
        <VideoEditor v-else-if="videoEditing === true" :chapter="bookSt.chapter" />
      </div>
      <ScrollPanel v-else class="w-full" style="height: calc(100vh - 186px)">
        <div class="flex flex-col gap-8">
          <div v-for="(block, index) in bookSt.chapter.blocks" :key="index">
            <div v-if="block.type === 'html'" v-html="block.content" class="ql-editor"></div>
            <ImageViewer v-else-if="block.type === 'image'" :images="block.content" />
            <VideoViewer v-else-if="block.type === 'video'" :vidoe="block.content" />
          </div>
        </div>
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
