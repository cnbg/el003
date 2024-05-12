<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

import { useUserStore } from '../../stores/user'
import { useBookStore } from '../../stores/book'

const props = defineProps({
  bookId: {type: String},
})

const router = useRouter()
const userSt = useUserStore()
const bookSt = useBookStore()

bookSt.getBook(props.bookId)

const book = reactive(bookSt.book || {
  title: '',
  desc: '',
  tags: [],
  author: {
    name: userSt.name,
    email: userSt.email,
  },
  cover: '',
})

const save = () => {
  if(book.title) {
    book.id ? bookSt.updateBook(book) : bookSt.saveBook(book)
    router.push({name: 'book-list'})
  }
}

const customBase64Uploader = async (event) => {
  const file = event.files[0]
  const reader = new FileReader()
  let blob = await fetch(file.objectURL).then((r) => r.blob()) //blob:url

  reader.readAsDataURL(blob)

  reader.onloadend = function() {
    book.cover = reader.result
  }
}
</script>

<template>
  <TopMenu class="p-2" />
  <div class="p-6 flex flex-col gap-5">
    <div>
      <label for="book-title">{{ $t('general.enter-title').concat('...') }}</label>
      <InputText id="book-title" v-model="book.title" class="text-2xl w-full" />
      <span v-show="!book.title" class="lowercase text-red-700">{{ $t('general.enter-book-title') }}</span>
    </div>
    <div>
      <label for="book-desc">{{ $t('general.enter-description') }}</label>
      <Textarea v-model="book.desc" id="book-desc" class="w-full h-32" placeholder="..." />
    </div>
    <div>
      <label for="book-tags" class="mt-3 mb-1">{{ $t('general.tags') }}</label>
      <Chips v-model="book.tags" id="book-tags" />
    </div>

    <div class="flex flex-wrap justify-between gap-5">
      <FileUpload mode="basic" name="cover" accept="image/*" :maxFileSize="90000000"
                  :auto="true" customUpload @uploader="customBase64Uploader"
                  :chooseLabel="$t('general.select-cover')" />

      <Button @click="save" icon="pi pi-save"
              class="sm:w-56 ml-auto" size="large"
              :label="$t('general.save')" severity="success" outlined />
    </div>

    <div v-if="book.cover" class=" p-5">
      <img :src="book.cover" class="h-96 w-full object-contain" />
    </div>

  </div>
</template>

<style scoped>

</style>
