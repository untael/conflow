import { Expose, Transform } from 'class-transformer'
import Tag from '@/api/Question/Tag'
import { js_beautify as jsFormatter } from 'js-beautify'

interface IQuestion {
  id: string;
  name: string
  description: string
  answer?: string
  mark?: number
  rating?: number
  code?: string
  type: string
  tags: string[]
  is_template_question: boolean
}

export default class Question implements IQuestion {
  @Expose()
  id = ''
  @Expose()
  name = ''
  @Expose()
  description = ''
  @Expose()
  answer?: string = ''
  @Expose()
  rating?: number = 0
  @Expose()
  @Transform(({ value }) => jsFormatter(value, { indent_size: 2 }))
  code?: string = ''
  @Expose()
  type: string = ''
  @Expose()
  @Transform(({ value }) => value.map((tag: Tag) => tag.id), { toPlainOnly: true })
  tags: string[] = []
  is_template_question: boolean = false


  get endpoint (): string {
    return 'questions'
  }

  constructor (data?: any) {
    if (data) {
      Object.assign(this, data)
    }
  }
}
