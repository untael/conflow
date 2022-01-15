import Question from '@/api/Question/Question'
import { Expose, Transform } from 'class-transformer'
import CandidateLevel from '@/api/CandidateLevel/CandidateLevel'
import InterviewType from '@/api/InterviewType/InterviewType'

interface IInterviewTemplate {
  id: string,
  name: string,
  questions: Question[],
  candidate_level: CandidateLevel;
  type: InterviewType;
}

export default class InterviewTemplate implements IInterviewTemplate {
  @Expose()
  id: string = ''
  @Expose()
  name: string = ''
  @Expose()
  @Transform(({ value }) => value.map((question: Question) => question.id), { toPlainOnly:true })
  questions: Question[] = []
  @Expose()
  @Transform(({ value }) => value.map((level: CandidateLevel) => level.id), { toPlainOnly:true })
  candidate_level: CandidateLevel = new CandidateLevel()
  @Expose()
  @Transform(({ value }) => value.map((type: InterviewType) => type.id), { toPlainOnly:true })
  type: InterviewType = new InterviewType()
}
