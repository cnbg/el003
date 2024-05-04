<script setup>
import { ref } from 'vue'

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
    <div class="flex flex-col gap-4">
      <label>
        {{ $t('general.title') }}
        <InputText v-model="newChapter.title" class="w-full" autocomplete="off" />
        <span v-show="!newChapter.title" class="text-sm text-red-700">{{ $t('general.required-field') }}</span>
      </label>
      <label>
        {{ $t('general.enter-description') }}
        <Textarea v-model="newChapter.desc" class="w-full h-32" />
      </label>
      <label>
        {{ $t('general.tags') }}
        <Chips v-model="newChapter.tags" id="chapter-tags" class="w-full" />
      </label>
    </div>
    <div class="flex justify-end mt-8 gap-10">
      <Button @click="emit('close', null)" :label="$t('general.close')" type="button" plain text />
      <Button @click="save" :label="$t('general.save')" type="button" outlined />
    </div>
  </div>
</template>

<style scoped>
</style>
