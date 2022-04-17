import IEvent from '../Event/Event'
import Event from '../Event/Event'
import Candidate from '@/api/User/Candidate/Candidate'
import Employee from '@/api/User/Employee/Employee'
import Business from '@/api/Business/Business'
import Question from '@/api/Question/Question'
import { Expose, Transform, Type } from 'class-transformer'
import InterviewType from '@/api/InterviewType/InterviewType'
import CandidateLevel from '@/api/CandidateLevel/CandidateLevel'
import InterviewTemplate from '@/api/InterviewTemplate/InterviewTemplate'


export enum InterviewTypeEnum {
  PreConversation = 'Preliminary conversation',
  Screening = 'Screening',
  Technical = 'Deep technical'
}

export const interviewTypesIterator = [
  {
    name: InterviewTypeEnum.PreConversation,
    value: 'pre_conversation',
    description: 'A small conversation in order to find out more details about the candidate',
    icon: 'person_search',
  },
  {
    name: InterviewTypeEnum.Screening,
    value: 'tech_screening',
    description: 'Process of simultaneous testing and evaluation of the candidate\'s technical skills and abilities according to predefined parameters',
    icon: 'supervisor_account',
  },
  {
    name: InterviewTypeEnum.Technical,
    value: 'deep_technical',
    description: 'A conversation to find out the technical level of the candidate. Might include verbal or practical set of tasks',
    icon: 'engineering',
  },
]


export enum CandidateLevelEnum {
  Junior = 'Junior',
  JuniorPlus = 'Junior+',
  Middle = 'Middle',
  MiddlePlus = 'Middle+',
  Senior = 'Senior',
}

export const candidateLevelIterator = [
  {
    name: CandidateLevelEnum.Junior,
    value: 'junior',
  },
  {
    name: CandidateLevelEnum.JuniorPlus,
    value: 'junior_plus',
  },
  {
    name: CandidateLevelEnum.Middle,
    value: 'middle',
  },
  {
    name: CandidateLevelEnum.MiddlePlus,
    value: 'middle_plus',
  },
  {
    name: CandidateLevelEnum.Senior,
    value: 'senior',
  },
]

export enum InterviewStatusEnum {
  Incoming = 'incoming',
  InProgress = 'in_progress',
  Finished = 'finished',
  Cancelled = 'cancelled'
}

type InterviewStatus =
  InterviewStatusEnum.Incoming
  | InterviewStatusEnum.InProgress
  | InterviewStatusEnum.Finished
  | InterviewStatusEnum.Cancelled

interface IInterview extends IEvent {
  id: string,
  type: InterviewType | null;
  candidate_levels?: CandidateLevel[];
  candidate?: Candidate | string;
  recruiters?: Employee[];
  interviewers?: Employee[];
  // business?: Business;
  questions?: Question[];
  note?: string;
  interviewTemplate?: InterviewTemplate | null;
  status: InterviewStatus;
}

export default class Interview extends Event implements IInterview {
  @Expose()
  id: string = ''

  @Expose()
  @Type(() => InterviewType)
  @Transform(({ value }) => value.id, { toPlainOnly: true })
  type: InterviewType | null = null

  @Expose()
  @Type(() => CandidateLevel)
  @Transform(({ value }) => value.map((level: Question) => level.id), { toPlainOnly: true })
  candidate_levels: CandidateLevel[] = []

  @Expose()
  @Type(() => Candidate)
  @Transform(({ value }) => value, { toPlainOnly: true })
  candidate: Candidate | string = ''

  @Expose()
  @Type(() => Employee)
  recruiters: Employee[] = []

  @Expose()
  @Type(() => Employee)
  @Transform(({ value }) => value.map((interviewer: Question) => interviewer.id), { toPlainOnly: true })
  interviewers: Employee[] = []

  // @Expose()
  // business: Business = new Business()

  @Expose()
  @Type(() => Question)
  @Transform(({ value }) => value.map((question: Question) => question.id), { toPlainOnly: true })
    // @Transform(({ value }) => value.map((question: Question) => {
    //   return {
    //     ...question,
    //     is_template_question: true,
    //   }
    // }), { toClassOnly: true })
  questions: Question[] = []

  @Expose()
  note: string = ''

  @Expose({ toClassOnly: true })
  @Type(() => InterviewTemplate)
  interviewTemplate: InterviewTemplate | null = null

  @Expose()
  status: InterviewStatus = InterviewStatusEnum.Incoming

  discardInterviewTemplate () {
    if (this.interviewTemplate?.name === this.name) {
      this.name = ''
    }
    if (this.interviewTemplate?.type.id === this.type?.id) {
      this.type = null
    }
    this.candidate_levels = []
    this.questions = this.questions.filter((question) => !question.is_template_question)
    this.interviewTemplate = null
  }

  applyInterviewTemplate (interviewTemplate: InterviewTemplate) {
    this.interviewTemplate = interviewTemplate

    if (!this.name) {
      this.name = interviewTemplate.name
    }
    if (!this.type) {
      this.type = interviewTemplate.type
    }
    if (this.candidate_levels.length === 0) {
      this.candidate_levels = [...interviewTemplate.candidate_levels]
    }
    if (this.questions.length === 0) {
      this.questions = [...interviewTemplate.questions]
    } else {
      this.questions = this.questions.concat(
        interviewTemplate.questions.filter((question) => {
          for (let q of this.questions) {
            if (q.id === question.id)
              return false
          }
          return true
        }))
    }
  }

  get title (): string {
    if (this.candidate instanceof Candidate) {
      return this.name ? this.name : `${this.candidate.username} interview`
    }
    return this.name ? this.name : `${this.candidate} interview`
  }

  get endpoint (): string {
    return 'interviews'
  }
}
