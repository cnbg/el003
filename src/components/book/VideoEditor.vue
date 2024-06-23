<script setup>
import { ref } from 'vue'
import { useBookStore } from '../../stores/book'

const bookSt = useBookStore()
const file = ref({})

const fileUploader = async (event) => {
  const selectedFile = event.files[0];
  const filePath = selectedFile.path;
  const fileName = selectedFile.name;

  try {
    const response = await window.electron.uploadVideo(filePath, fileName);
    if (response.success) {
      file.value = {
        ...selectedFile,
        path: response.filePath,
      };
    } else {
      console.error('response:', response);
      console.error('Error uploading video:', response.message);
    }
  } catch (error) {
    console.error('Error uploading video:', error);
  }
}

const save = () => {
  bookSt.block?.id ? bookSt.updateBlock(file.value || '') : bookSt.saveBlock(file.value || '')
}
</script>

<template>
  <div>
    <div class="flex flex-wrap justify-between gap-5">
      <FileUpload mode="basic" name="cover" accept="video/mp4,video/x-m4v,video/*"
                  customUpload @uploader="fileUploader" auto
                  :chooseLabel="$t('general.select-file')" />

      <Button v-if="file.path" @click="save" icon="pi pi-save"
              :label="$t('general.save')" severity="success" />
    </div>

    <VideoViewer v-if="file.path" :video="file" class="mt-12" />
  </div>

</template>

<style scoped>
</style>
