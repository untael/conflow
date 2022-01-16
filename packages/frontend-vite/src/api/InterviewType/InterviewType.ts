import { InterviewTypeEnum } from '@/api/Interview/Interview'
import { Expose, Transform } from 'class-transformer'

interface IInterviewType {
  id: string,
  name: InterviewTypeEnum,
  icon: string,
}

export default class InterviewType implements IInterviewType {
  @Expose()
  id: string = ''
  @Expose()
  name: InterviewTypeEnum = InterviewTypeEnum.Technical
  @Expose()
  icon: string = ''

  get value (): string {
    return this.name.split(/(?=[A-Z])/).join('-').toLowerCase()
  }

  get endpoint (): string {
    return 'interview-types'
  }

}
