<script setup>
import { ref, onMounted  } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  book: {type: Object, required: true},
})

const electron = window.electron;
if (!electron) {
  throw new Error("Electron API not available");
}

const paths = ref({});
const fetchPaths = async () => {
  try {
    paths.value = await electron.getPaths();
  } catch (error) {
    console.error('Error fetching paths:', error);
  }
};

onMounted(() => {
  fetchPaths();
});

const isBase64 = (str) => {
  return str.startsWith('data:image/jpeg;base64,') || str.startsWith('data:image/png;base64,');
};

const getImageSrc = (imageSrc) => {
  if (isBase64(imageSrc)) {
    return imageSrc;
  }

  if (paths.value.resourcesPath) {
    return `${paths.value.resourcesPath}${imageSrc}`;
  }
  return imageSrc;
};

const router = useRouter()

const openBookEdit = () => {
  router.push({
    name: 'book-edit', params: {
      bookId: props.book.id,
    },
  })
}
</script>

<template>
  <Card class="w-80 overflow-hidden hover:shadow-lg hover:shadow-surface-300 dark:hover:shadow-surface-700">
    <template #header>
      <img v-if="book.cover" @click="openBookEdit" alt="" :src="getImageSrc(book.cover)" class="h-96 cursor-pointer w-full object-cover" />
    </template>
    <template #title>
      <div @click="openBookEdit" class="cursor-pointer">{{ book.title }}</div>
    </template>
    <template #subtitle>
      <div class="flex justify-between items-start gap-3">
        <span>{{ book.author.name }}</span>
        <i @click="router.push({name: 'book-create', params: {bookId: book.id}})"
           class="flex-none pi pi-pencil cursor-pointer mt-1" v-tooltip.top="$t('general.edit')" />
      </div>
    </template>
    <template #footer>
      <div v-if="book.tags.length > 0" class="flex flex-wrap gap-x-2 gap-y-3">
        <Chip v-for="tag in book.tags" :label="tag" class="text-sm" />
      </div>
    </template>
  </Card>
</template>
