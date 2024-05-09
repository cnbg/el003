<script setup>
import 'quill/dist/quill.snow.css'
import 'katex/dist/katex.min.css'

import Quill from 'quill'
import katex from 'katex'
import ImageResize from 'quill-image-resize-vue'
import VideoResize from 'quill-video-resize-module'

import { onMounted } from 'vue'

window.katex = katex
const Clipboard = Quill.import('modules/clipboard')

Quill.prototype.getHTML = function () {
  return this.container.querySelector('.ql-editor').innerHTML
}

Quill.prototype.setHTML = function(html) {
  this.container.querySelector('.ql-editor').innerHTML = html
}

class PlainClipboard extends Clipboard {
  convert(html = null) {
    this.setHTML(html)
  }
}

Quill.register("modules/imageResize", ImageResize)
Quill.register('modules/videoResize', VideoResize)

const props = defineProps(['content'])
const emit = defineEmits(['updated'])

onMounted(() => {
  const quill = new Quill('#quill-editor', {
    modules: {
      toolbar: '#quill-toolbar',
      imageResize: {},
      videoResize: {},
      table: true,
    },
    theme: 'snow',
    placeholder: '...',
  })

  quill.setHTML(props.content)

  quill.on('text-change', (delta, oldDelta, source) => {
    emit('updated', quill.getSemanticHTML())
  })
})
</script>

<template>
  <div id="quill-toolbar">
    <!-- Add font size dropdown -->
    <select class="ql-size">
      <option value="small"></option>
      <!-- Note a missing, thus falsy value, is used to reset to default -->
      <option selected></option>
      <option value="large"></option>
      <option value="huge"></option>
    </select>
    <!-- Add a bold button -->
    <button class="ql-bold" v-tooltip.top="'Bold'"></button>
    <!-- Add subscript and superscript buttons -->
    <button class="ql-script" value="sub"></button>
    <button class="ql-script" value="super"></button>
  </div>
  <div id="quill-editor"></div>
</template>

<style>
#quill-editor iframe {
  pointer-events: none;
}
</style>
