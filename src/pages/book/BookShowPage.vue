<script setup>
import NotFoundPage from '@/pages/error/NotFoundPage.vue'
import MenuBar from '@/components/common/MenuBar.vue'
import { useBookStore } from '@/stores/bookStore'
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useI18n } from 'vue-i18n'

const props = defineProps({bookId: String})
const {t} = useI18n()
const toast = useToast()
const chapter = ref({})
const title = ref('')
const submitted = ref(false)
const createChapterDialog = ref(false)

const expandedKeys = ref({})

const bookStore = useBookStore()
const book = bookStore.findBookById(props.bookId)
const chapters = ref(book.chapters)

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

const hideCreateChapterDialog = () => {
  createChapterDialog.value = false
  submitted.value = false
  title.value = ''
}

const saveChapter = () => {
  submitted.value = true

  if (title.value.trim()) {
    chapter.value.label = title.value
    bookStore.saveChapter(props.bookId, chapter.value)
    createChapterDialog.value = false
    submitted.value = false
    title.value = ''
    chapter.value = {}

    toast.add({severity: 'success', summary: t('general.successfully-saved'), life: 4000})
  }
}

const onChapterSelect = (selectedChapter) => {
  chapter.value = selectedChapter
}
</script>

<template>
  <MenuBar />
  <div v-if="book">
    <h3 class="m-3">{{ book.title }}</h3>
    <hr>
    <div class="grid">
      <div class="col-12 md:col-4 lg:col-3">
        <div v-if="chapters.length > 0">
          <div class="flex flex-wrap gap-2 mx-3 mt-1">
            <Button @click="expandAll" type="button" class="w-2rem h-2rem"
                    icon="pi pi-plus" outlined severity="contrast" />
            <Button @click="collapseAll" type="button" class="w-2rem h-2rem"
                    icon="pi pi-minus" outlined severity="contrast" />
          </div>
          <Tree v-model:expandedKeys="expandedKeys" :value="chapters"
                @nodeSelect="onChapterSelect" selectionMode="single"
                :filter="true" filterMode="lenient" class="w-full" />
        </div>
        <div v-else class="mx-3 mt-2">
          <Button @click="createChapterDialog = true" type="button" icon="pi pi-plus"
                  :label="t('general.add-new-chapter')"
                  severity="contrast" outlined />
        </div>
      </div>
      <div class="col">
        <div v-html="chapter.content"></div>
      </div>
    </div>
  </div>
  <NotFoundPage v-else />

  <Dialog v-model:visible="createChapterDialog" :style="{width: '450px'}"
          :header="t('general.add-chapter')" :modal="true" class="p-fluid">
    <div class="field">
      <label for="name">{{ t('general.title') }}</label>
      <InputText v-model.trim="title" required :invalid="submitted && !title" />
      <small class="p-error" v-if="submitted && !title">{{ t('general.required-field') }}</small>
    </div>
    <template #footer>
      <Button :label="t('general.close')" icon="pi pi-times"
              severity="secondary"
              text @click="hideCreateChapterDialog" />
      <Button :label="t('general.save')" icon="pi pi-check" text @click="saveChapter" />
    </template>
  </Dialog>

  <Toast position="bottom-right" />
</template>

<style scoped>

</style>
