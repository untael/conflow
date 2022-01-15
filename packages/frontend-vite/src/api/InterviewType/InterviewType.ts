import { InterviewTypeEnum } from '@/api/Interview/Interview'
import { Expose } from 'class-transformer'

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
}
