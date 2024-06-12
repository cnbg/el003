<template>
  <div>
    <div v-if="!editing" class="model-container" @mouseover="showEdit" @mouseleave="hideEdit">
      <model-viewer tone-mapping="neutral" shadow-intensity="1" ar camera-controls touch-action="pan-y"
        :src="model.path" :alt="model.name" class="h-96 mx-auto w-full"></model-viewer>
      <Button v-if="isHovered" @click="startEdit" icon="pi pi-pencil" class="edit-button" />
    </div>
    <div v-else class="model-container">
      <div class="flex justify-end gap-2 edit-controls">
        <FileUpload mode="basic" name="cover" accept=".glb,.gltf" customUpload @uploader="fileUploader" auto
          :chooseLabel="$t('general.select-file')" />
        <Button @click="deleteModel" icon="pi pi-trash" severity="danger" />
        <Button @click="saveEdit" icon="pi pi-save" :label="$t('general.save')" severity="success" />
        <Button @click="cancelEdit" icon="pi pi-times" :label="$t('general.cancel')" class="p-button-danger"
          severity="secondary" />
      </div>
      <model-viewer tone-mapping="neutral" shadow-intensity="1" ar camera-controls touch-action="pan-y"
        :src="file.path || model.path" :alt="model.name" class="h-96 mx-auto w-full"></model-viewer>
    </div>
  </div>
</template>

<script setup>
  import {
    ref
  } from 'vue'
  import '@google/model-viewer'

  const emit = defineEmits(['content-updated', 'delete-model'])
  const props = defineProps(['model'])
  const file = ref({})
  const editing = ref(false)
  const isHovered = ref(false)

  const startEdit = () => {
    editing.value = true
  }

  const saveEdit = () => {
    if (file.value.path) {
      props.model.path = file.value.path
    }
    emit('content-updated', props.model)
    editing.value = false
  }

  const cancelEdit = () => {
    editing.value = false
  }

  const deleteModel = () => {
    emit('delete-model')
  }

  const fileUploader = async (event) => {
    const uploadedFile = event.files[0]
    const reader = new FileReader()
    let blob = await fetch(uploadedFile.objectURL).then((r) => r.blob())

    reader.readAsDataURL(blob)

    reader.onloadend = function () {
      file.value.path = reader.result
    }
  }

  const showEdit = () => {
    isHovered.value = true
  }

  const hideEdit = () => {
    isHovered.value = false
  }
</script>

<style scoped>
  .edit-button {
    width: 30px;
    height: 30px;
    padding: 0;
    font-size: 14px;
    position: absolute;
    top: 5px;
    right: 10px;
    visibility: hidden;
  }

  .model-container {
    position: relative;
  }

  .model-container:hover .edit-button {
    visibility: visible;
  }

  .edit-controls {
    margin-bottom: 10px;
  }
</style>