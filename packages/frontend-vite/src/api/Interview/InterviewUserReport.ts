import User from '@/api/User/User'
import { Expose, Transform, Type } from 'class-transformer'

export type TopicReport = {
  name: string
  mark: number
  note: string
}

export interface IInterviewUserReport {
  id: string,
  user: User,
  topic_report: TopicReport[],
  opinion_check: boolean,
}

export class InterviewUserReport implements IInterviewUserReport {
  @Expose()
  id: string = ''

  @Expose()
  @Transform(({ value }) => value.map((user: User) => user.id), { toPlainOnly: true })
  user: User = new User()

  @Expose()
  topic_report: TopicReport[] = []

  @Expose()
  opinion_check: boolean = false

  constructor (data?: any) {
    if (data) {
      Object.assign(this, data)
    }
  }
}
