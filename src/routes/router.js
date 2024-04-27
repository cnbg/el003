import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/user'

import StartPage from '../pages/StartPage.vue'
import BookListPage from '../pages/book/ListPage.vue'
import BookCreatePage from '../pages/book/CreatePage.vue'
import BookEditPage from '../pages/book/EditPage.vue'
import BookViewPage from '../pages/book/ViewPage.vue'
import UserSettingsPage from '../pages/user/SettingsPage.vue'

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
            path: '/book/create',
            name: 'book-create',
            component: BookCreatePage,
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
