import IEvent from '../Event/Event'
import Event from '../Event/Event'
import Candidate from '@/api/User/Candidate/Candidate'
import Employee from '@/api/User/Employee/Employee'
import Business from '@/api/Business/Business'
import Question from "@/api/Question/Question"
import { Expose, Type } from 'class-transformer'
import InterviewType from '@/api/InterviewType/InterviewType'
import CandidateLevel from '@/api/CandidateLevel/CandidateLevel'


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

interface IInterview extends IEvent {
  type: InterviewType;
  candidate_level: CandidateLevel[];
  candidate?: Candidate;
  recruiters?: Employee[];
  interviewers?: Employee[];
  business?: Business;
  questions?: Question[]
}

export default class Interview extends Event implements IInterview {
  @Expose()
  type: InterviewType = new InterviewType()

  @Expose()
  candidate_level: CandidateLevel[] = []

  @Expose()
  @Type(() => Candidate)
  candidate: Candidate = new Candidate()

  @Expose()
  @Type(() => Employee)
  recruiters: Employee[] = []

  @Expose()
  @Type(() => Employee)
  interviewers: Employee[] = []

  @Expose()
  business: Business = new Business()

  @Expose()
  @Type(() => Question)
  questions: Question[] = []

  get title (): string {
    return this.name ? this.name : `${this.candidate.full_name} interview`
  }
}
