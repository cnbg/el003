<script setup>
import MenuItem from '@/components/common/MenuItem.vue'
import { useI18n } from 'vue-i18n'

const {t} = useI18n()

const mainMenuItems = [
  {icon: 'pi pi-home', label: t('general.book-list'), path: '/book/list'},
]

const endMenuItems = [
  {icon: 'pi pi-user', path: '/user/settings', root: true, hasSubmenus: false},
]
</script>

<template>
  <Menubar :model="mainMenuItems">
    <template #item="{ item, props, hasSubmenu, root }">
      <MenuItem :item="item" :props="props" :hasSubmenu="hasSubmenu" :root="root" />
    </template>
    <template #end>
      <ul class="p-menubar-root-list">
        <li v-for="(endMenuItem, index) in endMenuItems" :key="index" class="p-menuitem">
          <div class="p-menuitem-content">
            <MenuItem :item="endMenuItem" :hasSubmenu="false" :root="true" />
          </div>
        </li>
      </ul>
    </template>
  </Menubar>
</template>

<style scoped>

</style>
