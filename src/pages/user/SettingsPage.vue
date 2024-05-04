<script setup>
import { ref } from 'vue'
import { useUserStore } from "../../stores/user"

const userSt = useUserStore()
const darkMode = ref(userSt.darkMode)

const setDarkMode = async () => {
  await userSt.setDarkMode(darkMode.value)
}
</script>

<template>
  <div>
    <TopMenu class="p-2" />
    <Card class="mx-2" style="height: calc(100vh - 80px)">
      <template #content>
        <div class="flex flex-col align-center gap-7 pl-10">
          <div class="flex items-center">
            <span class="w-40">{{ $t('general.language') }}</span>
            <Button v-for="locale in userSt.locales" :key="locale.key"
                    @click="$i18n.locale = locale.key; userSt.setLocale(locale.key)"
                    :label="locale.name"
                    :severity="userSt.locale === locale.key ? 'success' : 'secondary'"
                    outlined
                    :icon="userSt.locale === locale.key ? 'pi pi-check' : ''"
                    class="w-32 mr-3" size="small" />
          </div>
          <div class="flex items-center">
            <span class="w-40">{{ $t('general.night-mode') }}</span>
            <InputSwitch v-model="darkMode" @change="setDarkMode" />
          </div>
          <div class="flex items-center">
            <span class="w-40">{{ $t('general.name') }}</span>
            <span>{{ userSt.name }}</span>
          </div>
          <div class="flex items-center">
            <span class="w-40">{{ $t('general.email') }}</span>
            <span>{{ userSt.email }}</span>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>
