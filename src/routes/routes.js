import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/pages/HomePage.vue'
import LangPage from '@/pages/user/LangPage.vue'
import LoginPage from '@/pages/auth/LoginPage.vue'
import { useUserStore } from '@/stores';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage,
        },
        {
            path: '/lang',
            name: 'lang',
            component: LangPage,
        },
        {
            path: '/login',
            name: 'login',
            component: LoginPage,
        },
        {
            path: '/:fallback(.*)*',
            name: 'not-found',
            component: HomePage,
        },
    ],
})

router.beforeEach((to, from, next) => {
    const userStore = useUserStore()
    userStore.syncLocalData()

    if (to.name !== 'lang' && !userStore.isLangSet) next({name: 'lang'})
    else if (to.name !== 'login' && !userStore.isEmailSet) next({name: 'login'})
    else next()
})

export default router
