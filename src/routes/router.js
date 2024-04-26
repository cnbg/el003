import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/userStore'

import StartPage from '../pages/StartPage.vue'
import BookListPage from '../pages/book/BookListPage.vue'
import BookEditPage from '../pages/book/BookEditPage.vue'
import BookViewPage from '../pages/book/BookViewPage.vue'
import UserSettingsPage from '../pages/user/UserSettingsPage.vue'

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
            path: '/book/edit/:bookId',
            name: 'book-edit',
            component: BookEditPage,
            props: true,
        },
        {
            path: '/book/view/:bookId',
            name: 'book-view',
            component: BookViewPage,
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
    const user = useUserStore()

    if (to.name !== 'start' && (!user.email || !user.locale)) return {name: 'start'}
})

export default router
