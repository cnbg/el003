<script setup>
import { onMounted, ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'
import { useI18n } from 'vue-i18n'
import { v4 as uuid } from 'uuid'
import { useBookStore } from '../../../stores/book'

const props = defineProps({
  book: {type: Object, required: true},
  edit: {type: Boolean, default: false},
})

const {t} = useI18n()
const treeMenu = ref(null)
const contentMenu = ref(null)
const toast = useToast()
const confirm = useConfirm()
const chapter = ref({})
const editing = ref(false)
const selectedKey = ref(null)
const expandedKeys = ref({})

const bookSt = useBookStore()
const chapters = ref(props.book.chapters || [])

const treePanelMenuItems = ref([
  {label: t('general.add-chapter'), icon: 'pi pi-plus', command: () => {addChapter()}},
  {separator: true},
  {label: t('general.add-sub-chapter'), icon: 'pi pi-plus', command: () => {addSubChapter()}},
])

const contentPanelMenuItems = ref([
  {label: t('general.save'), icon: 'pi pi-save', command: () => {saveChapter()}},
  {separator: true},
  {label: t('general.edit'), icon: 'pi pi-pencil', command: () => {editChapter()}},
])


const toggleTreeMenu = (event) => {
  treeMenu.value.toggle(event)
}

const toggleContentMenu = (event) => {
  contentMenu.value.toggle(event)
}

const editChapter = () => {
  if(!editing.value) {
    editing.value = true
  }
}

const saveChapter = () => {
  if(editing.value) {
    editing.value = false
    toast.add({severity: 'success', summary: t('general.successfully-saved'), life: 4000})
  }
}

const addChapter = () => {
  const newChapter = {
    key: uuid(),
    label: t('general.new-chapter'),
    content: '',
  }

  if(book.chapters === undefined) {
    book.chapters = []
  }

  selectedKey.value = newChapter.key
  chapter.value = newChapter
  book.chapters.push(newChapter)
}

const addSubChapter = () => {
  const newChapter = {
    key: uuid(),
    label: t('general.new-chapter'),
    content: '',
  }

  if(selectedKey.value) {
    if(chapter.value.children === undefined) {
      chapter.value.children = []
    }

    chapter.value.children.push(newChapter)
    expandedKeys.value = {...expandedKeys.value, ...selectedKey.value}
  } else {
    toast.add({severity: 'error', summary: t('general.select-chapter'), life: 4000})
  }
}

const deleteChapter = () => {
  if(!editing.value) {
    toast.add({severity: 'info', summary: t('general.under-development'), life: 4000})
  } else {
    toast.add({severity: 'error', summary: t('general.dont-forget-to-save'), life: 4000})
  }
}

const expandAll = () => {
  for(let chapter of chapters.value) expandChapter(chapter)
  expandedKeys.value = {...expandedKeys.value}
}

const collapseAll = () => {
  expandedKeys.value = {}
}

const expandChapter = (chapter) => {
  if(chapter.children && chapter.children.length) {
    expandedKeys.value[chapter.key] = true

    for(let child of chapter.children) {
      expandChapter(child)
    }
  }
}

const onChapterSelect = (selectedChapter) => {
  chapter.value = selectedChapter
}

onMounted(() => {
  expandAll()
})
</script>

<template>
  <Panel>
    <template #header>
      <h4 class="m-0">{{ t('general.chapters') }}</h4>
    </template>
    <template #icons>
      <button class="p-panel-header-icon p-link" @click="toggleTreeMenu">
        <span class="pi pi-cog"></span>
      </button>
      <Menu ref="treeMenu" :model="treePanelMenuItems" popup />
    </template>
    <Tree v-model:expandedKeys="expandedKeys" :value="chapters"
          v-model:selectionKeys="selectedKey"
          @nodeSelect="onChapterSelect" selectionMode="single"
          :filter="true" filterMode="lenient" class="w-full p-0" />
  </Panel>
</template>

<style scoped>

</style>
