<template>
  <div class="editor-container">
    <Button v-if="!editing" @click="startEdit" icon="pi pi-pencil" class="edit-button" />
    <div v-if="!editing" v-html="html" class="tiny-editor"></div>
    <div v-else>
      <Editor
        v-model="editedContent"
        api-key="hog2k60fzfxvtrc3efz1kjwed1ubbtzubmwnf61wk0ivspzw"
        :init="editorConfig"
      />
      <div class="flex justify-end mt-2">
        <Button @click="saveEdit" :label="$t('general.save')" icon="pi pi-save" class="mr-2" severity="success"/>
        <Button @click="cancelEdit" :label="$t('general.cancel')" icon="pi pi-times" severity="danger"/>
      </div>
    </div>
    
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Editor from '@tinymce/tinymce-vue';

const props = defineProps({
  html: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['content-updated']);

const editing = ref(false);
const editedContent = ref(props.html);
const originalContent = ref(props.html);

const editorConfig = {
  height: 'calc(100vh - 330px)',
  plugins: 'print preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
  automatic_uploads: false,
  file_picker_types: 'image media',
  file_picker_callback: (cb, value, meta) => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', meta.filetype === 'image' ? 'image/*' : 'video/*');
    input.onchange = function() {
      const file = this.files[0];
      const reader = new FileReader();
      reader.onload = function() {
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
  skin: 'oxide-dark',
  content_css: 'dark',
  statusbar: false,
  language: 'ru',
  setup: (editor) => {
    editor.on('init', () => {
      import('../../locale/ru/editor.js').catch((error) => {
        console.error('Failed to load translation file:', error);
      });
    });
  },
};

const startEdit = () => {
  editing.value = true;
};

const cancelEdit = () => {
  editing.value = false;
  editedContent.value = originalContent.value;
};

const saveEdit = () => {
  editing.value = false;
  originalContent.value = editedContent.value;
  emit('content-updated', originalContent.value);
};
</script>

<style scoped>
.editor-container {
  position: relative;
}

.edit-button {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  padding: 0;
  font-size: 14px;
}
</style>
