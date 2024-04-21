<script setup>
defineProps(['item', 'props', 'hasSubmenu', 'root'])
</script>

<template>
  <RouterLink class="p-menuitem-link" :class="item.class" :to="item.path || '#'">
    <span v-if="item.icon" :class="[item.icon, {'mr-2': item.label}]" />
    <span v-if="item.label">{{ item.label }}</span>
    <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }" :value="item.badge" />
    <i v-if="hasSubmenu" :class="['pi pi-angle-down', { 'pi-angle-down ml-2': root, 'pi-angle-right ml-auto': !root }]"></i>
  </RouterLink>
</template>

<style scoped>

</style>
