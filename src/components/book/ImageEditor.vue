<script setup>
import { reactive } from 'vue';
import { useBookStore } from '../../stores/book';
import { useToast } from 'primevue/usetoast';
import { useI18n } from 'vue-i18n';

const { electron } = window;
const toast = useToast();
const { t } = useI18n();
const bookSt = useBookStore();

const imgObj = {
    title: '',
    alt: '',
    src: '',
    thumb: '',
};

const images = reactive([{
    ...imgObj
}]);

const fileUploader = async (event, image) => {
    const file = event.files[0];
    const filePath = file.path;
    const fileName = file.name;

    try {
        const response = await electron.uploadFile(filePath, fileName);
        if (response.success) {
            image.src = response.filePath;
            image.thumb = response.filePath;
        } else {
            console.error('Error uploading file:', response.message);
        }
    } catch (error) {
        console.error('Error uploading file:', error);
    }
};

const save = () => {
    const isValid = images.some(image => image.src !== '' && (image.title.trim() !== '' || image.alt.trim() !== ''));

    if (isValid) {
        bookSt.block?.id ? bookSt.updateBlock(images) : bookSt.saveBlock(images);
    } else {
        if (images.some(image => image.title.trim() === '')) {
            toast.add({ severity: 'error', summary: t('general.enter-book-title'), life: 3000 });
        }
        if (images.some(image => image.alt.trim() === '')) {
            toast.add({ severity: 'error', summary: t('general.enter-description'), life: 3000 });
        }
        if (images.every(image => image.src === '')) {
            toast.add({ severity: 'error', summary: t('general.select-file'), life: 3000 });
        }
    }
};

const addNewBlock = () => {
    images.push({
        ...imgObj
    });
};
</script>


<template>
  <div>
    <ScrollPanel style="height: calc(100vh - 260px)">
      <div class="flex flex-wrap justify-between gap-5">
        <Button @click="addNewBlock" icon="pi pi-plus" text severity="success" />
        <Button v-if="images.length > 0" @click="save" icon="pi pi-save" :label="$t('general.save')" severity="success" />
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
        <FileUpload mode="basic" name="cover" accept="image/*" :maxFileSize="5000000" customUpload @uploader="fileUploader($event, image)" auto :chooseLabel="$t('general.select-file')" />
        <div v-if="image.src" class="p-5">
          <img :src="image.src" class="h-56 w-full object-contain" />
        </div>
      </div>
    </ScrollPanel>
  </div>
</template>

<style scoped>
</style>