import { Expose, Transform } from 'class-transformer'

export default interface IEvent {
  id: string;
  name: string;
  date: Date;
  created_at?: Date;
  finished_at?: Date;
}

export default class Event implements IEvent {
  @Expose()
  id = ''
  @Expose()
  name = ''
  @Expose()
  @Transform((value: any) => {
    return Date.parse(value)
  })
  date: Date = new Date()
  @Expose()
  @Transform((value: any) => {
    return Date.parse(value)
  })
  created_at?: Date = new Date()
  @Expose()
  @Transform((value: any) => {
    return Date.parse(value)
  })
  finished_at?: Date = new Date()
}
