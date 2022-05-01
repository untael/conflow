import Question from '@/api/Question/Question'
import { Expose, Transform, Type } from 'class-transformer'

export interface IInterviewQuestion {
  id: string,
  question: Question,
  date_start: Date | null,
  date_end: Date | null,
  time_spent: number
  mark?: number
}

export default class InterviewQuestion implements IInterviewQuestion {
  @Expose()
  id = ''
  @Expose()
  @Type(() => Question)
  @Transform(({ value }) => value.map((question: Question) => question.id), { toPlainOnly: true })
  question = ''
  @Expose()
  mark?: number = 0
  @Expose()
  date_start: Date | null = null
  @Expose()
  date_end: Date | null = null
  @Expose()
  @Transform(({ value }) => +value)
  time_spent: number = 0

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

  get endpoint (): string {
    return 'interview_questions'
  }
}