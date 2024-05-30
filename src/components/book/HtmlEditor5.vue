<script setup>
import { ref, onMounted, watch } from 'vue';
import { useBookStore } from '../../stores/book';
import  Editor  from '@tinymce/tinymce-vue';




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
</script>

<template>
  <div>
    <div class="flex flex-wrap justify-end gap-5 mb-5">
      <Button @click="save" icon="pi pi-save" :label="$t('general.save')" severity="success" />
    </div>
    <Editor
      v-model="content"
      api-key="hog2k60fzfxvtrc3efz1kjwed1ubbtzubmwnf61wk0ivspzw"
      :init="{
        height: 'calc(100vh - 330px)',
        plugins: 'print preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
        toolbar: 'undo redo | bold italic underline strikethrough |tiny_mce_wiris_formulaEditor tiny_mce_wiris_formulaEditorChemistry| fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen preview save print | insertfile image media template link anchor codesample | ltr rtl',
        selector: 'textarea', 
        external_plugins: {
        tiny_mce_wiris: '../../../node_modules/@wiris/mathtype-tinymce5/plugin.min.js'}, 
        extended_valid_elements: '*[.*]',
        draggable_modal: true,
        skin: 'oxide-dark',
        content_css: 'dark',
        statusbar: false,
        language_load: true,
        language_url: '../../locale/ru/editor.js', 
        language: 'ru',
        
        /* plugins: 'media',
        toolbar: 'media' */
        
      }"
    />
  </div>
</template>

<style>


</style>
