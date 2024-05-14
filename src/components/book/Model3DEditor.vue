<script setup>
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useI18n } from 'vue-i18n'
import { useBookStore } from '../../stores/book'

const toast = useToast()
const {t} = useI18n()
const bookSt = useBookStore()
const file = ref({})

const fileUploader = async (event) => {
  file.value = event.files[0]
  console.log(file.value)
}

const save = () => {
  bookSt.block?.id ? bookSt.updateBlock(file.value || '') : bookSt.saveBlock(file.value || '')
  toast.add({severity: 'info', summary: t('general.file-uploaded-successfully'), life: 4000})
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
