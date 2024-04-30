<script setup>
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { chapterObj } from '../../../stores/models/bookObj'

const emit = defineEmits()
const {t} = useI18n()

let newChapter = reactive(chapterObj)

const types = [
  {type: 'html', name: t('general.text')},
  {type: 'img', name: t('general.images')},
]
const selectedType = ref(types[0])

const save = () => {
  if(newChapter.title) {
    emit('onSave', )
  }
}
const cancel = () => {
  emit('onCancel', null)
}
</script>

<template>
  <Dialog modal :header="$t('general.add-chapter')" class="w-30rem">
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
        <Dropdown v-model="selectedType" :options="types" dataKey="type" optionLabel="name" class="w-full" />
      </label>
    </div>
    <div class="flex justify-content-end mt-6 gap-4">
      <Button @click="cancel" :label="$t('general.cancel')" type="button" plain text />
      <Button @click="save" :label="$t('general.save')" type="button" />
    </div>
  </Dialog>
</template>

<style scoped>
</style>
