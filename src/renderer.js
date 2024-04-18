import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import PrimeVue from 'primevue/config'
import routes from '@/routes/routes'

import '@/assets/base.css'
import 'primevue/resources/themes/aura-light-green/theme.css'
import 'primeicons/primeicons.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(PrimeVue)
app.use(routes)
app.mount('#app')
