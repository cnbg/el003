import { defineStore } from 'pinia'
import { isValidEmail } from '../lib/validation'

export const useUserStore = defineStore('user', {
    state: () => ({
        name: localStorage.getItem('name') ?? '',
        email: localStorage.getItem('email') ?? '',
        locale: localStorage.getItem('locale') ?? '',
        locales: [
            {key: 'kg', name: 'кыргызча'},
            {key: 'ru', name: 'русский'},
        ],
        darkMode: localStorage.getItem('darkMode') === 'true',
    }),
    getters: {},
    actions: {
        async setName(name) {
            if(name) {
                this.name = name
                await localStorage.setItem('name', name)

                return true
            }

            return false
        },
        async setEmail(email) {
            const isValid = isValidEmail(email)

            if(isValid) {
                this.email = email
                await localStorage.setItem('email', email)
            }

            return isValid
        },
        async setLocale(key) {
            if(this.locales.find(locale => locale.key === key)) {
                this.locale = key
                await localStorage.setItem('locale', key)

                return true
            }

            return false
        },
        async setDarkMode(darkMode) {
            this.darkMode = darkMode
            localStorage.setItem('darkMode', darkMode)

            const html = await document.querySelector('html')
            darkMode ? html.classList.add('dark') : html.classList.remove('dark')
        },
        syncLocalStorage() {
            this.name = localStorage.getItem('name') ?? ''
            this.email = localStorage.getItem('email') ?? ''
            this.locale = localStorage.getItem('locale') ?? ''
            this.darkMode = localStorage.getItem('darkMode') === 'true'
        },
    },
})
