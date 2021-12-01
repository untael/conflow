import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import InterviewControlPage from '../views/InterviewControlPage.vue'
import InterviewDisplayPage from '../views/InterviewDisplayPage.vue'
import CfInterviewEditForm from '../components/interview/CfInterviewEditForm.vue'
import CfAuthPage from '../views/CfAuthPage.vue'
import CfAppWrapper from '../components/layout/CfAppWrapper.vue'
import CfInterviewForm from '../components/interview/CfInterviewForm.vue'
import CfInterviewProcessPage from '../views/CfInterviewProcessPage.vue'
import CfInterviewResultsPage from '@/views/CfInterviewResultsPage.vue'
import CfAnswerForm from '../components/answer/CfAnswerForm.vue'
import CfAddQuestionEditForm
    from '../components/question/CfQuestionEditForm.vue'
import CfQuestionPage from '@/views/CfQuestionPage.vue'
import CfInterviewPage from '@/views/CfInterviewPage.vue'
import CfQuestionsDashboardPage from '@/views/CfQuestionsDashboardPage.vue'
import CfQuestionsList from '@/components/question/CfQuestionsList.vue'
import CfTagsList from '@/components/tag/CfTagsList.vue'
import CfInterviewDashboardPage from '@/views/CfInterviewDashboardPage.vue'
import CfDashboard from '@/views/CfDashboard.vue'
import CfAddTagForm from '@/components/tag/CfAddTagForm.vue'
import CfInterviewWizard from '@/components/CfInterviewWizard.vue'
import CfCodeBlock from '@/components/CfCodeBlock.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '',
        component: CfAppWrapper,
        children: [
            {
                path: '',
                name: 'Dashboard',
                component: CfDashboard,
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
                path: '/addTag',
                name: 'AddTagForm',
                component: CfAddTagForm,
            },
            {
                path: '/interviewWizard',
                name: 'InterviewWizard',
                component: CfInterviewWizard,
            },
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
                        component: CfAddQuestionEditForm,
                    },
                    {
                        path: 'list',
                        name: 'Questions list',
                        component: CfQuestionsList,
                    },
                    {
                        path: 'process',
                        name: 'Interview process',
                        component: CfInterviewProcessPage,
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
                        component: CfInterviewEditForm,
                    },
                    {
                        path: 'list',
                        name: 'Interviews list',
                        component: CfQuestionsList,
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
                        ]
                    }
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
        ],
    },
    {
        path: '/answer',
        name: 'Answers',
        component: CfAnswerForm,
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
