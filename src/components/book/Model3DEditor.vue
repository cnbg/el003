<script setup>
import { ref } from 'vue'
import { useBookStore } from '../../stores/book'
import Model3DViewer from './Model3DViewer.vue'


const bookSt = useBookStore()
const file = ref({})

const fileUploader = async (event) => {
  file.value = event.files[0]
  console.log(file.value)
}

const save = () => {
  bookSt.block?.id ? bookSt.updateBlock(file.value || '') : bookSt.saveBlock(file.value || '')
}
</script>

<template>
  <div>
    <div class="flex flex-wrap justify-between gap-5">
      <FileUpload mode="basic" name="cover"
                  customUpload @uploader="fileUploader" auto
                  :chooseLabel="$t('general.select-file')" />

      <Button v-if="file.path" @click="save" icon="pi pi-save"
              :label="$t('general.save')" severity="success" />
    </div>

    <Model3DViewer v-if="file.path" :model="file" class="mt-12" />
  </div>
</template>

<style scoped>
</style>
