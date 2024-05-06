<script setup>
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useI18n } from 'vue-i18n'

const toast = useToast()
const {t} = useI18n()
const title = ref(null)

const onAdvancedUpload = (event) => {
  console.log(event.target.value)
  toast.add({severity: 'info', summary: t('general.file-uploaded-successfully'), detail: '', life: 4000})
}
</script>

<template>
  <div style="height: calc(100vh - 186px)" class="flex flex-col gap-6">
    <FloatLabel>
      <InputText v-model.trim="title" id="title" class="w-full" />
      <label for="title">{{ t('general.enter-title') }}</label>
    </FloatLabel>
    <FloatLabel>
      <Textarea v-model.trim="title" id="description" class="w-full h-20" />
      <label for="description">{{ t('general.enter-description') }}</label>
    </FloatLabel>
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
