<script setup>
import 'quill/dist/quill.snow.css'

import { onMounted } from 'vue'
import Quill from 'quill'

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],
  ['link', 'image', 'video', 'formula'],

  [{'header': 1}, {'header': 2}],                  // custom button values
  [{'list': 'ordered'}, {'list': 'bullet'}, {'list': 'check'}],
  [{'script': 'sub'}, {'script': 'super'}],       // superscript/subscript
  [{'indent': '-1'}, {'indent': '+1'}],           // outdent/indent
  [{'direction': 'rtl'}],                         // text direction

  [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
  [{'header': [1, 2, 3, 4, 5, 6, false]}],

  [{'color': []}, {'background': []}],            // dropdown with defaults from theme
  [{'font': []}],
  [{'align': []}],

  ['clean'],                                     // remove formatting button
]

const options = {
  debug: 'warn',
  modules: {
    // syntax: true,
    toolbar: toolbarOptions,
  },
  placeholder: '...',
  theme: 'snow',
}

onMounted(() => {
  const quill = new Quill('#editor', options)
})
</script>

<template>
  <div id="editor"></div>
</template>

<style scoped>
</style>
