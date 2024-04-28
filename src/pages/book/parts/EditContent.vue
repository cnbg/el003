<script setup>
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useBookStore } from '../../../stores/book'

const bookSt = useBookStore()

const props = defineProps({
  book: {type: Object, required: true},
})

const {t} = useI18n()
const menu = ref(null)

const menuItems = ref([
  {label: t('general.save'), icon: 'pi pi-save', command: () => {}},
  {separator: true},
  {label: t('general.edit'), icon: 'pi pi-pencil', command: () => {bookSt.editing = true}},
])

const toggleMenu = (event) => {
  menu.value.toggle(event)
}
</script>

<template>
  <Panel>
    <template #header>
      <InputText v-if="bookSt.editing" v-model="bookSt.chapter.title" class="w-11" />
      <h3 v-else class="mt-1 mb-2">{{ bookSt.chapter.title }}</h3>
    </template>
    <template #icons>
      <Button @click="toggleMenu" icon="pi pi-cog" plain text />
      <Menu ref="menu" :model="menuItems" popup />
    </template>
    <Editor v-if="bookSt.editing" v-model="bookSt.chapter.content" editorStyle="min-height: calc(100vh - 310px)"></Editor>
    <p v-else v-html="bookSt.chapter.content" class="ql-editor my-1"></p>
  </Panel>
</template>

<style scoped>

</style>
