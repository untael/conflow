import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import InterviewControlPage from '../views/InterviewControlPage.vue'
import InterviewDisplayPage from '../views/InterviewDisplayPage.vue'
import InterviewEditPage from '../views/InterviewEditPage.vue'
import CfAuthPage from '../views/CfAuthPage.vue'
import CfAppWrapper from '../views/CfAppWrapper.vue'
import CfInterviewForm from '../views/CfInterviewForm.vue'
import CfInterviewProcessPage from '@/views/CfInterviewProcessPage.vue'
import CfQuestionForm from '../components/question/CfQuestionForm.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    component: CfAppWrapper,
    children: [
      {
        path: '/question',
        name: 'question',
        component: CfQuestionForm,
      },
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
            name: 'Interview Process',
            path: 'started',
            component: CfInterviewProcessPage,
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
  // {
  //   path: '*',
  //   redirect: '/error',
  // },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
