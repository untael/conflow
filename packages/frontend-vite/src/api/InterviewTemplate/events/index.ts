import InterviewTemplate from '@/api/InterviewTemplate/InterviewTemplate'

export enum InterviewTemplateEvents {
  Create = 'Create interview template',
  Edit = 'Edit interview template',
  Remove = 'Remove interview template',
  Add = 'Add interview template',
}

export type InterviewTemplateEventTypes = {
  [InterviewTemplateEvents.Create]: InterviewTemplate,
  [InterviewTemplateEvents.Edit]: InterviewTemplate,
  [InterviewTemplateEvents.Remove]: InterviewTemplate,
  [InterviewTemplateEvents.Add]: InterviewTemplate,
}
