<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

import { useUserStore } from '../../stores/user'
import { useBookStore } from '../../stores/book'

const router = useRouter()
const userSt = useUserStore()
const bookSt = useBookStore()

const book = reactive({
  title: '',
  desc: '',
  tags: [],
  author: {
    name: userSt.name,
    email: userSt.email,
  },
})

const save = async () => {
  if(book.title) {
    await bookSt.saveBook(book)
    await router.push({name: 'book-edit', params: {bookId: book.id}})
  }
}
</script>

<template>
  <TopMenu class="p-2" />
  <div class="px-2 py-4 flex flex-column">

    <label for="book-title" class="mb-1">{{ $t('general.enter-title').concat('...') }}</label>
    <div class="flex justify-content-between gap-3 mb-1">
      <InputText id="book-title" v-model="book.title" class="text-2xl w-full" />
      <Button @click="save" icon="pi pi-save" :label="$t('general.save')" severity="contrast" />
    </div>
    <span v-if="!book.title" class="lowercase text-red-700">
      {{ $t('general.enter-book-title') }}
    </span>

    <label for="book-desc" class="mt-3 mb-1">{{ $t('general.enter-description') }}</label>
    <Textarea v-model="book.desc" id="book-desc" class="h-6rem" placeholder="..." />

    <label for="book-tags" class="mt-3 mb-1">{{ $t('general.tags') }}</label>
    <Chips v-model="book.tags" id="book-tags" />
  </div>
</template>

<style scoped>

</style>
