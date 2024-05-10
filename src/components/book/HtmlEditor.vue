<script setup>
import 'quill/dist/quill.snow.css'
import 'katex/dist/katex.min.css'

import { onMounted } from 'vue'
import Quill from 'quill'
import katex from 'katex'
import ImageResize from 'quill-image-resize-vue'
import VideoResize from 'quill-video-resize-module'

window.katex = katex

const Clipboard = Quill.import('modules/clipboard')

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
  <div>
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
      <button class="ql-link" v-tooltip.top="$t('general.add-link')"></button>
      <button class="ql-image" v-tooltip.top="$t('general.add-image')"></button>
      <button class="ql-video" v-tooltip.top="$t('general.add-video')"></button>
      <button class="ql-formula" v-tooltip.top="$t('general.add-formula')"></button>
    </span>
      <span class="ql-formats">
      <button class="ql-table" v-tooltip.top="$t('general.add-table')"></button>
    </span>
      <span class="ql-formats">
      <button class="ql-clean" v-tooltip.top="$t('general.clean-format')"></button>
    </span>
    </div>
    <div id="quill-editor" style="height: calc(100vh - 281px)"></div>
  </div>
</template>

<style>
#quill-editor iframe {
  pointer-events: none;
}

.dark {
  .ql-snow .ql-fill,
  .ql-snow .ql-stroke.ql-fill {
    fill: rgb(var(--surface-300))
  }

  .ql-snow .ql-stroke {
    stroke: rgb(var(--surface-300))
  }

  .ql-snow .ql-picker-label {
    color: rgb(var(--surface-300))
  }
}
</style>
