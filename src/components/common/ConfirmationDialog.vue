<template>
  <ConfirmDialog group="headless">
    <template #container="{ acceptCallback, rejectCallback }">
      <div class="flex flex-col items-center py-8 px-4 bg-surface-100 dark:bg-surface-900 rounded">
        <i class="pi pi-exclamation-circle text-red-600 text-5xl"></i>
        <div class="font-bold text-xl my-8">{{ $t('general.are-you-sure-to-delete') }}</div>
        <div class="flex items-center gap-10">
          <Button :label="$t('general.no')" text severity="secondary" @click="rejectCallback" class="uppercase" />
          <Button :label="$t('general.yes')" severity="danger" @click="acceptCallback" class="uppercase" />
        </div>
      </div>
    </template>
  </ConfirmDialog>
</template>
