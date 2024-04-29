<script setup>
import { useBookStore } from '../../../stores/book'

const bookSt = useBookStore()

const props = defineProps({
  book: {type: Object, required: true},
})
</script>

<template>
  <Panel>
    <template #header>
      <InputText v-if="bookSt.editing" v-model="bookSt.chapter.title" class="w-full" />
      <h3 v-else class="mt-1 mb-2">{{ bookSt.chapter.title }}</h3>
    </template>
    <template #icons>
      <Button v-if="bookSt.editing" @click="bookSt.editing = false"
              icon="pi pi-save" :label="$t('general.save')"
              class="lowercase ml-3 text-sm py-1" severity="primary" />
      <Button v-else @click="bookSt.editing = true"
              icon="pi pi-pencil" :label="$t('general.edit')"
              class="lowercase text-sm" severity="secondary" />
    </template>
    <div v-if="bookSt.chapter.type === 'html'">
      <Editor v-if="bookSt.editing" v-model="bookSt.chapter.content" editorStyle="min-height: 250px"></Editor>
      <p v-else v-html="bookSt.chapter.content" class="ql-editor my-1"></p>
    </div>
    <div v-else-if="bookSt.chapter.type === 'img'">
      <div v-if="bookSt.editing">image editor</div>
      <BookGallery v-else :images="bookSt.chapter.images" class="my-1"></BookGallery>
    </div>
  </Panel>
</template>

<style scoped>

</style>
