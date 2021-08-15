import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import InterviewControlPage from '@/views/InterviewControlPage.vue'
import InterviewDisplayPage from '@/views/InterviewDisplayPage.vue'
import InterviewEditPage from '@/views/InterviewEditPage.vue'
import CfAuthPage from '@/views/CfAuthPage.vue'
import CfAppWrapper from '@/views/CfAppWrapper.vue'
import Test from '@/views/test.vue'
import CfInterviewForm from '@/views/CfInterviewForm.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    component: CfAppWrapper,
    children: [
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
    ],
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: CfAuthPage,
    props: {
      mode: 'sign-up',
    },
  },
  {
    path: '/sign-in',
    name: 'sign-in',
    component: CfAuthPage,
    props: {
      mode: 'sign-in',
    },
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: CfAuthPage,
    props: {
      mode: 'reset-password',
    },
  },
  {
    path: '/interview',
    name: 'interview',
    component: CfInterviewForm,
  },
  {
    path: '/test',
    name: 'test',
    component: Test,
  },
  // {
  //   path: '*',
  //   redirect: '/error',
  // },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
