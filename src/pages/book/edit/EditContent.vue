<script setup>
import { useBookStore } from '../../../stores/book'

const bookSt = useBookStore()
</script>

<template>
  <div style="height: calc(100vh - 94px)">
    <Card v-if="bookSt.chapter" class="chapter-content h-full">
      <template #content>
        <ScrollPanel style="height: calc(100vh - 135px)">
          <div class="w-full flex flex-col justify-start">
            <div class="text-xl">{{ bookSt.chapter.title }}</div>
            <h5 v-if="bookSt.chapter.desc" class="text-300 my-3">{{ bookSt.chapter.desc }}</h5>
            <div v-if="bookSt.chapter.tags?.length > 0" class="flex flex-wrap gap-x-2 gap-y-3">
              <Chip v-for="tag in bookSt.chapter.tags" :label="tag" class="text-xs" />
            </div>
          </div>
          <Divider />
          <div v-for="(block, index) in bookSt.chapter.blocks" :key="index">
            <div v-if="block.type === 'html'" class="pb-10">
              <QuillEditor v-if="bookSt.editing" :content="block.content"></QuillEditor>
              <p v-else v-html="block.content" class="ql-editor my-0"></p>
            </div>
            <div v-else-if="block.type === 'img'">
              <div v-if="bookSt.editing">image editor</div>
              <BookGallery v-else :images="block.images" class="my-1"></BookGallery>
            </div>
          </div>
        </ScrollPanel>
      </template>
    </Card>
    <Card v-else class="h-full" />
  </div>
</template>

<style>
.chapter-content div[data-pc-section='content'] {
  padding: 0 !important;
}
</style>
