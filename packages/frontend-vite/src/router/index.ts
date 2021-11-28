import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import InterviewControlPage from '../views/InterviewControlPage.vue'
import InterviewDisplayPage from '../views/InterviewDisplayPage.vue'
import InterviewEditPage from '../views/InterviewEditPage.vue'
import CfAuthPage from '../views/CfAuthPage.vue'
import CfAppWrapper from '../components/layout/CfAppWrapper.vue'
import CfInterviewForm from '../components/interview/CfInterviewForm.vue'
import CfInterviewProcessPage from '../views/CfInterviewProcessPage.vue'
import CfInterviewResultsPage from '@/views/CfInterviewResultsPage.vue'
import CfAnswerForm from '../components/answer/CfAnswerForm.vue'
import CfAddQuestionCreateForm
  from '../components/question/CfQuestionCreateForm.vue'
import CfQuestionPage from '@/views/CfQuestionPage.vue'
import CfInterviewPage from '@/views/CfInterviewPage.vue'
import CfQuestionsDashboardPage from '@/views/CfQuestionsDashboardPage.vue'
import CfQuestionList from '@/components/question/CfQuestionList.vue'
import CfInterviewDashboardPage from '@/views/CfInterviewDashboardPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    component: CfAppWrapper,
    children: [
      {
        path: '/questions',
        name: 'Questions page',
        component: CfQuestionPage,
        children: [
          {
            path: '',
            name: 'Questions dashboard',
            component: CfQuestionsDashboardPage,
          },
          {
            path: 'new',
            name: 'Question create',
            component: CfAddQuestionCreateForm,
          },
          {
            path: 'list',
            name: 'Questions list',
            component: CfQuestionList,
          },
        ],
      },
      {
        path: '/interviews',
        name: 'Interviews page',
        component: CfInterviewPage,
        children: [
          {
            path: '',
            name: 'Interviews dashboard',
            component: CfInterviewDashboardPage,
          },
          {
            path: 'new',
            name: 'Interview create',
            component: CfAddQuestionCreateForm,
          },
          {
            path: 'list',
            name: 'Interviews list',
            component: CfQuestionList,
          },
          {
            path: ':id',
            name: 'Interview control',
            component: InterviewControlPage,
            children: [
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
              {
                name: 'Interview Results',
                path: 'results',
                component: CfInterviewResultsPage,
              },
            ]
          }
        ],
      },
    ],
  },
  {
    path: '/answer',
    name: 'Answers',
    component: CfAnswerForm,
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
  history: createWebHistory(),
  routes,
})

export default router
