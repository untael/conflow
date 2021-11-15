import { Expose } from 'class-transformer'

export default interface IQuestion {
  id: string;
  name: string
  description: string
  answer?: string
  mark?: string
  rating?: string
  code?: any
  date_start: Date | null
  date_end: Date | null
  time_spent: number
  type: string
  tags: string[]
  readonly is_completed: boolean
  readonly is_in_progress: boolean
  readonly start: () => void
  readonly end: () => void
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
  mark?: string = ''
  @Expose()
  rating?: string = ''
  @Expose()
  code?: any
  @Expose()
  date_start: null
  @Expose()
  date_end: null
  @Expose()
  time_spent: number = 0
  time_spent_description: string = ''
  @Expose()
  type: string = ''
  @Expose()
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
    this.time_spent = this.date_end - this.date_start
  }

  constructor (data: any) {
    Object.assign(this, data)
  }
}
