<template>
  <div class="flex items-center justify-center flex-col gap-5"
       style="height: calc(100vh - 100px)">
    <h3 class="m-0 uppercase">{{ $t('general.page-not-found') }}</h3>
    <RouterLink to="/">
      <Button :label="$t('general.homepage')" icon="pi pi-home" severity="secondary" outlined />
    </RouterLink>
  </div>
</template>
