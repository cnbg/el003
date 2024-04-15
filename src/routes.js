import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/pages/HomePage.vue'),
        },
        {
            path: '/quiz',
            name: 'quiz-list',
            component: () => import('@/pages/quiz/ListQuizPage.vue'),
        },
        {
            path: '/quiz/:id',
            name: 'quiz-show',
            component: () => import('@/pages/quiz/ShowQuizPage.vue'),
            props: true,
        },
        {
            path: '/:fallback(.*)*',
            name: 'not-found',
            component: () => import('@/pages/error/404Page.vue'),
        },
    ],
})

export default router
