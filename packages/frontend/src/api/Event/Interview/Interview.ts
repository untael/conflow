import IEvent from '../Event'
import Event from '../Event'
import Candidate from '@/api/User/Candidate/Candidate'
import Employee from '@/api/User/Employee/Employee'
import Business from '@/api/Business/Business'
import { Expose } from 'class-transformer'

interface IInterview extends IEvent {
  candidates: Candidate[];
  recruiters: Employee[];
  interviewers: Employee[];
  business: Business;
}

export default class Interview extends Event implements IInterview {
  @Expose()
  candidates: Candidate[] = []
  @Expose()
  recruiters: Employee[] = []
  @Expose()
  interviewers: Employee[] = []
  @Expose()
  business: Business = new Business()
}
