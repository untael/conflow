import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import InterviewControlPage from '@/views/InterviewControlPage.vue'
import InterviewDisplayPage from '@/views/InterviewDisplayPage.vue'
import InterviewEditPage from '@/views/InterviewEditPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/interviews/:id',
    component: InterviewControlPage,
    children: [
      {
        name: 'Interview Display',
        path: '',
        component: InterviewDisplayPage,
      },
      {
        name: 'Interview Edit',
        path: 'edit',
        component: InterviewEditPage,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
