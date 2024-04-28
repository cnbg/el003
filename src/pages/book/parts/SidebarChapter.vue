<script setup>
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'
import { useI18n } from 'vue-i18n'
import { v4 as uuid } from 'uuid'
import { useBookStore } from '../../../stores/book'
import SearchInput from '../../../components/common/SearchInput.vue'
import EditChapter from './EditChapter.vue'

const props = defineProps({
  book: {type: Object, required: true},
})

const {t} = useI18n()
const toast = useToast()
const confirm = useConfirm()

const bookSt = useBookStore()
const chapters = ref(props.book.chapters || [])

const addChapter = () => {
  const newChapter = {
    id: uuid(),
    title: '',
    desc: '',
    tags: [],
    date: new Date(),
    cover: '',
    pages: 0,
    items: [],
    chapters: [],
  }

  //bookSt.addChapter(bookId, newChapter)
}
</script>

<template>
  <Panel>
    <template #header>
      <h3 class="m-0">{{ $t('general.chapters') }}</h3>
    </template>
    <div class="p-panel-body flex flex-column">
      <SearchInput class="mt-2 mb-3" cl="w-full" />
      <ScrollPanel style="width: 100%; height: calc(100vh - 300px)">
        <EditChapter v-for="chapter in book.chapters" :key="chapter.id" :chapter="chapter" />
      </ScrollPanel>
    </div>
  </Panel>
</template>

<style scoped>
</style>
