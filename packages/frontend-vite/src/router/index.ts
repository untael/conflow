import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import InterviewControlPage from '../views/InterviewControlPage.vue'
import InterviewDisplayPage from '../views/InterviewDisplayPage.vue'
import InterviewEditPage from '../views/InterviewEditPage.vue'
import CfAuthPage from '../views/CfAuthPage.vue'
import CfAppWrapper from '../components/layout/CfAppWrapper.vue'
import CfInterviewForm from '../components/interview/CfInterviewForm.vue'
import CfInterviewProcessPage from '../views/CfInterviewProcessPage.vue'
import CfQuestionForm from '../components/question/CfQuestionForm.vue'
import CfInterviewResultsPage from '@/views/CfInterviewResultsPage.vue'
import CfAnswerForm from "../components/answer/CfAnswerForm.vue";
import CfAddQuestionForm from "../components/question/CfQuestionCreateForm.vue"

const routes: Array<RouteRecordRaw> = [
    {
        path: '',
        component: CfAppWrapper,
        children: [
            {
                path: '/addQuestion',
                name: 'addQuestionForm',
                component: CfAddQuestionForm,
            },
            {
                path: '/question',
                name: 'question',
                component: CfQuestionForm,
            },
            {
                path: '/answer',
                name: 'answer',
                component: CfAnswerForm,
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
