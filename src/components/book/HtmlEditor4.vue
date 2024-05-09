<script setup>
import 'quill/dist/quill.snow.css'
import 'katex/dist/katex.min.css'

import Quill from 'quill'
import katex from 'katex'
import ImageResize from 'quill-image-resize-vue'
import VideoResize from 'quill-video-resize-module'

import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useBookStore } from '../../stores/book'

window.katex = katex
const Clipboard = Quill.import('modules/clipboard')
const Delta = Quill.import('delta')

Quill.prototype.setHTML = function (html) {
  this.container.querySelector('.ql-editor').innerHTML = html
}

class PlainClipboard extends Clipboard {
  // convert(html = null) {
  //   if (typeof html === 'string') {
  //     this.container.innerHTML = html;
  //   }
  //   let text = this.container.innerText;
  //   this.container.innerHTML = '';
  //   return new Delta().insert(text);
  // }
}

Quill.register("modules/imageResize", ImageResize)
Quill.register('modules/videoResize', VideoResize)

const props = defineProps(['content'])

const {t} = useI18n()
const bookSt = useBookStore()

onMounted(() => {
  const quill = new Quill('#quill-editor', {
    modules: {
      toolbar: '#quill-toolbar',
      imageResize: {},
      videoResize: {},
      table: true,
    },
    theme: 'snow',
    placeholder: t('general.enter-text').concat('...')
    // formats: ['bold', 'underline', 'header', 'italic'],
  })

  quill.setHTML(props.content)
})
</script>

<template>
  <div id="quill-toolbar">
    <span class="ql-formats">
      <select class="ql-font"></select>
      <select class="ql-size"></select>
    </span>
    <span class="ql-formats">
      <button class="ql-bold"></button>
      <button class="ql-italic"></button>
      <button class="ql-underline"></button>
      <button class="ql-strike"></button>
    </span>
    <span class="ql-formats">
      <select class="ql-color" tooltip="asfasdf"></select>
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
      <button class="ql-table"></button>
    </span>
    <span class="ql-formats">
      <button class="ql-clean"></button>
    </span>
  </div>
  <div id="quill-editor">{{ content }}</div>
</template>

<style>
#quill-editor iframe {
  pointer-events: none;
}
</style>
