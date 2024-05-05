<script setup>
import { ref, onMounted } from "vue"

import { useBookStore } from '../../stores/book'

const props = defineProps(['content'])

const bookSt = useBookStore()

onMounted(() => {
  const el = document.createElement('script')
  el.setAttribute('src', 'https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.js')
  document.head.appendChild(el)
})
</script>

<template>
  <Editor v-model="bookSt.block.content" class="dark:text-white"
          :placeholder="$t('general.enter-text').concat('...')"
          editorStyle="height: calc(100vh - 275px);">
    <template v-slot:toolbar>
      <span class="ql-formats">
        <select class="ql-font"></select>
        <select class="ql-size"></select>
      </span>
      <span class="ql-formats">
          <button v-tooltip.top="'Bold'" class="ql-bold"></button>
          <button v-tooltip.top="'Italic'" class="ql-italic"></button>
          <button v-tooltip.top="'Underline'" class="ql-underline"></button>
          <button v-tooltip.top="'Strike'" class="ql-strike"></button>
      </span>
      <span class="ql-formats">
        <select class="ql-color"></select>
        <select class="ql-background"></select>
      </span>
      <span class="ql-formats">
        <button class="ql-script" value="sub"></button>
        <button class="ql-script" value="super"></button>
      </span>
      <span class="ql-formats">
        <button class="ql-header" value="1"></button>
        <button class="ql-header" value="2"></button>
        <button class="ql-blockquote"></button>
        <button class="ql-code-block"></button>
      </span>
      <span class="ql-formats">
        <button class="ql-list" value="ordered"></button>
        <button class="ql-list" value="bullet"></button>
        <button class="ql-indent" value="-1"></button>
        <button class="ql-indent" value="+1"></button>
      </span>
      <span class="ql-formats">
        <button class="ql-direction" value="rtl"></button>
        <select class="ql-align"></select>
      </span>
      <span class="ql-formats">
        <button class="ql-link"></button>
        <button class="ql-image"></button>
        <button class="ql-video"></button>
        <button class="ql-formula"></button>
      </span>
      <span class="ql-formats">
        <button class="ql-clean"></button>
      </span>
    </template>
  </Editor>
</template>

<style>
.ql-tooltip {
  z-index: 9999;
}
</style>
