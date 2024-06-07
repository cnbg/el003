<template>
  <div>
    <Button v-if="!editing && images.length > 0" @click="startEdit" icon="pi pi-pencil" class="edit-button" />
    <div v-if="!editing" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      <div v-for="(image, index) in images" :key="index" class="image-container" @mouseover="showEdit(index)" @mouseleave="hideEdit(index)">
        <img :src="image.src" @click="imageClick(index)" alt="" class="object-cover aspect-video" />
        <Button v-if="hoveredIndex === index" @click="startEdit" icon="pi pi-pencil" class="edit-button" />
      </div>
    </div>
    <div v-else>
      <div v-for="(image, index) in images" :key="index">
        <div>
          <div class="flex justify-end gap-2">
          <FileUpload mode="basic" name="cover" accept="image/*" :maxFileSize="5000000" customUpload @uploader="fileUploader($event, image)" auto :chooseLabel="$t('general.select-file')" />
          <Button @click="deleteImage(index)" icon="pi pi-trash" severity="danger" />
          <Button @click="saveEdit" icon="pi pi-save" :label="$t('general.save')" severity="success" />
          <Button @click="cancelEdit" icon="pi pi-times" :label="$t('general.cancel')" class="p-button-danger" severity="secondary" />
          </div>
        </div>
        <div>
          <label for="title">{{ $t('general.enter-title') }}</label>
          <InputText v-model="image.title" id="title" class="w-full" />
        </div>
        <div>
          <label for="description">{{ $t('general.enter-description') }}</label>
          <Textarea v-model="image.alt" id="description" class="w-full h-15" />
        </div>
        <div v-if="image.src" class="p-5">
          <img :src="image.src" class="h-56 w-full object-contain" />
        </div>
      </div>
    </div>
    <Galleria v-if="!editing" :value="images" v-model:activeIndex="activeIndex" v-model:visible="displayGallery" :fullScreen="true" :showItemNavigators="images.length > 1" :showItemNavigatorsOnHover="images.length > 1" :showThumbnails="images.length > 1" :numVisible="4" :circular="images.length > 1" containerStyle="width 100%">
      <template #item="slotProps">
        <img :src="slotProps.item.src" alt="" class="object-contain aspect-video" style="width: calc(80vw); height: calc(65vh)" />
      </template>
      <template #thumbnail="slotProps">
        <img :src="slotProps.item.thumb" alt="" class="max-h-14 md:max-h-24 object-cover px-2 aspect-video" />
      </template>
      <template #caption="slotProps">
        <div v-if="slotProps.item.title">
          <div class="mb-1 font-bold">{{ slotProps.item.title }}</div>
          <p class="text-sm m-0">{{ slotProps.item.alt }}</p>
        </div>
      </template>
    </Galleria>
  </div>
</template>

<script setup>
  import {
    defineProps,
    ref
  } from 'vue'
  const props = defineProps({
    images: {
      type: Array,
      default: () => []
    }
  })
  const activeIndex = ref(0)
  const displayGallery = ref(false)
  const editing = ref(false)
  const imageClick = (index) => {
    activeIndex.value = index
    displayGallery.value = true
  }
  const startEdit = () => {
    editing.value = true
  }
  const saveEdit = () => {
    // Save edited images, titles, and descriptions
    editing.value = false
  }
  const cancelEdit = () => {
    // Cancel editing mode
    editing.value = false
  }
  const deleteImage = (index) => {
    props.images.splice(index, 1);
    // Hide the edit button if no images are left
    if (props.images.length === 0) {
      editing.value = false;
    }
  };
  const fileUploader = async (event, image) => {
    const file = event.files[0]
    const reader = new FileReader()
    let blob = await fetch(file.objectURL).then((r) => r.blob())
    reader.readAsDataURL(blob)
    reader.onloadend = function() {
      image.src = reader.result
      image.thumb = reader.result
    }
  }
  // a reactive variable to keep track of the hovered image index
  const hoveredIndex = ref(null);

  const showEdit = (index) => {
    hoveredIndex.value = index;
  };

  const hideEdit = (index) => {
    hoveredIndex.value = null;
  };
</script>

<style scoped>
  .edit-button {
    top: 5px;
    right: 5px; 
    width: 30px;
    height: 30px;
    padding: 0;
    font-size: 14px;
    bottom: 10px;
    position: absolute;
    visibility: hidden;
  }

  .image-container {
    position: relative;
    display: inline-block;
  }

  .image-container:hover .edit-button {
    visibility: visible;
  }
</style>
