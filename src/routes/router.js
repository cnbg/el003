import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/user'

import HomePage from '../pages/HomePage.vue'
import BookListPage from '../pages/book/ListPage.vue'
import BookCreatePage from '../pages/book/CreatePage.vue'
import BookEditPage from '../pages/book/EditPage.vue'
import BookViewPage from '../pages/book/ViewPage.vue'
import UserSettingsPage from '../pages/user/SettingsPage.vue'
import NotFoundPage from '../components/error/NotFoundPage.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage,
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
            component: NotFoundPage,
        },
    ],
})

router.beforeEach((to, from) => {
    const userSt = useUserStore()
    userSt.syncLocalStorage()

    if (to.name !== 'home' && (!userSt.name || !userSt.email || !userSt.locale)) return {name: 'home'}
})

export default router
