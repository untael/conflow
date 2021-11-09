import { Expose } from 'class-transformer'

export default interface IQuestion {
  id: string;
  name: string
  description: string
  answer?: string
  mark?: string
  rating?: string
  code?: any
  date_start: Date
  date_end: Date
  time_spent: number
  type: string
  tags: string[]
}

export default class Question implements IQuestion {
  @Expose()
  id = ''
  @Expose()
  name = ''
  @Expose()
  description = ''
  @Expose()
  answer?: string = ''
  @Expose()
  mark?: string = ''
  @Expose()
  rating?: string = ''
  @Expose()
  code?: any
  @Expose()
  date_start: Date = new Date()
  @Expose()
  date_end: Date = new Date()
  @Expose()
  time_spent: number = 0
  @Expose()
  type: string = ''
  @Expose()
  tags: string[] = []

  public get is_completed (): boolean {
    return !!this.time_spent
  }

  constructor (data: any) {
    Object.assign(this, data)
  }
}
