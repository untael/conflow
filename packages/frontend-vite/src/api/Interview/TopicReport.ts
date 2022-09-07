import { Expose } from 'class-transformer'

export interface ITopicReport {
  id: string,
  name: string
  mark: number
  note: string
}

export default class TopicReport implements ITopicReport {
  @Expose()
  id: string = ''
  @Expose()
  name: string = ''
  @Expose()
  mark: number = 0
  @Expose()
  note: string = ''
}
