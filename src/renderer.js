import { createApp } from 'vue'
import App from '@/App.vue'
import PrimeVue from 'primevue/config'

import '@/assets/base.css'

const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
if (darkThemeMq.matches) {
    import('primevue/resources/themes/aura-dark-green/theme.css')
} else {
    import('primevue/resources/themes/aura-light-green/theme.css')
}

const app = createApp(App)
app.use(PrimeVue)
app.mount('#app')
