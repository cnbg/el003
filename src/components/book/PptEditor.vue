<script setup>
import { ref, watch } from 'vue';
import { useBookStore } from '../../stores/book';
import { useToast } from 'primevue/usetoast';
import { useI18n } from 'vue-i18n';

const bookSt = useBookStore();
const toast = useToast();
const { t } = useI18n();
const file = ref(null);
const selectedPptPath = ref('');
const pptFileName = ref('');

const fileUploader = async (event) => {
  const selectedFile = event.files[0];
  const filePath = selectedFile.path;
  const fileName = selectedFile.name;

  try {
    const response = await window.electron.uploadPpt(filePath, fileName, 'src/data/ppt/');
    if (response.success) {
      file.value = {
        ...selectedFile,
        path: response.filePath,
      };
      pptFileName.value = fileName; 
    } else {
      console.error('Error uploading PowerPoint:', response.message);
      toast.add({ severity: 'error', summary: t('general.uploadError'), detail: response.message });
    }
  } catch (error) {
    console.error('Error uploading PowerPoint:', error);
    toast.add({ severity: 'error', summary: t('general.uploadError'), detail: error.message });
  }
};

const save = () => {
  const content = {
    name: file.value.name,
    path: file.value.path,
  };
  bookSt.block?.id ? bookSt.updateBlock(content) : bookSt.saveBlock(content);
};
</script>

<template>
  <div>
    <div class="flex flex-wrap justify-between gap-5">
      <FileUpload mode="basic" name="ppt" accept=".ppt,.pptx"
                  customUpload @uploader="fileUploader" auto
                  :chooseLabel="$t('general.select-file')" />

      <Button v-if="file && file.path" @click="save" icon="pi pi-save"
              :label="$t('general.save')" severity="success" />
    </div>
    <div class="message-container">
      <Message v-if="file && file.path" severity="info" text-align="center">
        <span>{{ $t('general.fileSelected') }}:</span> {{ pptFileName }}
      </Message>
    </div>
    <PptViewer :pptPath="selectedPptPath" />
  </div>
</template>

<style scoped>
.message-container {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>
