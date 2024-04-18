<script setup>
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import Button from 'primevue/button'

import { ref } from 'vue'
import { useUserStore } from '../../stores'

const lang = ref('')
const userStore = useUserStore()

const save = async () => {
  await userStore.saveUser({
    lang: lang.value,
  })
}
</script>

<template>
  <div class="fullscreen centered column">
    <div>
      <InputGroup>
        <InputGroupAddon><i class="pi pi-user"></i></InputGroupAddon>
        <InputText placeholder="Select language" v-model.trim="lang" />
      </InputGroup>
      <Button @click="save" label="save" />
    </div>
  </div>
</template>

<style scoped>

</style>
