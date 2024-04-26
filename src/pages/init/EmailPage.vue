<script setup>
import { ref, watch } from 'vue'
import { useUserStore } from '../../stores/userStore'

const user = useUserStore()

const email = ref('')
const isValid = ref(true)

const setEmail = async () => {
  isValid.value = await user.setEmail(email.value)
}

watch(email, (newVal, oldVal) => isValid.value = newVal !== oldVal)
</script>

<template>
  <div class="w-full h-full flex flex-column align-items-center justify-content-center gap-3">

    <InputGroup class="w-24rem">
      <InputGroupAddon>@</InputGroupAddon>
      <InputText v-model.trim="email" @keyup.enter.native="setEmail" :placeholder="$t('general.enter-your-email')" />
      <Button @click="setEmail" icon="pi pi-check" severity="contrast" />
    </InputGroup>

    <span :class="{invisible: isValid}" class="lowercase text-red-700">
      {{ $t('validation.invalid-email') }}
    </span>

  </div>
</template>
