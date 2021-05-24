import { Expose } from 'class-transformer'

export default interface IUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: string;
}

export default class User implements IUser {
  @Expose()
  id = ''
  @Expose()
  first_name = ''
  @Expose()
  last_name = ''
  @Expose()
  email = ''
  @Expose()
  phone_number?: string = ''
}
