<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'

defineProps({
  searchable: {type: Boolean, default: false},
})

const route = useRoute()
const router = useRouter()
const {t} = useI18n()
const search = ref('')

const startRoutes = [
  {name: 'book-list', icon: 'pi pi-book', label: t('general.book-list')},
  {name: 'book-create', icon: 'pi pi-plus', label: t('general.add-book')},
  {name: '', icon: 'pi pi-file-import', label: t('general.import'), disabled: true},
]
const endRoutes = [
  {name: 'user-settings', icon: 'pi pi-user', label: ''},
]
</script>

<template>
  <div>
    <Toolbar id="app-toolbar" class="bg-white shadow dark:bg-gray-900">
      <template #start>
        <Button v-for="{name, icon, label, disabled} in startRoutes" :key="name"
                @click="router.push({name: name})" :disabled="disabled"
                text :severity="route.name === name ? 'success' : 'secondary'">
          <i :class="icon" class="mr-2"></i>{{ label }}
        </Button>
      </template>

      <template #center v-if="searchable">
        <IconField iconPosition="left" class="md:w-64 lg:w-96">
          <InputIcon>
            <i class="pi pi-search" />
          </InputIcon>
          <InputText v-model.trim="search"
                     @input="$emit('search', search)"
                     :placeholder="$t('general.search').concat('...')"
                     class="w-full" />
        </IconField>
      </template>

      <template #end>
        <Button v-for="{name, icon, label} in endRoutes" :key="name"
                @click="router.push({name: name})"
                text :severity="route.name === name ? 'success' : 'secondary'">
          <i :class="icon"></i>{{ label }}
        </Button>
      </template>
    </Toolbar>
  </div>
</template>

<style scoped>
#app-toolbar {
  padding: 0.6rem
}
</style>
