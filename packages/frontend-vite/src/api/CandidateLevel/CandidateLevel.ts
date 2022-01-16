import { CandidateLevelEnum } from '@/api/Interview/Interview'
import { Expose, Transform } from 'class-transformer'

interface ICandidateLevel {
  id: string,
  name: CandidateLevelEnum,
  icon: string,
}

export default class CandidateLevel implements ICandidateLevel {
  @Expose()
  id: string = ''
  @Expose()
  name: CandidateLevelEnum = CandidateLevelEnum.Junior
  @Expose()
  icon: string = ''
  get value(): string {
    return this.name.split(/(?=[A-Z])/).join('-').toLowerCase()
  }
}
