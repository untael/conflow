import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import InterviewControlPage from '../views/InterviewControlPage.vue'
import CfAuthPage from '../views/CfAuthPage.vue'
import CfAppWrapper from '../components/layout/CfAppWrapper.vue'
import CfInterviewProcessPage from '../views/CfInterviewProcessPage.vue'
import CfInterviewResultsPage from '@/views/CfInterviewResultsPage.vue'
import CfQuestionPage from '@/views/CfQuestionPage.vue'
import CfInterviewPage from '@/views/CfInterviewPage.vue'
import CfTagsList from '@/components/tag/CfTagsList.vue'
import CfAddTagForm from '@/components/tag/CfAddTagForm.vue'
import CfCodeBlock from '@/components/CfCodeBlock.vue'
import CfInterviewWizard from '@/components/interview/CfInterviewWizard.vue'
import CfInterviewTemplatePage from '@/views/CfInterviewTemplatePage.vue'
import CfNotFound from '@/components/CfNotFound.vue'
import CfQuestionsListPanelWrapper
  from '@/components/question/panels/CfQuestionsListPanelWrapper.vue'
import CfInterviewTemplateCreatePanelWrapper
  from '@/components/interview/template/CfInterviewTemplateCreatePanelWrapper.vue'
import CfQuestionEditPanelWrapper
  from '@/components/question/panels/CfQuestionEditPanelWrapper.vue'
import CfInterviewEditPanelWrapper
  from '@/components/interview/CfInterviewEditPanelWrapper.vue'
import CfInterviewListPanelWrapper
  from '@/components/interview/CfInterviewListPanelWrapper.vue'
import CfDashboardPanelWrapper
  from '@/components/dashboard/CfDashboardPanelWrapper.vue'
import CfQuestionsDashboardPanelWrapper
  from '@/components/question/panels/CfQuestionsDashboardPanelWrapper.vue'
import CfInterviewDashboardPanelWrapper
  from '@/components/interview/CfInterviewDashboardPanelWrapper.vue'
import CfInterviewTemplateListPanelWrapper
  from '@/components/interview/template/CfInterviewTemplateListPanelWrapper.vue'
import CfProvidersRedirect from '@/views/CfProvidersRedirect.vue'
import CfUserProfilePanelWrapper
  from '@/components/profile/panels/CfUserProfilePanelWrapper.vue'
import CfInterviewPreviewPanelWrapper
  from '@/components/interview/CfInterviewPreviewPanelWrapper.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    component: CfAppWrapper,
    children: [
      {
        path: '/:pathMatch(.*)*',
        name: 'Not found',
        component: CfNotFound,
      },
      {
        path: '',
        name: 'Dashboard',
        component: CfDashboardPanelWrapper,
      },
      {
        path: '/codeBlock',
        name: 'CfCodeBlock',
        component: CfCodeBlock,
      },
      {
        path: '/tags',
        name: 'CfTagsList',
        component: CfTagsList,
      },
      {
        path: '/me/profile',
        name: 'User profile',
        component: CfUserProfilePanelWrapper,
      },
      {
        path: '/addTag',
        name: 'AddTagForm',
        component: CfAddTagForm,
      },
      // {
      //     path: '/interviewWizard',
      //     name: 'InterviewWizard',
      //     component: CfInterviewWizard,
      // },
      {
        path: '/questions',
        name: 'Questions page',
        component: CfQuestionPage,
        children: [
          {
            path: '',
            name: 'Questions dashboard',
            component: CfQuestionsDashboardPanelWrapper,
          },
          {
            path: 'new',
            name: 'Question create',
            component: CfQuestionEditPanelWrapper,
          },
          {
            path: ':id',
            name: 'Question edit',
            component: CfQuestionEditPanelWrapper,
          },
          {
            path: 'list',
            name: 'Questions list',
            component: CfQuestionsListPanelWrapper,
          },
          {
            path: 'list/editable',
            name: 'Question list editable',
            component: CfQuestionsListPanelWrapper,
            props: {
              editable: true,
            },
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
            component: CfInterviewDashboardPanelWrapper,
          },
          {
            path: 'new',
            name: 'Interview create',
            component: CfInterviewEditPanelWrapper,
          },
          {
            path: ':id',
            name: 'Interview display',
            component: CfInterviewEditPanelWrapper,
            props: {
              editable: false,
            },
          },
          {
            path: ':id/edit',
            name: 'Interview edit',
            component: CfInterviewEditPanelWrapper,
          },
          {
            path: ':id/process',
            name: 'Interview preview',
            component: CfInterviewPreviewPanelWrapper,
          },
          {
            path: 'list',
            name: 'Interviews list',
            component: CfInterviewListPanelWrapper,
          },
          {
            path: 'list/editable',
            name: 'Interviews list editable',
            component: CfInterviewListPanelWrapper,
            props: { editable: true },
          },
          {
            path: 'instant',
            name: 'Interview wizard',
            component: CfInterviewWizard,
          },
          {
            path: 'templates',
            name: 'Interview template',
            component: CfInterviewTemplatePage,
            children: [
              {
                path: 'list',
                name: 'Interview template list',
                component: CfInterviewTemplateListPanelWrapper,
              },
              {
                path: 'list/editable',
                name: 'Interview template list editable',
                component: CfInterviewTemplateListPanelWrapper,
                props: {
                  editable: true,
                },
              },
              {
                path: 'new',
                name: 'Interview template create',
                component: CfInterviewTemplateCreatePanelWrapper,
              },
            ],
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
              // {
              //   name: 'Interview Edit',
              //   path: 'edit',
              //   component: InterviewEditPage,
              // },
              {
                name: 'Interview Results',
                path: 'results',
                component: CfInterviewResultsPage,
              },
            ],
          },
        ],
      },
      {
        path: '/sign-up',
        name: 'Sign up',
        component: CfAuthPage,
        props: {
          mode: 'sign-up',
        },
      },
      {
        path: '/sign-in',
        name: 'Login',
        component: CfAuthPage,
        props: {
          mode: 'sign-in',
        },
      },
      {
        path: '/reset-password',
        name: 'Reset password',
        component: CfAuthPage,
        props: {
          mode: 'reset-password',
        },
      },
      {
        path: '/auth/github/callback',
        name: 'Github redirect',
        component: CfProvidersRedirect,
        props: {
          provider: 'github',
        },
      },
      {
        path: '/auth/google/callback',
        name: 'Google redirect',
        component: CfProvidersRedirect,
        props: {
          provider: 'google',
        },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
