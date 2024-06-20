<template>
  <div class="editor-container">
    <Button v-if="!editing" @click="startEdit" icon="pi pi-pencil" class="edit-button" />
    <div v-if="!editing" v-html="html" class="ql-editor"></div>
    <div v-else>
      <div class="flex justify-end mt-2 edit-controls">
        <Button @click="saveEdit" :label="$t('general.save')" icon="pi pi-save" class="mr-2" severity="success" />
        <Button @click="cancelEdit" :label="$t('general.cancel')" icon="pi pi-times" severity="secondary" />
      </div>
      <Editor v-model="editedContent" :init="editorConfig" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import 'quill/dist/quill.snow.css'
import Editor from '@tinymce/tinymce-vue';
import { useUserStore } from '../../stores/user';

const props = defineProps({
  html: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['content-updated']);

const userSt = useUserStore();
const editorConfig = ref(getEditorConfig(userSt.darkMode));

watch(() => userSt.darkMode, (newVal) => {
  editorConfig.value = getEditorConfig(newVal);
});

const editing = ref(false);
const editedContent = ref(props.html); 
const originalContent = ref(props.html);

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
            cb(blobInfo.blobUri(), {
              title: file.name
            });
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

    }
  };

const startEdit = () => {
  editing.value = true;
  editedContent.value = props.html; 
};

const cancelEdit = () => {
  editing.value = false;
  editedContent.value = originalContent.value; 
};

const saveEdit = () => {
  if (editedContent.value.trim() === '') {
    originalContent.value = '';
    editing.value = false;
  } else {
    const parser = new DOMParser();
    const doc = parser.parseFromString(editedContent.value, 'text/html');
    const links = doc.querySelectorAll('a');
    links.forEach(link => {
      link.style.color = 'blue';
      link.style.textDecoration = 'underline';
    });
    editedContent.value = doc.body.innerHTML;
    editing.value = false;
    originalContent.value = editedContent.value;
  }
  emit('content-updated', originalContent.value);
};


</script>

<style scoped>
.editor-container {
  position: relative;
  padding-top: 30px;
}

.edit-button {
  position: absolute;
  top: 0;
  left: 0;
  width: 30px;
  height: 30px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  display: none;
}

.editor-container:hover .edit-button {
  display: flex;
}

.edit-controls {
  margin-bottom: 10px;
}
</style>
