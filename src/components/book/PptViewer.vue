<template>
  <div class="ppt-viewer">
    <div class="d-flex flex-column">
      <p>
        <span class="file-name" >{{ pptFileName }}</span>
      </p>
      <Button v-if="pptFilePath" @click="openPowerPoint" class="btn-view">
        {{ $t('general.openPowerPoint') }}
      </Button>
   
  </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps(['pptFilePath']);
const { t } = useI18n();

const pptFileName = ref(getFileName(props.pptFilePath));

const openPowerPoint = () => {
  if (props.pptFilePath) {
    window.electron.openPptFile(props.pptFilePath);
  }
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
.btn-view {
  display: inline-block;
  margin-top: 10px;
  padding: 8px 16px;
}

</style>
