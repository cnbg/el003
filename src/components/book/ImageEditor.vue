<script setup>
import { reactive, ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useI18n } from 'vue-i18n'
import { useBookStore } from '../../stores/book'

const toast = useToast()
const {t} = useI18n()
const bookSt = useBookStore()
const imgObj = {
  title: '',
  alt: '',
  src: '',
  thumb: '',
}
const image = ref(imgObj)
const images = reactive([{...imgObj}])

const fileUploader = async (event, image) => {
  const file = event.files[0]
  const reader = new FileReader()
  let blob = await fetch(file.objectURL).then((r) => r.blob()) //blob:url

  reader.readAsDataURL(blob)

  reader.onloadend = function() {
    image.src = reader.result
    image.thumb = reader.result
  }
}

const save = () => {
  bookSt.block?.id ? bookSt.updateBlock(images || '') : bookSt.saveBlock(images || '')
  toast.add({severity: 'info', summary: t('general.file-uploaded-successfully'), life: 4000})
}
const addNewBlock = () => {
  images.push({...imgObj})
}
</script>

<template>
  <div>
    <ScrollPanel style="height: calc(100vh - 220px)">
      <div class="flex flex-wrap justify-between gap-5">
        <Button @click="addNewBlock" icon="pi pi-plus" text severity="success" />

        <Button v-if="images.length > 0" @click="save" icon="pi pi-save"
                :label="$t('general.save')" severity="success" />
      </div>

      <div v-for="(image, index) in images" :key="index" class="mt-10 flex flex-col gap-5">
        <div>
          <label for="title">{{ t('general.enter-title') }}</label>
          <InputText v-model.trim="image.title" id="title" class="w-full" />
        </div>
        <div>
          <label for="description">{{ t('general.enter-description') }}</label>
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

<style scoped>
</style>
