import { Expose, Transform } from 'class-transformer'

const options = { year: 'numeric', month: 'short', day: 'numeric' }

export default interface IEvent {
  id: string;
  name: string;
  _date: Date;
  _created_at: Date;
  _finished_at: Date;
  _duration: number;
}

export default class Event implements IEvent {
  @Expose()
  id = ''

  @Expose()
  name = ''

  @Expose({ name: 'date' })
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  _date: Date = new Date()

  @Expose({ name: 'created_at' })
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  _created_at: Date = new Date()

  @Expose({ name: 'finished_at' })
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  _finished_at: Date = new Date()

  @Expose({ name: 'duration' })
  _duration: number = 0

  get date () {
    return this._date.toLocaleString('en-US', options)
  }

  get created_at () {
    return this._created_at.toLocaleString('en-US', options)
  }

  get finished_at () {
    return this._finished_at.toLocaleString('en-US', options)
  }

  get duration () {
    return `${this._duration} minutes`
  }
}
