<template>
  <div class="ppt-viewer">
    <div class="d-flex flex-row">
      <p class="file-name"> {{ $t('general.download-as-ppt') }}
        <Button v-if="pptFilePath" @click="downloadPowerPoint" icon="pi pi-download" class="btn-download">
        </Button>
      </p>
        <span>{{ pptFileName }}</span>
      <iframe ref="pptFrame" width="0" height="0" frameborder="0" style="display: none;"></iframe>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps(['pptFilePath']);
const { t } = useI18n();

const pptFileName = ref(getFileName(props.pptFilePath));

const downloadPowerPoint = () => {
  const link = document.createElement('a');
  link.style.display = 'none';
  link.href = props.pptFilePath;
  link.download = pptFileName.value;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

function getFileName(filePath) {
  if (!filePath) return '';
  return filePath.split('/').pop().split('\\').pop(); 
}
</script>

<style scoped>
.ppt-viewer {
  margin: 20px;
}
.btn-download {
  margin-left: 10px;
  padding: 8px 12px;
  width: 30px;
  height: 30px;

}
.file-name {
  font-size: 18px;
  font-weight: bold;
}
</style>
