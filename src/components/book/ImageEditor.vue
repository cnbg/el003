<template>
  <div>
    <ScrollPanel style="height: calc(100vh - 260px)">
      <div class="flex flex-wrap justify-between gap-2 flex-wrap-margin">
        <Button @click="addNewBlock" icon="pi pi-plus" text severity="success" />

        <Button v-if="images.length > 0" @click="save" icon="pi pi-save"
                :label="$t('general.save')" severity="success" />
      </div>

      <div v-for="(image, index) in images" :key="index" class="mt-10 flex flex-col gap-5">
        <div>
          <label for="title">{{ $t('general.enter-title') }}</label>
          <InputText v-model.trim="image.title" id="title" class="w-full" />
        </div>
        <div>
          <label for="description">{{ $t('general.enter-description') }}</label>
          <Textarea v-model.trim="image.alt" id="description" class="w-full h-15" />
        </div>
        <FileUpload mode="basic" name="cover" accept="image/*" :maxFileSize="5000000"
                    customUpload @uploader="fileUploader($event, image)" auto
                    :chooseLabel="$t('general.select-file')" />

        <div v-if="image.src" class="p-5">
          <img :src="image.src" class="h-56 w-full object-contain" />
        </div>

      </div>
    </ScrollPanel>
  </div>
</template>

<script setup>
import { defineProps, ref, defineEmits } from 'vue';
import { useBookStore } from '../../stores/book';

const props = defineProps({
  initialImages: { type: Array, default: () => [] }
});

const emit = defineEmits(['content-updated']);

const bookStore = useBookStore();
const images = ref([...props.initialImages]);

const fileUploader = async (event, image) => {
  const file = event.files[0];
  const reader = new FileReader();
  let blob = await fetch(file.objectURL).then((r) => r.blob());

  reader.readAsDataURL(blob);

  reader.onloadend = function() {
    image.src = reader.result;
    image.thumb = reader.result;
  };
};

const save = () => {
  if (bookStore.block?.id) {
    bookStore.updateBlock(images.value);
  } else {
    bookStore.saveBlock(images.value);
  }
};

const addNewBlock = () => {
  images.value.push({ title: '', alt: '', src: '', thumb: '' });
};

if (images.value.length === 0) {
  addNewBlock();
}
</script>

<style scoped>
  .flex-wrap-margin {
      margin-top: 10px; 
      margin-left: 10px;
  }
</style>
