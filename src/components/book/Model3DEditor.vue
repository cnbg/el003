<script setup>
import { ref } from 'vue'
import { useBookStore } from '../../stores/book'
import Model3DViewer from './Model3DViewer.vue'
const { electron } = window;

const bookSt = useBookStore()
const file = ref({})

const fileUploader = async (event) => {
  const file = event.files[0];
  const filePath = file.path;
  const fileName = file.name;

  try {
    const response = await electron.uploadModel(filePath, fileName);
    if (response.success) {
      // image.src = response.filePath;
      // image.thumb = response.filePath;
    } else {
      console.error('Error uploading file:', response.message);
    }
  } catch (error) {
    console.error('Error uploading file:', error);
  }
};

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
