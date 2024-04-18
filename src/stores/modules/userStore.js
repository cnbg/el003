import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
    state: () => ({
        isLangSet: false,
        isEmailSet: false,
        user: {},
    }),
    getters: {
        isLangSet: state => state.isLangSet,
        isEmailSet: state => state.isEmailSet,
        user: state => state.user,
    },
    actions: {
        async saveUser(data = {}) {
            this.user = {...this.user, ...data}
            await window.localStorage.setItem('user', JSON.stringify(this.user))
        },
        syncLocalData() {
            try {
                const localData = JSON.parse(window.localStorage.getItem('user'))
                if (localData) {
                    this.user = localData
                    this.isLangSet = this.user.lang.length > 0
                    this.isEmailSet = this.user.email.length > 0
                }
            } catch (error) {
                console.error(error)
            }
        },
    },
})
