<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '../../stores/user'
import { focusElement } from '../../lib/helpers'

const {t} = useI18n()
const user = useUserStore()
const name = ref(user.name)
const email = ref(user.email)
const error = ref('')

const saveName = async () => {
  if (name.value && await user.setName(name.value)) {
    error.value = ''
    if (email.value === '') {
      focusElement('email-input')
      error.value = t('validation.invalid-email')
    }
  } else error.value = t('validation.invalid-name')
}

const saveEmail = async () => {
  if (email.value && await user.setEmail(email.value)) {
    error.value = ''
    if (name.value === '') {
      focusElement('name-input')
      error.value = t('validation.invalid-name')
    }
  } else error.value = t('validation.invalid-email')
}

const save = async () => {
  if (error.value === '') await saveName()
  if (error.value === '') await saveEmail()
}
</script>

<template>
  <div class="w-full h-full flex flex-column align-items-center justify-content-center gap-3">

    <InputGroup class="w-24rem">
      <InputGroupAddon><i class="pi pi-user"></i></InputGroupAddon>
      <InputText v-model.trim="name"
                 id="name-input"
                 autofocus
                 @input="error = ''"
                 :placeholder="$t('general.enter-your-name')"
                 @keyup.enter.native="saveName" />
    </InputGroup>

    <InputGroup class=" w-24rem">
      <InputGroupAddon>@</InputGroupAddon>
      <InputText v-model.trim="email"
                 id="email-input"
                 @input="error = ''"
                 :placeholder="$t('general.enter-your-email')"
                 @keyup.enter.native="saveEmail" />
      <Button @click="save" icon="pi pi-check" severity="contrast" />
    </InputGroup>

    <div v-if="error" class="lowercase text-red-700">{{ error }}</div>

  </div>
</template>
