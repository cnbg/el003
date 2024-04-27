<script setup>
import { reactive, ref, watch } from 'vue'
import { useUserStore } from "../../stores/user"

const user = useUserStore()
const locales = [{key: 'kg', name: 'Кыргызча'}, {key: 'ru', name: 'Русский'}]
const locale = reactive(user.locale === 'kg' ? locales[0] : locales[1])
const darkMode = ref(user.darkMode)

const setDarkMode = async (e, val) => {
  await user.setDarkMode(darkMode.value)
}

watch(locale, (val) => {
  user.setLocale(val)
})
</script>

<template>
  <TopMenu class="m-3" />
  <div class="m-4">
    <div class="flex align-items-center">
      <span class="w-10rem">{{ $t('general.language') }}</span>
        <Button @click="$i18n.locale = 'kg'; user.setLocale('kg')"
                label="кыргызча"
                :severity="user.locale === 'kg' ? 'success' : 'contrast'"
                :outlined="user.locale !== 'kg'"
                :icon="user.locale === 'kg' ? 'pi pi-check' : ''"
                class="w-8rem mr-2 text-sm" />
        <Button @click="$i18n.locale = 'ru'; user.setLocale('ru')"
                label="русский"
                :severity="user.locale === 'ru' ? 'success' : 'contrast'"
                :outlined="user.locale !== 'ru'"
                :icon="user.locale === 'ru' ? 'pi pi-check' : ''"
                class="w-8rem text-sm" />
    </div>
    <div class="mt-5 flex align-items-center">
      <span class="w-10rem">{{ $t('general.night-mode') }}</span>
      <InputSwitch v-model="darkMode" @change="setDarkMode" />
    </div>
    <div class="mt-5 flex align-items-center">
      <span class="w-10rem">{{ $t('general.email') }}</span>
      <span>{{ user.email }}</span>
    </div>
  </div>
</template>
