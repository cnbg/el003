<script setup>
import { ref } from 'vue'
import { useBookStore } from '../../../stores/book'

const emit = defineEmits(['save', 'close'])
const props = defineProps({
  chapter: {type: Object, required: true},
})
const newChapter = ref(props.chapter)

const save = () => {
  if(newChapter.value.title) {
    emit('save', newChapter.value)
  }
}
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
        <Textarea v-model="newChapter.desc" class="w-full h-7rem" />
      </label>
    </div>
    <div class="flex justify-content-end mt-6 gap-4">
      <Button @click="emit('close', null)" :label="$t('general.cancel')" type="button" plain text />
      <Button @click="save" :label="$t('general.save')" type="button" />
    </div>
  </div>
</template>

<style scoped>
</style>
