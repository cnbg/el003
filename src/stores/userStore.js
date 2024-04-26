import { defineStore } from 'pinia'
import { isValidEmail } from '../lib/validation/inputValidation'

export const useUserStore = defineStore('user', {
    state: () => ({
        email: localStorage.getItem('email') ?? '',
        locale: localStorage.getItem('locale') ?? '',
        darkMode: localStorage.getItem('darkMode') === 'true',
    }),
    getters: {},
    actions: {
        async setEmail(email) {
            const isValid = isValidEmail(email)

            if (isValid) {
                this.email = email
                await localStorage.setItem('email', email)
            }

            return isValid
        },
        async setLocale(locale) {
            this.locale = locale
            await localStorage.setItem('locale', locale)
        },
        async setDarkMode(darkMode) {
            this.darkMode = darkMode
            localStorage.setItem('darkMode', darkMode)

            if (darkMode) {
                await document.querySelector('html').classList.add('p-dark')
            } else {
                await document.querySelector('html').classList.remove('p-dark')
            }
        },
    },
})
