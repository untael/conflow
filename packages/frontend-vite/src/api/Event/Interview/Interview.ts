import IEvent from '../Event'
import Event from '../Event'
import Candidate from '@/api/User/Candidate/Candidate'
import Employee from '@/api/User/Employee/Employee'
import Business from '@/api/Business/Business'
import { Expose, Type } from 'class-transformer'
import Question from "@/api/Question/Question";


export enum InterviewType {
  PreConversation = 'Preliminary conversation',
  Screening = 'Screening',
  Technical = 'Deep technical'
}

export const iterviewTypesIterator = [
  {
    name: InterviewType.PreConversation,
    value: 'pre_conversation',
    description: 'A small conversation in order to find out more details about the candidate',
    icon: 'person_search',
  },
  {
    name: InterviewType.Screening,
    value: 'tech_screening',
    description: 'Process of simultaneous testing and evaluation of the candidate\'s technical skills and abilities according to predefined parameters',
    icon: 'supervisor_account',
  },
  {
    name: InterviewType.Technical,
    value: 'deep_technical',
    description: 'A conversation to find out the technical level of the candidate. Might include verbal or practical set of tasks',
    icon: 'engineering',
  },
]


export enum CandidateLevel {
  Junior = 'Junior',
  JuniorPlus = 'Junior+',
  Middle = 'Middle',
  MiddlePlus = 'Middle+',
  Senior = 'Senior',
}

export const CandidateLevelIterator = [
  {
    name: CandidateLevel.Junior,
    value: 'junior',
  },
  {
    name: CandidateLevel.JuniorPlus,
    value: 'junior_plus',
  },
  {
    name: CandidateLevel.Middle,
    value: 'middle',
  },
  {
    name: CandidateLevel.MiddlePlus,
    value: 'middle_plus',
  },
  {
    name: CandidateLevel.Senior,
    value: 'senior',
  },
]

interface IInterview extends IEvent {
  type: InterviewType;
  candidate_level: CandidateLevel;
  candidate?: Candidate;
  recruiters?: Employee[];
  interviewers?: Employee[];
  business?: Business;
  questions?: Question[]
}

export default class Interview extends Event implements IInterview {
  @Expose()
  type: InterviewType = InterviewType.Technical

  @Expose()
  candidate_level: CandidateLevel = CandidateLevel.Junior

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

  get title (): string {
    return this.name ? this.name : `${this.candidate.full_name} interview`
  }
}
