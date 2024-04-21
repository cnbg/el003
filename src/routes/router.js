import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/userStore';

import StartPage from '@/pages/StartPage.vue'
import BookListPage from '@/pages/book/BookListPage.vue'
import BookShowPage from '@/pages/book/BookShowPage.vue'
import UserSettingsPage from '@/pages/user/UserSettingsPage.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'start',
            component: StartPage,
        },
        {
            path: '/book/list',
            name: 'book-list',
            component: BookListPage,
        },
        {
            path: '/book/show/:bookId',
            name: 'book-show',
            component: BookShowPage,
            props: true,
        },
        {
            path: '/user/settings',
            name: 'user-settings',
            component: UserSettingsPage,
        },
        {
            path: '/:fallback(.*)*',
            name: 'not-found',
            component: StartPage,
        },
    ],
})

router.beforeEach((to, from) => {
    const userStore = useUserStore()
    userStore.syncSettings()

    if (to.name !== 'start' && (userStore.isEmptyLocale || userStore.isEmptyEmail)) return {name: 'start'}
})

export default router
