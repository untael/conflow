import { Expose, Transform } from 'class-transformer'

const options: any = { year: 'numeric', month: 'short', day: 'numeric' }

export default interface IEvent {
  id: string;
  name: string;
  time: Date;
  date: Date;
  created_at: Date;
  finished_at: Date;
  duration: number;
}

export default class Event implements IEvent {
  @Expose()
  id = ''

  @Expose()
  name = ''

  @Expose({ name: '_date' })
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  date: Date = new Date()

  @Expose({ name: 'time' })
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  time: Date = new Date()

  @Expose({ name: '_created_at' })
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  created_at: Date = new Date()

  @Expose({ name: '_finished_at' })
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  finished_at: Date = new Date()

  @Expose({ name: 'duration' })
  duration: number = 0

  // get date () {
  //   return this._date.toLocaleString('en-US', options)
  // }
  //
  // set date (value: string) {
  //   this._date = value.toLocaleString('en-US', options)
  //   console.log('value', value)
  // }
  //
  // get time () {
  //   return this._time.toLocaleString('en-US', options)
  // }
  //
  //
  // get created_at () {
  //   return this._created_at.toLocaleString('en-US', options)
  // }
  //
  // get finished_at () {
  //   return this._finished_at.toLocaleString('en-US', options)
  // }
  //
  // get duration () {
  //   return `${this._duration} minutes`
  // }
}
