<script setup>
import NotFoundPage from '../../pages/error/NotFoundPage.vue'
import { useBookStore } from '../../stores/bookStore'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { useI18n } from 'vue-i18n'
import { v4 as uuidv4 } from 'uuid'

const props = defineProps({bookId: String})
const router = useRouter()
const {t} = useI18n()
const treeMenu = ref(null)
const contentMenu = ref(null)
const toast = useToast()
const chapter = ref({})
const editing = ref(false)
const selectedKey = ref(null)
const expandedKeys = ref({})

const bookStore = useBookStore()
const book = bookStore.findBookById(props.bookId)
const chapters = ref(book?.chapters || [])

const treePanelMenuItems = ref([
  {label: t('general.add-chapter'), icon: 'pi pi-plus', command: () => {addChapter()}},
  {label: t('general.add-sub-chapter'), icon: 'pi pi-plus', command: () => {addSubChapter()}},
  {separator: true},
  {label: t('general.view-book'), icon: 'pi pi-eye', command: () => {goToViewBook()}},
])

const contentPanelMenuItems = ref([
  {label: t('general.save'), icon: 'pi pi-save', command: () => {saveChapter()}},
  {label: t('general.edit'), icon: 'pi pi-pencil', command: () => {editChapter()}},
  {separator: true},
  {label: t('general.delete'), icon: 'pi pi-times', command: () => {deleteChapter()}},
])

const goToViewBook = () => {
  if (!editing.value) {
    router.push({name: 'book-view', params: {bookId: props.bookId}})
  } else {
    toast.add({severity: 'error', summary: t('general.dont-forget-to-save'), life: 4000})
  }
}

const toggleTreeMenu = (event) => {
  treeMenu.value.toggle(event)
}

const toggleContentMenu = (event) => {
  contentMenu.value.toggle(event)
}

const editChapter = () => {
  if (!editing.value) {
    editing.value = true
  }
}

const saveChapter = () => {
  if (editing.value) {
    editing.value = false
    toast.add({severity: 'success', summary: t('general.successfully-saved'), life: 4000})
  }
}

const addChapter = () => {
  const newChapter = {
    key: uuidv4(),
    label: t('general.new-chapter'),
    content: '',
  }

  if (book.chapters === undefined) {
    book.chapters = []
  }

  selectedKey.value = newChapter.key
  chapter.value = newChapter
  book.chapters.push(newChapter)
}

const addSubChapter = () => {
  const newChapter = {
    key: uuidv4(),
    label: t('general.new-chapter'),
    content: '',
  }

  if (selectedKey.value) {
    if (chapter.value.children === undefined) {
      chapter.value.children = []
    }

    chapter.value.children.push(newChapter)
    expandedKeys.value = {...expandedKeys.value, ...selectedKey.value}
  } else {
    toast.add({severity: 'error', summary: t('general.select-chapter'), life: 4000})
  }
}

const deleteChapter = () => {
  if (!editing.value) {
    toast.add({severity: 'info', summary: t('general.under-development'), life: 4000})
  } else {
    toast.add({severity: 'error', summary: t('general.dont-forget-to-save'), life: 4000})
  }
}

const expandAll = () => {
  for (let chapter of chapters.value) expandChapter(chapter)
  expandedKeys.value = {...expandedKeys.value}
}

const collapseAll = () => {
  expandedKeys.value = {}
}

const expandChapter = (chapter) => {
  if (chapter.children && chapter.children.length) {
    expandedKeys.value[chapter.key] = true

    for (let child of chapter.children) {
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
  <TopMenu />
  <div v-if="book">
    <div class="flex flex-wrap align-items-center justify-content-between gap-3 px-3 py-2">
      <div class="col">
        <h3 class="m-0">{{ book.title }}</h3>
      </div>
      <div class="col-fixed text-right w-max">
        <RouterLink :to="{name:'book-list'}" class="flex align-items-center">
          <span class="pi pi-chevron-left"></span>
          {{ t('general.back') }}
        </RouterLink>
      </div>
    </div>
    <div class="grid mx-1">
      <div class="col-12 md:col-5 lg:col-4 xl:col-3">
        <Panel class="max-height">
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
      </div>
      <div class="col">
        <Panel v-if="selectedKey" class="max-height">
          <template #header>
            <InputText v-if="editing" v-model="chapter.label" class="w-11" />
            <h3 v-else class="mt-1 mb-2">{{ chapter.label }}</h3>
          </template>
          <template #icons>
            <button class="p-panel-header-icon p-link" @click="toggleContentMenu">
              <span class="pi pi-cog"></span>
            </button>
            <Menu ref="contentMenu" :model="contentPanelMenuItems" popup />
          </template>
          <Editor v-if="editing" v-model="chapter.content" editorStyle="min-height: calc(100vh - 310px)"></Editor>
          <p v-else v-html="chapter.content" class="ql-editor my-1"></p>
        </Panel>
        <Panel v-else class="max-height" />
      </div>
    </div>
  </div>
  <NotFoundPage v-else />
</template>

<style scoped>
.p-panel.max-height {
  min-height: calc(100vh - 120px);
  margin-bottom: 10px;
}
</style>
