import IUser from '@/api/User/User'
import User from '@/api/User/User'
import Business from '@/api/Business/Business'
import Employee from '@/api/User/Employee/Employee'

interface IOwner extends IUser {
  business: Business;
  employees: Employee[];
}

export default class Owner extends User implements IOwner {
  business: Business = new Business()
  employees: Employee[] = []
}
