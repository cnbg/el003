<script setup>
defineProps({
  chapter: Object,
})
</script>

<template>
  <div>
    <div class="flex flex-col gap-4">
      <label>
        {{ $t('general.title') }}
        <InputText v-model="chapter.title" class="w-full" autocomplete="off" />
        <span v-show="!chapter.title" class="text-sm text-red-700">{{ $t('general.required-field') }}</span>
      </label>
      <label>
        {{ $t('general.enter-description') }}
        <Textarea v-model="chapter.desc" class="w-full h-32" />
      </label>
      <label>
        {{ $t('general.tags') }}
        <Chips v-model="chapter.tags" id="chapter-tags" class="w-full" />
      </label>
    </div>
    <div class="flex justify-end mt-8 gap-10">
      <Button @click="$emit('close', null)" :label="$t('general.close')" type="button" plain text />
      <Button @click="$emit('close', chapter)" :label="$t('general.save')" type="button" outlined />
    </div>
  </div>
</template>

<style scoped>
</style>
