import { QuestionEventTypes } from '@/api/Question/events'
import { InterviewTemplateEventTypes, } from '@/api/InterviewTemplate/events'

export type Events = QuestionEventTypes & InterviewTemplateEventTypes
