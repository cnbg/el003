import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
    state: () => ({
        user: {},
    }),
    getters: {
        isLangSet: state => state.user.lang?.length > 0 ?? false,
        isEmailSet: state => state.user.email?.length > 0 ?? false,
        getUser: state => state.user,
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
                }
            } catch (error) {
                console.error(error)
            }
        },
    },
})
