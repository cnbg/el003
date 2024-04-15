import { createApp } from 'vue'
import App from '@/App.vue'
import PrimeVue from 'primevue/config'
import routes from '@/routes'

import '@/assets/base.css'

const darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
if (darkMode) {
    import('primevue/resources/themes/aura-dark-green/theme.css')
} else {
    import('primevue/resources/themes/aura-light-green/theme.css')
}

const app = createApp(App)
app.use(PrimeVue)
app.use(routes)
app.provide('darkMode', darkMode)
app.mount('#app')
