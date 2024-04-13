<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const styles = [
    "https://cdn.jsdelivr.net/npm/quill@2.0.0-rc.5/dist/quill.snow.css"
  ]
  const scripts = [
    "https://cdn.jsdelivr.net/npm/quill@2.0.0-rc.5/dist/quill.js",
  ];
  styles.forEach(style => {
    let tag = document.head.querySelector(`[href="${style}"`)
    if (!tag) {
      tag = document.createElement("link")
      tag.setAttribute("href", style)
      tag.setAttribute("rel", 'stylesheet')
      document.head.append(tag)
    }
  })
  scripts.forEach(script => {
    let tag = document.body.querySelector(`[src="${script}"`)
    if (!tag) {
      tag = document.createElement("script")
      tag.setAttribute("src", script)
      tag.setAttribute("type", 'text/javascript')
      document.body.append(tag)
    }
  })

  window.addEventListener("load", () => {
    const options = {
      debug: 'info',
      modules: {
        toolbar: true,
      },
      placeholder: 'Compose an epic...',
      theme: 'snow'
    }

    const quill = new Quill('#editor', options)
  })
})
</script>

<template>
  <div id="editor"></div>
</template>

<style scoped>

</style>
