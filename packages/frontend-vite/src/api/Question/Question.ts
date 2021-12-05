import { Expose, Transform, Type } from 'class-transformer'
import Tag from '@/api/Question/Tag'
import { js_beautify as jsFormatter } from 'js-beautify'

export default interface IQuestion {
  id: string;
  name: string
  description: string
  answer?: string
  mark?: number
  rating?: number
  code?: string
  date_start: Date | null
  date_end: Date | null
  time_spent: number
  type: string
  tags: string[]
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
  mark?: number = 0
  @Expose()
  rating?: number = 0
  @Expose()
  @Transform(({ value }) => jsFormatter(value, { indent_size: 2 }))
  code?: string = ''
  @Expose()
  date_start: Date | null = null
  @Expose()
  date_end: Date | null = null
  @Expose()
  @Transform(({ value }) => +value)
  time_spent: number = 0
  time_spent_description: string = ''
  @Expose()
  type: string = ''
  @Expose()
  @Transform(({ value }) => value.map((tag: Tag) => tag.id), { toPlainOnly:true })
  tags: string[] = []

  get is_in_progress () {
    return !!this.date_start
  }

  get is_completed () {
    return !!this.time_spent
  }

  start () {
    this.date_start = new Date()
  }

  end () {
    this.date_end = new Date()
    if (this.date_end && this.date_start) {
      this.time_spent = Number(this.date_end) - Number(this.date_start)
    }
  }

  get formatted_time_spent () {
    const minutes = Math.round(this.time_spent / 60000)
    const seconds = Math.round((this.time_spent % 60000) / 1000)
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
  }

  constructor (data?: any) {
    if (data) {
      Object.assign(this, data)
    }
  }
}
