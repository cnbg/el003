<script setup>
import { ref } from 'vue'
import { useBookStore } from '../../../stores/book'

const emit = defineEmits(['save', 'close'])
const newChapter = ref({

})

const save = () => {
  if (newChapter.value.title) {
    emit('save', newChapter)
    // newChapter.value = bookSt.chapterObj()
  }
}
const close = () => {
  // newChapter.value = bookSt.chapterObj()
  emit('close', null)
}
const visibl = ref(props.vis)
</script>

<template>
  <div>
    <div class="flex flex-column gap-3">
      <div>
        <label>
          {{ $t('general.title') }}
          <InputText v-model="newChapter.title" class="w-full" autocomplete="off" />
        </label>
        <span v-show="!newChapter.title" class="text-sm text-red-700">{{ $t('general.required-field') }}</span>
      </div>
      <div>
        <label>
          {{ $t('general.tags') }}
          <Chips v-model="newChapter.tags" id="chapter-tags" class="w-full" />
        </label>
      </div>
    </div>
    <div class="mt-3">
      <label>
        {{ $t('general.select-chapter-type') }}
        <Textarea v-model="newChapter.desc" :options="types" dataKey="type" optionLabel="name" class="w-full" />
      </label>
    </div>
    <div class="flex justify-content-end mt-6 gap-4">
      <Button @click="close" :label="$t('general.cancel')" type="button" plain text />
      <Button @click="save" :label="$t('general.save')" type="button" />
    </div>
  </div>
</template>

<style scoped>
</style>
