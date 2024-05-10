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

const save = () => {
  if(book.title) {
    bookSt.saveBook(book)
    router.push({name: 'book-list'})
  }
}
</script>

<template>
  <div>
    <TopMenu class="p-2" />
    <div class="p-8 flex flex-col gap-6">
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
      <Button @click="save" icon="pi pi-save"
              class="sm:w-72 ml-auto mt-4" size="large"
              :label="$t('general.save')" severity="success" outlined />
    </div>
  </div>
</template>

<style scoped>

</style>
