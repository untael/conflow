import IEvent from '../Event'
import Event from '../Event'
import Candidate from '@/api/User/Candidate/Candidate'
import Employee from '@/api/User/Employee/Employee'
import Business from '@/api/Business/Business'
import { Expose, Type } from 'class-transformer'

interface IInterview extends IEvent {
  candidate: Candidate;
  recruiters: Employee[];
  interviewers: Employee[];
  business: Business;
}

export default class Interview extends Event implements IInterview {
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
