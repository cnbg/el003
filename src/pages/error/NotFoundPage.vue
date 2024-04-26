<template>
  <div class="h-full flex align-items-center justify-content-center flex-column">
    <h3 class="my-2 uppercase">{{ $t('general.page-not-found') }}</h3>
    <RouterLink to="/">
      <Button :label="$t('general.homepage')" icon="pi pi-home"
              class="my-4" severity="contrast" outlined />
    </RouterLink>
  </div>
</template>
