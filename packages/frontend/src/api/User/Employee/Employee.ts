import IUser from '@/api/User/User'
import User from '@/api/User/User'
import { BusinessRole } from '@/api/Business/BusinessRole'
import Business from '@/api/Business/Business'

interface IEmployee extends IUser {
  business: Business;
  role: BusinessRole;
}

export default class Employee extends User implements IEmployee {
  business: Business = new Business()
  role: BusinessRole = BusinessRole.Employee
}
