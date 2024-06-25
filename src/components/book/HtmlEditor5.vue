<template>
  <div>
    <div class="flex flex-wrap justify-end gap-5 mb-5">
      <Button @click="save" icon="pi pi-save" :label="$t('general.save')" severity="success" />
    </div>
    <Editor v-model="content" :init="editorConfig" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useBookStore } from '../../stores/book';
import Editor from '@tinymce/tinymce-vue';
import { useUserStore } from '../../stores/user';

const props = defineProps({ html: { type: String, default: '' } });
const bookSt = useBookStore();
const userSt = useUserStore();
const content = ref("");


const save = () => {
  bookSt.saveBlock(content.value);
};

watch(() => props.html, (newVal) => {
  content.value = newVal;
});

const editorConfig = ref(getEditorConfig(userSt.darkMode));

watch(() => userSt.darkMode, (newVal) => {
  editorConfig.value = getEditorConfig(newVal);
});

function getEditorConfig(isDarkMode) {
  return {
    license_key: 'gpl',
    height: 'calc(100vh - 330px)',
    plugins: "preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons",
    automatic_uploads: false,
    promotion: false,
    file_picker_types: 'image media',
    file_picker_callback: (cb, value, meta) => {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', meta.filetype === 'image' ? 'image/*' : 'video/*');
      input.onchange = function () {
        const file = this.files[0];
        const reader = new FileReader();
        reader.onload = function () {
          const id = 'blobid' + (new Date()).getTime();
          const blobCache = tinymce.activeEditor.editorUpload.blobCache;
          const base64 = reader.result.split(',')[1];
          const blobInfo = blobCache.create(id, file, base64);
          blobCache.add(blobInfo);
          cb(blobInfo.blobUri(), { title: file.name });
        };
        reader.readAsDataURL(file);
      };
      input.click();
    },
    extended_valid_elements: '*[.*]',
    draggable_modal: true,
    skin: isDarkMode ? 'oxide-dark' : 'oxide',
    content_css: isDarkMode ? 'dark' : 'default',
    statusbar: false,
    language: 'ru',
    setup: (editor) => {
      editor.on('init', () => {
        import('../../tinymce/js/tinymce/langs/ru.js').catch((error) => {
          console.error('Failed to load translation file:', error);
        });
      });
    },
  };
}
</script>

<style>
</style>
