import IUser from '@/api/User/User'
import User from '@/api/User/User'
import { UserRole } from '@/api/User/UserRole'

interface ICandidate extends IUser {
  role: UserRole;
}

export default class Candidate extends User implements ICandidate {
  role: UserRole = UserRole.Candidate
}
