import { Expose } from 'class-transformer'

interface IUser {
  id: string;
  username?: string;
  email: string;
  phone_number?: string;
  provider?: string;
  blocked: boolean;
  confirmed: boolean;
  first_name?: string;
  last_name?: string;
}

export default class User implements IUser {
  @Expose()
  id: string = ''
  @Expose()
  username?: string = ''
  @Expose()
  email: string = ''
  @Expose()
  phone_number?: string = ''
  @Expose()
  provider?: string = ''
  @Expose()
  blocked: boolean = false
  @Expose()
  confirmed: boolean = false
  @Expose()
  first_name?: string = ''
  @Expose()
  last_name?: string = ''

  get endpoint (): string {
    return 'users'
  }

  get full_name () {
    return this.first_name && this.last_name ? `${this.first_name} ${this.last_name}` : this.username
  }

  constructor (data?: Partial<User>) {
    Object.assign(this, data)
  }

}
