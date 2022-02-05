import { Expose } from 'class-transformer'

export default interface IUser {
  id: string;
  username: string;
  email: string;
  phone_number?: string;
  provider?: string;
  blocked: boolean;
  confirmed: boolean;
}

export default class User implements IUser {
  @Expose()
  id: string = ''
  @Expose()
  username: string = ''
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
}
