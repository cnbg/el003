import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        email: '',
        locale: '',
        darkMode: false,
    }),
    getters: {
        isEmptyEmail: state => !state.email,
        isEmptyLocale: state => !state.locale,
    },
    actions: {
        setEmail(email) {
            this.email = email
            localStorage.setItem('email', email)
        },
        setLocale(locale) {
            this.locale = locale
            localStorage.setItem('locale', locale)
        },
        setDarkMode(darkMode) {
            this.darkMode = darkMode
            localStorage.setItem('darkMode', darkMode)
        },
        syncSettings() {
            this.email = localStorage.getItem('email') ?? ''
            this.locale = localStorage.getItem('locale') ?? ''
            this.darkMode = localStorage.getItem('darkMode') === 'true'
        },
    },
})
