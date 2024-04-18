<script setup>
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import Button from 'primevue/button'

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores'

const email = ref('')
const router = useRouter()
const userStore = useUserStore()

const save = async () => {
  await userStore.saveUser({
    email: email.value,
  })
  router.push({name: 'home'})
}
</script>

<template>
  <div class="fullscreen centered column">
    <div>
      <InputGroup>
        <InputGroupAddon><i class="pi pi-user"></i></InputGroupAddon>
        <InputText placeholder="Username" v-model.trim="email" />
      </InputGroup>
      <Button @click="save" label="save" />
    </div>
  </div>
</template>

<style scoped>

</style>
