<script setup>
import { useToast } from 'primevue/usetoast'
import { useI18n } from 'vue-i18n'

const toast = useToast()
const {t} = useI18n()

const onAdvancedUpload = (event) => {
  console.log(event.target.value)
  toast.add({severity: 'info', summary: t('general.file-uploaded-successfully'), detail: '', life: 4000})
}
</script>

<template>
  <div style="height: calc(100vh - 186px)">
    <FileUpload name="demo[]" url="/api/upload"
                @upload="onAdvancedUpload($event)"
                :multiple="true" accept="image/*" :maxFileSize="10000000">
      <template #empty>
        <div class="">{{ $t('general.drag-drop-files-info') }}</div>
      </template>
    </FileUpload>
  </div>
</template>

<style scoped>
</style>
