import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import i18n from './locale'
import router from './routes/router'
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"
import { surveyPlugin } from "survey-vue3-ui";
import { surveyCreatorPlugin } from "survey-creator-vue";

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(surveyPlugin)
app.use(surveyCreatorPlugin)
app.use(pinia)
app.use(i18n)
app.use(router)

export default app
