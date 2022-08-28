import Question from '@/api/Question/Question'

export enum QuestionEvents {
  Create = 'Create question',
  Edit = 'Edit question',
  Remove = 'Remove question',
  Add = 'Add question',
  Update = 'Update question'
}

export type QuestionEventTypes = {
  [QuestionEvents.Create]: Question,
  [QuestionEvents.Edit]: Question,
  [QuestionEvents.Remove]: Question,
  [QuestionEvents.Add]: Question,
  [QuestionEvents.Update]: Question,
}
