import Question from '@/api/Question/Question'

export enum QuestionEvents {
  Create = 'Create question',
  Edit = 'Edit question',
  Remove = 'Remove question',
  Add = 'Add question',
}

export type QuestionEventTypes = {
  [QuestionEvents.Create]: Question,
  [QuestionEvents.Edit]: Question,
  [QuestionEvents.Remove]: Question,
  [QuestionEvents.Add]: Question,
}
