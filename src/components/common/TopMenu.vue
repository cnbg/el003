<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  searchable: {type: Boolean, default: false},
})

const route = useRoute()
const router = useRouter()
const {t} = useI18n()

const startRoutes = [
  {name: 'book-list', icon: 'pi pi-book', label: t('general.book-list'), type: 'primary'},
  {name: 'book-create', icon: 'pi pi-plus', label: t('general.create-new-book'), type: 'primary', cl: 'ml-2'},
]
const endRoutes = [
  {name: 'user-settings', icon: 'pi pi-user', label: '', type: 'primary'},
]
</script>

<template>
  <div>
    <Toolbar>
      <template #start>
        <Button v-for="{name, icon, label, type, cl} in startRoutes" :key="name"
                @click="route.name === name ? void(0) : router.push({name: name})"
                :icon="icon" :label="label" text
                :severity="route.name === name ? type : 'secondary'"
                :class="cl" />
      </template>

      <template #center v-if="searchable">
        <IconField iconPosition="left">
          <InputIcon>
            <i class="pi pi-search" />
          </InputIcon>
          <InputText :placeholder="$t('general.search').concat('...')" class="md:w-20rem lg:w-30rem" />
        </IconField>
      </template>

      <template #end>
        <Button v-for="{name, icon, label, type, cl} in endRoutes" :key="name"
                @click="route.name === name ? void(0) : router.push({name: name})"
                :icon="icon" :label="label" text
                :severity="route.name === name ? type : 'secondary'"
                :class="cl" />
      </template>
    </Toolbar>
  </div>
</template>
