<template>
  <div>
    <div class="flex flex-wrap justify-end gap-5 mb-5">
      <Button @click="save" icon="pi pi-save" :label="$t('general.save')" severity="success" />
    </div>
    <Editor
      v-model="content"
      api-key="hog2k60fzfxvtrc3efz1kjwed1ubbtzubmwnf61wk0ivspzw"
      :init="editorConfig"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useBookStore } from '../../stores/book';
import Editor from '@tinymce/tinymce-vue';

const props = defineProps({
  html: {
    type: String,
    default: ''
  }
});

const bookSt = useBookStore();
const content = ref(props.html || bookSt.block?.content || '');

const save = () => {
  if (bookSt.block?.id) {
    bookSt.updateBlock(content.value);
  } else {
    bookSt.saveBlock(content.value);
  }
};

watch(() => props.html, (newVal) => {
  content.value = newVal;
});

const editorConfig = {
  height: 'calc(100vh - 330px)',
  plugins: 'print preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
  //toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen preview save print | insertfile image media template link anchor codesample | ltr rtl',
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
        // Convert the file to a base64 string
        const id = 'blobid' + (new Date()).getTime();
        const blobCache = tinymce.activeEditor.editorUpload.blobCache;
        const base64 = reader.result.split(',')[1];
        const blobInfo = blobCache.create(id, file, base64);
        blobCache.add(blobInfo);

        // Call the callback and populate the Title field with the file name
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
      // Import the translation file after the editor is initialized
      import('../../locale/ru/editor.js').then(() => {
        // Translation file loaded successfully
      
      }).catch((error) => {
        console.error('Failed to load translation file:', error);
      });
    });
  },
};
</script>

<style>
/* Add your custom styles here */
</style>
