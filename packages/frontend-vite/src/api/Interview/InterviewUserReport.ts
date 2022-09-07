import { Expose, Transform, Type } from 'class-transformer'
import TopicReport from '@/api/Interview/TopicReport'

export interface IInterviewUserReport {
  id: string,
  user: string,
  topic_reports: TopicReport[],
  opinion_check: boolean,
}

export class InterviewUserReport implements IInterviewUserReport {
  @Expose()
  id: string = ''

  @Expose()
  user: string = ''

  @Expose()
  @Type(() => TopicReport)
  topic_reports: TopicReport[] = []

  @Expose()
  opinion_check: boolean = false

  constructor (data?: any) {
    if (data) {
      Object.assign(this, data)
    }
  }
}
