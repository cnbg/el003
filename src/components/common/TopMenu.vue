<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'

const props = defineProps({
  searchable: {type: Boolean, default: false},
})

const emit = defineEmits(['search'])

const route = useRoute()
const router = useRouter()
const {t} = useI18n()
const search = ref('')

const startRoutes = [
  {name: 'book-list', icon: 'pi pi-book', label: t('general.book-list'), type: 'primary'},
  {name: 'book-create', icon: 'pi pi-plus', label: t('general.create-new-book'), type: 'primary', cl: 'ml-2'},
  {name: '', icon: 'pi pi-file-import', label: t('general.import'), type: 'primary'},
]
const endRoutes = [
  {name: 'user-settings', icon: 'pi pi-user', label: '', type: 'primary'},
]

const onSearch = () => {
  emit('search', search.value)
}
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
          <InputText v-model.trim="search"
                     @input="onSearch"
                     :placeholder="$t('general.search').concat('...')"
                     class="md:w-18rem lg:w-25rem" />
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
