<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { isValidEmail } from '@/lib/validation/inputValidation'

const email = ref('')
const valid = ref(true)
const userStore = useUserStore()

const save = () => {
  valid.value = isValidEmail(email.value)

  if (valid.value) {
    userStore.setEmail(email.value)
  }
}
</script>

<template>
  <div class="h-full flex align-items-center justify-content-center">
    <div style="width: 350px" class="text-center">
      <InputGroup>
        <InputText v-model.trim="email" required autofocus
                   :placeholder="$t('general.enter-your-email')"
                   :invalid="!valid" />
        <Button @click="save" icon="pi pi-check" severity="contrast" />
      </InputGroup>
      <div :class="{invisible: valid}" class="text-red-700 mt-3 lowercase p-error">
        {{ $t('validation.invalid-email') }}
      </div>
    </div>
  </div>
</template>
