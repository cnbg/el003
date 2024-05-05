<script setup>
import Quill from 'quill'
import katex from 'katex'
import highlight from 'highlight.js'

import { onMounted } from 'vue'

const toolbarOptions = [
  [{'size': ['huge', 'medium', 'small', false]}],  // custom dropdown
  [{'header': [1, 2, 3, 4, 5, 6, false]}],
  [{'font': []}],

  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],
  ['link', 'image', 'video', 'formula'],

  [{'list': 'ordered'}, {'list': 'bullet'}, {'list': 'check'}],
  [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
  [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
  [{'direction': 'rtl'}],                         // text direction

  [{'color': []}, {'background': []}],          // dropdown with defaults from theme
  [{'align': []}],

  ['clean'],                                         // remove formatting button
]

onMounted(() => {
  const quill = new Quill('#editor', {
    modules: {
      syntax: true,
      toolbar: toolbarOptions,
    },
    theme: 'snow',
    formats: ['bold', 'underline', 'header', 'italic'],
  })
})
</script>

<template>
  <div id="editor"></div>
</template>

<style scoped>

</style>
