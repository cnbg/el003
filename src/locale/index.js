import { createI18n } from 'vue-i18n'
import messages from './messages'

const i18n = createI18n({
    legacy: false,
    locale: localStorage.getItem('locale'),
    fallbackLocale: 'kg',
    messages: messages,
})

export default i18n
